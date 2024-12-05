import React, {useEffect, useRef, useState} from "react";
import styles from "../../css/funding/FundingDetail.module.css";
import Header from "../Header";
import MasonryGallery from "./MasonryGallery";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import {url} from "../../config";
import {useAtom} from "jotai/react";
import {userAtom} from "../../atoms";
import { motion } from "framer-motion";

const FundingDetail = () => {
    const {fundingId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [fundingDetail, setFundingDetail] = useState(null);
    const [selectedRewards, setSelectedRewards] = useState([]);
    const lastSelectedRewardRef = useRef(null);
    const rewardSectionRef = useRef(null);

    const [user] = useAtom(userAtom);

    const [isArtworkView, setIsArtworkView] = useState(false); // "작품 모아보기" 모드 여부


    const [artworkImages, setArtworkImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);




    useEffect(() => {
        if (fundingDetail && fundingDetail.images) {
            setArtworkImages(fundingDetail.images.map((image) => image.imageUrl));
        }
    }, [fundingDetail]);


    const fundButtonToMoveRewardSection = () => {
        rewardSectionRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const getFundingDetail = async () => {
        try {
            const response = await axios.get(`${url}/api/funding/${fundingId}`);
            console.log("Funding Detail:", response.data);
            setFundingDetail(response.data);
        } catch (error) {
            console.error("Failed to fetch funding detail:", error);
            alert("펀딩 정보를 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFundingDetail().then(r => console.log("Funding Detail Loaded"));
    }, []);

    useEffect(() => {
        if (lastSelectedRewardRef.current) {
            lastSelectedRewardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedRewards]);


    const addRewardToSelection = (reward) => {
        const existingReward = selectedRewards.find((r) => r.rewardId === reward.rewardId);

        if (existingReward) {

            // 제한 검증
            if (reward.isLimit && existingReward.rewardQuantity + 1 > reward.limitQuantity) {
                alert(`이 리워드는 1인당 최대 ${reward.limitQuantity}개까지 구매 가능합니다.`);
                return;
            }


            setSelectedRewards((prevRewards) =>
                prevRewards.map((r) =>
                    r.rewardId === reward.rewardId
                        ? {...r, rewardQuantity: r.rewardQuantity + 1} // rewardQuantity 증가
                        : r
                )
            );
        } else {
            // 제한 검증
            if (reward.isLimit && 1 > reward.limitQuantity) {
                alert(`이 리워드는 1인당 최대 ${reward.limitQuantity}개까지 구매 가능합니다.`);
                return;
            }

            setSelectedRewards((prevRewards) => [
                ...prevRewards,
                {...reward, rewardQuantity: 1}, // 기본 수량 1 설정
            ]);
        }
    };

    const changeSelectedRewardQuantity = (selectedRewardId, quantityCount) => {
        setSelectedRewards((prevRewards) =>
            prevRewards.map((reward) => {
                if (reward.rewardId === selectedRewardId) {
                    const newQuantity = reward.rewardQuantity + quantityCount;

                    // 제한 검증
                    if (reward.isLimit && newQuantity > reward.limitQuantity) {
                        alert(`이 리워드는 1인당 최대 ${reward.limitQuantity}개까지 구매 가능합니다.`);
                        return reward; // 변경하지 않고 그대로 반환
                    }

                    return {...reward, rewardQuantity: Math.max(1, newQuantity)};
                }
                return reward;
            })
        );
    };


    const removeSelectedReward = (selectedRewardId) => {
        setSelectedRewards(
            selectedRewards.filter((reward) => reward.rewardId !== selectedRewardId)
        );
    };

    const goToContribute = (fundingId) => {
        // 선택한 리워드와 펀딩 ID를 state로 전달

        console.log("Selected Rewards:", selectedRewards);
        navigate('/fundings/contributions', {
            state: {fundingId, selectedRewards, fundingDetail}
        });
    };


    const handleNext = () => {
        const updatedImages = [...artworkImages];
        const firstImage = updatedImages.shift(); // 첫 번째 이미지를 제거
        updatedImages.push(firstImage); // 첫 번째 이미지를 맨 뒤로 추가
        setArtworkImages(updatedImages); // 상태 업데이트
    };

    const handlePrev = () => {
        const updatedImages = [...artworkImages];
        const lastImage = updatedImages.pop(); // 마지막 이미지를 제거
        updatedImages.unshift(lastImage); // 마지막 이미지를 맨 앞으로 추가
        setArtworkImages(updatedImages); // 상태 업데이트
    };

    if (!artworkImages.length) {
        return <p>Loading artworks...</p>;
    }




    const openArtworkView = (images) => {
        setArtworkImages(images); // 작품 이미지 설정
        setIsArtworkView(true); // 모드 활성화
    };

    const closeArtworkView = () => {
        setIsArtworkView(false); // 모드 종료
    };

    // 카드 위치 교환 로직
    const swapCards = (index) => {
        const updatedImages = [...artworkImages];
        [updatedImages[2], updatedImages[index]] = [updatedImages[index], updatedImages[2]]; // 중앙 카드와 교환
        setArtworkImages(updatedImages);
    };








    if (isLoading) {
        return (
            <>
                <Header/>
                <div className={styles.fundingDetailOutForm}>
                    <div className={styles.fundingDetail}>
                        <div className={styles.fundingHeader}>
                            <div className={styles.imageCard}>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "300px",
                                        backgroundColor: "#e0e0e0",
                                    }}
                                />
                            </div>
                            <div className={styles.fundingInfo}>
                                <h3>Loading...</h3>
                                <p>
                                    <strong>작가:</strong> 로딩 중...
                                </p>
                                <h4>모인 금액</h4>
                                <p>로딩 중...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header/>

            <div className={styles.fundingDetailOutForm}>
                <div className={styles.fundingDetail}>
                    <div className={styles.breadcrumb}>
                        펀딩 &gt; 펀딩상세
                        <button className={styles.notifyButton}>알림받기</button>
                    </div>
                    <hr className={styles.titleLine}/>

                    <div className={styles.fundingHeader}>
                        {/* 이미지 섹션 */}
                        <div className={styles.imageWrapper}>
                            <img
                                src={fundingDetail.fundingMainImageUrl || "placeholder.jpg"}
                                alt="펀딩 이미지"
                                className={styles.mainImage}
                            />
                        </div>


                        {/* 정보 섹션 */}
                        <div className={styles.infoSection}>

                            <h3 className={styles.fundingTitle}>{fundingDetail.title}</h3>

                            <br/>

                            <div className={styles.statsContainer}>


                                <div className={styles.artistContainer}>
                                <span className={styles.artistInfo}>
                                    <strong>작가:</strong> {fundingDetail.fundingUserName}
                                </span>
                                    <button className={styles.artistInfoButton}>작가 정보</button>
                                </div>

                                <hr className={styles.separator}/>

                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>모인금액</p>
                                    <p className={styles.statValueTotalAmount}>
                                        {fundingDetail.totalAmount.toLocaleString()}₩
                                    </p>
                                </div>

                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>달성률</p>
                                    <p className={`${styles.statValueAchievementRate} ${styles.achievementRate}`}>
                                        {fundingDetail.achievementRate}%
                                    </p>
                                </div>

                                <div className={styles.statItem}>
                                    <p className={styles.statLabel}>남은시간</p>
                                    <p className={styles.statValueRemainingDays}>
                                        {fundingDetail.remainingDays}일
                                    </p>
                                </div>

                            </div>

                            <hr className={styles.separator}/>

                            {/* 추가 정보 */}
                            <div className={styles.additionalInfo}>
                                <p>
                                    <strong>목표금액:</strong> {fundingDetail.goalAmount.toLocaleString()}원
                                </p>
                                <p>
                                    <strong>펀딩기간:</strong>{" "}
                                    {new Date(fundingDetail.startDate).toLocaleDateString()} -{" "}
                                    {new Date(fundingDetail.endDate).toLocaleDateString()}
                                </p>


                            </div>

                            {/* 펀딩하기 버튼 */}
                            <button
                                className={`${styles.fundButton} ${styles.primaryButton}`}
                                onClick={fundButtonToMoveRewardSection}
                            >
                                펀딩하기
                            </button>
                        </div>
                    </div>

                    <hr className={styles.sectionDivider}/>

                    <div className={styles.fundingDetailContentContainer}>
                        <div className={styles.projectPlan}>
                            <h4>프로젝트 계획</h4>
                            <button
                                className={styles.showArtworks}
                                onClick={() =>
                                    openArtworkView(
                                        fundingDetail.images.map((image) => image.imageUrl)
                                    )
                                }
                            >
                                작품 모아보기
                            </button>
                            <div className={styles.projectDetails}>
                                <p>{fundingDetail.introduction}</p>
                                <MasonryGallery
                                    images={fundingDetail.images.map((image) => image.imageUrl)}
                                />
                            </div>

                            {isArtworkView && (
                                <div className={styles.artworkViewContainer}>
                                    <button
                                        className={styles.closeButton}
                                        onClick={closeArtworkView}
                                    >
                                        닫기
                                    </button>

                                    <button
                                        className={`${styles.navButton} ${styles.prevButton}`}
                                        onClick={handlePrev}
                                    >
                                        &#8249; {/* 이전 버튼 */}
                                    </button>

                                    <div className={styles.cardSlider}>
                                        {artworkImages.map((image, index) => (
                                            <motion.div
                                                key={index}
                                                className={styles.card}
                                                initial={{
                                                    scale: 0.8,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    scale: index === 2 ? 1.2 : 1,
                                                    opacity: 1,
                                                }}
                                                transition={{ duration: 0.5 }}
                                                onClick={() => swapCards(index)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Artwork ${index}`}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <button
                                        className={`${styles.navButton} ${styles.nextButton}`}
                                        onClick={handleNext}
                                    >
                                        &#8250; {/* 다음 버튼 */}
                                    </button>
                                </div>
                            )}


                        </div>

                        <div className={styles.rewardSelection} ref={rewardSectionRef}>
                            <h4>리워드 선택</h4>

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
                                        <input type="text" value={reward.rewardQuantity} readOnly/>
                                        <button onClick={() => changeSelectedRewardQuantity(reward.rewardId, 1)}>
                                            +
                                        </button>
                                    </div>
                                    <p className={styles.price}>
                                        {(reward.rewardPrice * reward.rewardQuantity).toLocaleString()}원
                                    </p>
                                </div>
                            ))}

                            {selectedRewards.length > 0 && (
                                <div className={styles.totalSupport}>
                                    <button
                                        className={styles.rewardButton}
                                        onClick={() => {
                                            if (!user || !user.username) {
                                                alert("로그인이 필요합니다.");
                                                return;
                                            }
                                            goToContribute(fundingDetail.fundingId)
                                        }
                                        }

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


                            <div className={styles.rewardList}>
                                {fundingDetail.rewards.map((reward) => (
                                    <div
                                        key={reward.rewardId}
                                        className={`${styles.rewardItem} ${
                                            reward.stock === 0 && reward.rewardType !== "BASIC"
                                                ? styles.disabled
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (reward.stock !== 0 || reward.rewardType === "BASIC") {
                                                addRewardToSelection(reward);
                                            } else {
                                                alert("재고가 부족하여 선택할 수 없습니다.");
                                            }
                                        }}
                                    >
                                        <div className={styles.rewardHeader}>
                                            <h5>{reward.rewardName}</h5>
                                            <span className={styles.rewardLeft}>
                                                {reward.stock ?? "999"} 개 남음 {reward.isLimit && `| 1인당 최대: ${reward.limitQuantity}개`}
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
    )
        ;
};

export default FundingDetail;