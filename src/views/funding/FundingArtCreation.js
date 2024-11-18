import React, { useState } from 'react';
import styles from '../../css/funding/FundingArtCreation.module.css';
import Header from "../Header";
import StepNavigation from "./StepNavigation";
import {useNavigate} from "react-router-dom";

function FundingArtCreation() {
    const [fundingTitle, setFundingTitle] = useState('');
    const [fundingDescription, setFundingDescription] = useState('');
    const [fundingMainImage, setFundingMainImage] = useState(null);

    const [artWorks, setArtWorks] = useState([]);
    const [artWorkTitle, setArtWorkTitle] = useState('');
    const [artWorkDescription, setArtWorkDescription] = useState('');
    const [artWorkImage, setArtWorkImage] = useState(null);

    const previewFundingMainImage = (e) => {
        setFundingMainImage(e.target.files[0]);
    };

    const previewArtWorkImage = (e) => {
        setArtWorkImage(e.target.files[0]);
    };

    const addArtWork = () => {
        if (artWorkTitle && artWorkDescription && artWorkImage) {
            setArtWorks((prevArtwork) => [
                ...prevArtwork,
                {
                    title: artWorkTitle,
                    description: artWorkDescription,
                    image: artWorkImage
                },
            ]);
            setArtWorkTitle('');
            setArtWorkDescription('');
            setArtWorkImage(null);
        }
    };


    const navigate = useNavigate();

    const fundingRegistrationThankYou = () => {
        navigate("/funding/fundingRegistrationThankYou");
    };


    return (
        <>
            <Header/>
            <div className={styles.fundingArtCreation}>
                <StepNavigation currentStep="펀딩 계획" />
                {/*<h2>펀딩 계획</h2>*/}
                <div className={styles.fundingArtCreationMain}>
                    <div style={{flex: 1}}>
                        <label>펀딩 제목</label>
                        <input
                            type="text"
                            value={fundingTitle}
                            onChange={(e) => setFundingTitle(e.target.value)}
                            placeholder="펀딩 제목을 입력하세요"
                            className={styles.fundingArtCreationInput}
                        />
                        <label>펀딩 소개</label>
                        <textarea
                            value={fundingDescription}
                            onChange={(e) => setFundingDescription(e.target.value)}
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
                            {fundingMainImage ? (
                                <img
                                    src={URL.createObjectURL(fundingMainImage)}
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
                    <div style={{flex: 1}}>
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
                            className={styles.fundingArtCreationTextarea} // 동일한 클래스 사용
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
                    {artWorks.map((artWork, index) => (
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
                    <button className={styles.FundingArtCreationSubmitButton}
                            onClick={fundingRegistrationThankYou}
                    >펀딩 신청</button>
                </div>
            </div>
        </>
    );
}

export default FundingArtCreation;
