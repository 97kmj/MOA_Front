import React from 'react';
import styles from '../../css/funding/FundingContribute.module.css';
import Header from "../Header";

const FundingContribute = () => {
    return (
        <>
            <Header/>
            <div className={styles.fundingContributeContainer}>

                {/*  */}
                <div className={styles.fundingContributeLeft}>

                    <header className={styles.fundingContributeHeader}>
                        <h2>펀딩 결제</h2>
                    </header>
                    <hr className={styles.fundingContributeSectionDivider}/>
                    {/* 이미지 , 펀딩 */}
                    <div className={styles.fundingContributeMainInfo}>
                        <img
                            src={`${process.env.PUBLIC_URL}/img/funding/image6.png`} // 메인 이미지 파일 경로
                            alt="루브르 박물관"
                            className={styles.fundingContributeMainImage}
                        />
                        <div className={styles.fundingContributeDetails}>
                            <h3>[전시회] 루브르 박물관 전시회 - 개인전</h3>
                            <p>조각 20점 정도 조건부 전시 루브르 박물관 전시 펀딩</p>
                            <p className={styles.fundingContributeAmount}>
                                236,000원 <span>47% 달성</span> 17일 남음
                            </p>
                        </div>
                    </div>

                    <div className={styles.fundingContributeContent}>
                    <div className={styles.fundingContributeContentInfo}>
                        {/* 리워드 정보  */}
                        <section className={styles.fundingContributeRewardInfo}>
                            <h4 className={styles.sectionTitle}>
                                <img src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`} alt="리워드 아이콘"
                                     className={styles.sectionIcon}/>
                                리워드 정보
                            </h4>
                            <div className={styles.fundingContributeRewardItem}>
                                <img src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`} alt="리워드 아이콘"
                                     className={styles.rewardIcon}/>
                                <div className={styles.rewardText}>
                                    <h5>리워드 없는 후원</h5>
                                    <p>리워드 없는 후원</p>
                                    <p className={styles.rewardPrice}>100,000원 / 1개</p>
                                </div>
                            </div>

                            <div className={styles.fundingContributeRewardItem}>
                                <img src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`} alt="리워드 아이콘"
                                     className={styles.rewardIcon}/>
                                <div className={styles.rewardText}>
                                    <h5>조각품 미니어처 5종세트</h5>
                                    <p>전시된 작품의 미니어처</p>
                                    <p className={styles.rewardPrice}>100,000원 / 1개</p>
                                </div>
                            </div>
                        </section>


                        <section className={styles.fundingContributeSupporterInfo}>
                            <h4 className="section-title">👤 후원자 정보</h4>
                            <div className={styles.supporterDetails}>
                                <p>이름: 르브론 제임스</p>
                                <p>연락처: 010-0000-0000</p>
                            </div>
                        </section>


                         <section className={styles.fundingContributeShippingInfo}>
                             <h4 className="section-title">📦 배송지 정보</h4>
                             <p className="shipping-note">리워드를 받을 배송지 입력해주세요</p>

                             <div className={styles.shippingDetails}>
                                 <label>
                                     <span>이름</span>
                                     <input type="text" placeholder="이름을 입력하세요"/>
                                 </label>
                                 <label>
                                     <span>연락처</span>
                                     <input type="text" placeholder="연락처를 입력하세요"/>
                                 </label>
                                 <label>
                                     <span>주소</span>
                                     <input type="text" placeholder="주소를 입력하세요"/>
                                 </label>
                             </div>

                         </section>
                     </div>
                        {/* 사이드바 */}
                        <aside className={styles.fundingContributeSummary}>
                            <div>
                                <h4>최종 후원 금액</h4>
                                <p className={styles.totalAmount}>200,000원</p>
                                <label>
                                    <input type="checkbox"/> 개인정보 제 3자 제공 동의
                        </label>
                        <label>
                            <input type="checkbox"/> 후원 유의사항 확인
                        </label>
                        <p className={styles.noticeText}>
                            ※ 후원 유의사항: 후원자가 만일 중도 취소할 경우 환불 절차가 필요할 수 있습니다.
                        </p>
                        <button className={styles.fundingContributeButton}>펀딩하기</button>
                    </div>
                </aside>

            </div>

                </div>
            </div>


        </>
    );
};

export default FundingContribute;
