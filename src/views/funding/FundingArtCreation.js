import React, { useState } from 'react';
import styles from '../../css/funding/FundingArtCreation.module.css';
import Header from "../Header";
import StepNavigation from "./StepNavigation";
import { useNavigate } from "react-router-dom";
import useFundingStore from "./store/fundingStore";
import axios from "axios";
import {url} from "../../config";

function FundingArtCreation() {
    // Zustand 스토어에서 메서드 및 상태 가져오기
    const { fundingInfo, artworks, setFundingInfo, storeAddArtwork, resetFundingState, rewards } = useFundingStore();
    const [artWorkTitle, setArtWorkTitle] = useState('');
    const [artWorkDescription, setArtWorkDescription] = useState('');
    const [artWorkImage, setArtWorkImage] = useState(null);

    const navigate = useNavigate();


    const previewFundingMainImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFundingInfo({ mainImage: file });
        }
    };

    // 작품 이미지 미리보기
    const previewArtWorkImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArtWorkImage(file);
        } else {
            alert("이미지 파일을 선택하세요.");
        }
    };

    // 작품 추가
    const addArtWork = () => {
        if (!artWorkTitle.trim() || !artWorkDescription.trim() || !artWorkImage) {
            alert("작품 이름, 설명 및 이미지를 모두 입력해야 합니다.");
            return;
        }
        storeAddArtwork({
            title: artWorkTitle,
            description: artWorkDescription,
            image: artWorkImage,
        });

        setArtWorkTitle('');
        setArtWorkDescription('');
        setArtWorkImage(null);
    };

    const submitFundingData = async () => {
        if (!fundingInfo.title || !fundingInfo.description || !fundingInfo.mainImage) {
            alert("펀딩 제목, 소개, 대표 이미지를 모두 입력하세요.");
            return;
        }

        const formData = new FormData();
        formData.append(
            "fundingInfo",
            new Blob([JSON.stringify(fundingInfo)], { type: "application/json" })
        );
        formData.append(
            "rewards",
            new Blob([JSON.stringify(rewards)], { type: "application/json" })
        );
        formData.append(
            "artworks",
            new Blob([JSON.stringify(artworks)], { type: "application/json" })
        );

        if (fundingInfo.mainImage) {
            formData.append("mainImage", fundingInfo.mainImage);
        }
        artworks.forEach((artwork, index) => {
            // File 객체가 있는지 확인
            if (artwork.image) {
                formData.append(`artworkImages`, artwork.image);
            }
        });

        try {
            const response = await axios.post(`${url}/api/funding`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("펀딩 데이터 전송 성공:", response.data);

            resetFundingState();
            navigate("/funding/new/thankYou");
        } catch (error) {
            console.error("펀딩 데이터 전송 실패:", error);
            alert("펀딩 데이터를 전송하는 데 실패했습니다.");
        }
    };



    return (
        <>
            <Header />
            <div className={styles.fundingArtCreation}>
                <StepNavigation currentStep="펀딩 계획" />
                <div className={styles.fundingArtCreationMain}>
                    <div style={{flex: 1}}>
                        <label>펀딩 제목</label>
                        <input
                            type="text"
                            value={fundingInfo.title}
                            onChange={(e) => setFundingInfo({title: e.target.value})}
                            placeholder="펀딩 제목을 입력하세요"
                            className={styles.fundingArtCreationInput}
                        />
                        <label>펀딩 소개</label>
                        <textarea
                            value={fundingInfo.description}
                            onChange={(e) => setFundingInfo({description: e.target.value})}
                            placeholder="펀딩 소개를 입력하세요"
                            className={styles.fundingArtCreationTextarea}
                        />
                    </div>

                    <div className={styles.fundingArtCreationImagePreview}>
                        <input
                            id="file-input"
                            type="file"
                            onChange={previewFundingMainImage}
                            className={styles.hiddenFileInput}
                        />
                        <label htmlFor="file-input" className={styles.fileInputLabel}>
                            {fundingInfo.mainImage ? (
                                <img
                                    src={URL.createObjectURL(fundingInfo.mainImage)}
                                    alt="대표 이미지 미리보기"
                                    className={styles.previewImage}
                                />
                            ) : (
                                <div className={styles.plusIcon}>+</div>
                            )}
                        </label>
                    </div>
                </div>

                <div className={styles.fundingArtCreationMain}>
                    <div style={{ flex: 1 }}>
                        <h3>작품 소개</h3>
                        <label>작품 이름</label>
                        <input
                            type="text"
                            value={artWorkTitle}
                            onChange={(e) => setArtWorkTitle(e.target.value)}
                            placeholder="작품 이름을 입력하세요"
                            className={styles.fundingArtCreationInput}
                        />
                        <label>작품 설명</label>
                        <textarea
                            value={artWorkDescription}
                            onChange={(e) => setArtWorkDescription(e.target.value)}
                            placeholder="작품 설명을 입력하세요"
                            className={styles.fundingArtCreationTextarea}
                        />
                        <div>
                            <button type="button" onClick={addArtWork} className={styles.fundingArtCreationButton}>
                                작품 추가
                            </button>
                        </div>
                    </div>

                    <div className={styles.fundingArtCreationImagePreview}>
                        <input
                            id="artwork-file-input"
                            type="file"
                            onChange={previewArtWorkImage}
                            className={styles.hiddenFileInput}
                        />
                        <label htmlFor="artwork-file-input" className={styles.fileInputLabel}>
                            {artWorkImage ? (
                                <img
                                    src={URL.createObjectURL(artWorkImage)}
                                    // src={URL.createObjectURL(artworks.image)}
                                    alt="작품 이미지 미리보기"
                                    className={styles.previewImage}
                                />
                            ) : (
                                <div className={styles.plusIcon}>+</div>
                            )}
                        </label>
                    </div>
                </div>

                <div className={styles.fundingArtCreationWorks}>
                    {artworks.map((artWork, index) => (
                        <div key={index} className={styles.fundingArtCreationWorkItem}>
                            <img
                                src={URL.createObjectURL(artWork.image)}
                                alt="작품 이미지"
                            />
                            <div>{artWork.title}</div>
                            <div>{artWork.description}</div>
                        </div>
                    ))}
                </div>

                <div>
                    <button className={styles.FundingArtCreationSubmitButton} onClick={submitFundingData}>
                        펀딩 신청
                    </button>
                </div>
            </div>
        </>
    );
}

export default FundingArtCreation;
