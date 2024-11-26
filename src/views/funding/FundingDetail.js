import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/funding/FundingDetail.module.css";
import Header from "../Header";
import MasonryGallery from "./MasonryGallery";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';

const FundingDetail = () => {
    // const fundingId = useParams();
    // const { fundingId } = useParams();
    const navigate = useNavigate();
    const fundingId = 19;
    const [fundingDetail, setFundingDetail] = useState(null);
    const [selectedRewards, setSelectedRewards] = useState([]);
    const lastSelectedRewardRef = useRef(null);
    const rewardSectionRef = useRef(null);

    const fundButtonToMoveRewardSection = () => {
        rewardSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const getFundingDetail = async () => {
            try {
                const response = await axios.get(` http://localhost:8080/api/funding/${fundingId}`);
                setFundingDetail(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch funding detail:", error);
                alert("펀딩 정보를 불러오는데 실패했습니다.");
            }
        };

        getFundingDetail();
    }, [fundingId]);

    const addRewardToSelection = (reward) => {
        const existingReward = selectedRewards.find((r) => r.rewardId === reward.rewardId);

        if (existingReward) {
            setSelectedRewards((prevRewards) =>
                prevRewards.map((r) =>
                    r.rewardId === reward.rewardId
                        ? { ...r, rewardQuantity: r.rewardQuantity + 1 } // rewardQuantity 증가
                        : r
                )
            );
        } else {
            setSelectedRewards((prevRewards) => [
                ...prevRewards,
                { ...reward, rewardQuantity: 1 }, // 기본 수량 1 설정
            ]);
        }
    };

    const changeSelectedRewardQuantity = (selectedRewardId, quantityCount) => {
        setSelectedRewards((prevRewards) =>
            prevRewards.map((reward) =>
                reward.rewardId === selectedRewardId
                    ? { ...reward, rewardQuantity: Math.max(1, reward.rewardQuantity + quantityCount) } // rewardQuantity 사용
                    : reward
            )
        );
    };

    const removeSelectedReward = (selectedRewardId) => {
        setSelectedRewards(
            selectedRewards.filter((reward) => reward.rewardId !== selectedRewardId)
        );
    };

    const totalAmount = selectedRewards.reduce((sum, reward) => {
        return sum + reward.rewardPrice * reward.quantity;
    }, 0);

    useEffect(() => {
        if (lastSelectedRewardRef.current) {
            lastSelectedRewardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedRewards]);

    if (!fundingDetail) {
        return <div>Loading...</div>;
    }


    const goToContribute = (fundingId) => {
        // 선택한 리워드와 펀딩 ID를 state로 전달
        console.log("Selected Rewards:", selectedRewards);
        navigate('/fundings/contributions', {
            state: { fundingId, selectedRewards, fundingDetail }
        });
    };

    //펀딩 버튼 누르면 리워드로 선택으로 이동

    if (!fundingDetail) {
        return <div>Loading...</div>; // 데이터 로딩 중인 상태
    }



    return (
        <>
            <Header />

            <div className={styles.fundingDetailOutForm}>
                <div className={styles.fundingDetail}>
                    <div className={styles.breadcrumb}>
                        펀딩 &gt; 펀딩상세
                        <button className={styles.notifyButton}>알림받기</button>
                    </div>
                    <hr className={styles.titleLine} />

                    <div className={styles.fundingHeader}>
                        <div className={styles.imageCard}>
                            <img
                                src={fundingDetail.fundingMainImageUrl}
                                alt="펀딩 이미지"
                                className={styles.mainImage}
                            />
                        </div>

                        <div className={styles.fundingInfo}>
                            <h3>{fundingDetail.title}</h3>
                            <p>
                                <strong>작가:</strong> {fundingDetail.fundingUserName}
                                <button className={styles.artistInfoButton}>작가 정보</button>
                            </p>
                            <h4>모인 금액</h4>
                            <p>
                                {fundingDetail.totalAmount.toLocaleString()}원{" "}
                                <span className={styles.fundingDetailProgress}>
                  {((fundingDetail.totalAmount / fundingDetail.goalAmount) * 100).toFixed(2)}% 달성
                </span>{" "}
                                {Math.ceil(
                                    (new Date(fundingDetail.endDate) - new Date()) / (1000 * 60 * 60 * 24)
                                )}{" "}
                                일 남음
                            </p>
                            <p>목표 금액: {fundingDetail.goalAmount.toLocaleString()}원</p>
                            <p>
                                펀딩 기간:{" "}
                                {new Date(fundingDetail.startDate).toLocaleDateString()} -{" "}
                                {new Date(fundingDetail.endDate).toLocaleDateString()}
                            </p>

                            <button className={styles.fundButton} onClick={fundButtonToMoveRewardSection}>
                                펀딩하기
                            </button>
                        </div>
                    </div>

                    <hr className={styles.sectionDivider} />

                    <div className={styles.fundingDetailContentContainer}>
                        <div className={styles.projectPlan}>
                            <h4>프로젝트 계획</h4>
                            <button className={styles.showArtworks}>작품 모아보기</button>
                            <div className={styles.projectDetails}>
                                {/* introduction 추가 */}
                                <p>{fundingDetail.introduction}</p>
                                <MasonryGallery images={fundingDetail.images.map((image) => image.imageUrl)}/>
                            </div>
                        </div>


                        <div className={styles.rewardSelection} ref={rewardSectionRef}>
                            <h4>리워드 선택</h4>

                            {/* 선택된 리워드 리스트 */}
                            {selectedRewards.map((reward, index) => (
                                <div
                                    key={reward.rewardId}
                                    className={styles.rewardCard}
                                    ref={index === selectedRewards.length - 1 ? lastSelectedRewardRef : null}
                                >
                                    <div className={styles.rewardHeader}>
                                        <h5>{reward.rewardName}</h5>
                                        <button
                                            className={styles.closeButton}
                                            onClick={() => removeSelectedReward(reward.rewardId)}
                                        >
                                            X
                                        </button>
                                    </div>
                                    <p className={styles.rewardDescription}>{reward.rewardDescription}</p>
                                    <div className={styles.quantitySelector}>
                                        <button onClick={() => changeSelectedRewardQuantity(reward.rewardId, -1)}>
                                            -
                                        </button>
                                        <input type="text" value={reward.rewardQuantity}
                                               readOnly/> {/* rewardQuantity로 변경 */}
                                        <button onClick={() => changeSelectedRewardQuantity(reward.rewardId, 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p className={styles.price}>
                                        {(reward.rewardPrice * reward.rewardQuantity).toLocaleString()}원
                                    </p>
                                </div>
                            ))}

                            {/* 총 금액 표시와 후원하기 버튼 */}
                            {selectedRewards.length > 0 && (
                                <div className={styles.totalSupport}>
                                    <button
                                        className={styles.rewardButton}
                                        onClick={() => goToContribute(fundingDetail.fundingId)}
                                    >
                                        총{" "}
                                        {selectedRewards
                                            .reduce(
                                                (total, reward) => total + reward.rewardPrice * reward.rewardQuantity,
                                                0
                                            )
                                            .toLocaleString()}
                                        원 후원하기
                                    </button>
                                </div>
                            )}

                            {/* 리워드 목록 */}
                            <div className={styles.rewardList}>
                                {fundingDetail.rewards.map((reward) => (
                                    <div
                                        key={reward.rewardId}
                                        className={styles.rewardItem}
                                        onClick={() => addRewardToSelection(reward)}
                                    >
                                        <div className={styles.rewardHeader}>
                                            <h5>{reward.rewardName}</h5>
                                            <span className={styles.rewardLeft}>
                        남음: {reward.stock}개
                    </span>
                                        </div>
                                        <p className={styles.rewardDescription}>{reward.rewardDescription}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FundingDetail;
