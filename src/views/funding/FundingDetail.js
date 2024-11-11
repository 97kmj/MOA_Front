import React, {useEffect, useRef, useState} from 'react';
import styles from '../../css/funding/FundingDetail.module.css';

import Header from "../Header";
import MasonryGallery from "./MasonryGallery";

const FundingDetail = () => {
    const [selectedRewards, setSelectedRewards] = useState([]);
    const lastSelectedRewardRef = useRef(null);


    const images = [
        "image1.jpg",
        "image2.jpg",
        "image3.png",
        "image4.png",
        "image5.png",
        "image6.png",
        "image1.jpg",
        "image5.png",
        "image3.png",
        "image6.png",
        "image6.png",
        "image6.png"
        // 필요한 만큼 이미지 추가
    ];



    // 리워드 아이템 데이터 (임시 데이터~!)
    const rewardList = [
        { id: 1, title: "500,000원", description: "조각품 미니어처 세트 증정", price: 500000, left: 100 },
        { id: 2, title: "100,000원", description: "작가 포토카드 세트 증정", price: 100000, left: 100 },
        { id: 3, title: "150,000원", description: "감사의 엽서 증정1", price: 150000, left: 100 },
        { id: 4, title: "250,000원", description: "감사의 엽서 증정2", price: 250000, left: 100 },
        { id: 5, title: "350,000원", description: "감사의 엽서 증정3", price: 350000, left: 100 },
        { id: 6, title: "450,000원", description: "감사의 엽서 증정4", price: 450000, left: 100 },
        { id: 7, title: "550,000원", description: "감사의 엽서 증정5", price: 550000, left: 100 }

    ];

    // 리워드 선택 하면 selectedRewards 에 추가
    const addRewardToSelection = (reward) => {
        const isSelected = selectedRewards.find((selectedReward) => selectedReward.id === reward.id);
        if (isSelected) return;

        setSelectedRewards([...selectedRewards, {...reward, quantity: 1}]); //퀀티티만 넣는이유는 기존에 정보들은 있기떄문
    };

    // 수량 변경 메서드
    const changeSelectedRewardQuantity = (selectedRewardId, quantityCount) => {
        setSelectedRewards(//셋메서드에
            (prevSelectedRewards) => { //이 함수인자 전달
            return prevSelectedRewards.map((reward) => { //그리고 prevSelectedRewards 가 map 함수 전달
                if (reward.id === selectedRewardId) {
                    return {...reward, quantity: Math.max(1, reward.quantity + quantityCount)};
                }
                return reward;
            }
            );
        });
    };

    // 리워드 선택 취소 메서드
    const removeSelectedReward = (selectedId) => {
        setSelectedRewards(selectedRewards.filter((notSelectedReward) => notSelectedReward.id !== selectedId));
    };

    //총 가격 구하는 메서드 (총 가격 = 리워드 가격 * 수량)
    const totalAmount = selectedRewards.reduce((sum, reward) => {
        if (reward) {
            return sum + reward.price * reward.quantity;
        }
        return sum;
    }, 0);


    // 마지막 리워드가 추가될 때 해당 리워드 카드로 스크롤
    useEffect(()=>{
        if(lastSelectedRewardRef.current){
            lastSelectedRewardRef.current.scrollIntoView({behavior:'smooth',block:'center'});
        }
    },[selectedRewards])


    return (
        <>
        <Header/>

        <div className={styles.fundingDetail}>
        <div>
            <div className={styles.breadcrumb}>
                펀딩 &gt; 펀딩상세
                <button className={styles.notifyButton}>알림받기</button>
            </div>
            <hr className={styles.sectionDivider}/>

            {/*펀딩 디테일 헤더 start*/}
            <div className={styles.fundingHeader}>

                {/*펀딩 디테일 메인 이미지 start*/}
                <div className={styles.imageCard}>
                    <img src={`${process.env.PUBLIC_URL}/img/funding/image6.png`} alt="펀딩 이미지" className={styles.mainImage}/>
                </div>
                {/*펀딩 디테일 메인 이미지 end*/}

                {/*펀딩 디테일 소개 정보 start*/}
                <div className={styles.fundingInfo}>
                    <h3>[전시회] 루브르 박물관 전시회 - 개인전</h3>
                    <p>조각 20점과 조각된 인형류 루브르 박물관 전시 펀딩</p>
                    <p>
                        <strong>작가:</strong> 피카소 <button className={styles.artistInfoButton}>작가 정보</button>
                    </p>
                    <h4>모인 금액</h4>
                    <p>
                        236,000원 <span className={styles.fundingDetailProgress}>47% 달성</span> 17일 남음
                    </p>
                    <p>목표 금액: 500,000원</p>
                    <p>펀딩 기간: 2024.09.15 - 2024.10.30</p>
                    <button className={styles.fundButton}>펀딩하기</button>
                </div>
                {/*펀딩 디테일 소개 정보 end*/}

            </div>
            {/*펀딩 디테일 헤더 end*/}

            <hr className={styles.sectionDivider}/>

            <div className={styles.fundingDetailContentContainer}>

                {/*프로젝트 계획 start*/}
                <div className={styles.projectPlan}>
                    <h4>프로젝트 계획</h4>
                    <button className={styles.showArtworks}>작품 모아보기</button>
                    <div className={styles.projectDetails}>
                        <p><strong>이름:</strong> 토니 스타크</p>
                        <p><strong>학력:</strong> MIT 학력자</p>
                        <p><strong>특징:</strong> 본인은 조각 및 인형류 분야에 종사 중</p>
                        <p><strong>전시 위치:</strong> 파리 루브르</p>
                        <p><strong>예산:</strong> 500,000원</p>
                        <p><strong>전시회 기간:</strong> 2024.08.14 - 2024.08.30</p>

                        {/*<img src={`${process.env.PUBLIC_URL}/image2.jpg`} alt="작품 이미지" className="artwork-image"/>*/}
                        {/*<h1>Exhibition Gallery</h1>*/}
                        <div id="project-plan-images">
                        <MasonryGallery images={images}/>
                        </div>
                    </div>
                </div>
                {/*프로젝트 계획 end*/}

                {/*리워드 섹션 start*/}
                <div className={styles.rewardSelection}>
                    <h4>리워드 선택</h4>
                    {/* 선택된 리워드 카드들 start */}
                    {selectedRewards.map((reward, index) => (
                        <div key={reward.id}  className={styles.rewardCard}
                             ref={index === selectedRewards.length - 1 ? lastSelectedRewardRef : null}
                        >
                            <div className={styles.rewardHeader}>
                                <h5>{reward.title}</h5>
                                <button className={styles.closeButton} onClick={()=>removeSelectedReward(reward.id)}>X
                                </button>
                            </div>

                            <p className={styles.rewardDescription}>{reward.description}</p>
                            <div className={styles.quantitySelector}>
                                <button onClick={() => changeSelectedRewardQuantity(reward.id, -1)}>-</button>
                                <input type="text" value={reward.quantity} readOnly/>
                                <button onClick={() => changeSelectedRewardQuantity(reward.id, 1)}>+</button>
                            </div>
                            <p className={styles.price}>{(reward.price * reward.quantity).toLocaleString()}원</p>
                        </div>

                    ))}

                    {/* 선택된 리워드 카드들 end */}

                    {/* 총 금액 표시와 후원하기 버튼 start */}
                    {selectedRewards.length > 0 && (
                        <div className={styles.totalSupport}>
                            <button className={styles.rewardButton}>총 {totalAmount.toLocaleString()}원 후원하기</button>
                        </div>
                    )}
                    {/* 총 금액 표시와 후원하기 end */}

                    {/* 리워드 목록 start */}
                    <div className={styles.rewardList}>
                        {rewardList.map((reward)=>(
                            <div key={reward.id} className={styles.rewardItem}
                                onClick={() => addRewardToSelection(reward)}
                            >
                                <div className={styles.rewardHeader}>
                                    <h5>{reward.title} +</h5>
                                    <span className={styles.rewardLeft}>남음: {reward.left}개</span>
                                </div>
                                <p className={styles.rewardDescription}>{reward.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* 리워드 목록 end */}
                </div>
                {/*리워드 섹션 end */}

            </div>

        </div>
        </div>
        </>
    );
};

export default FundingDetail;
