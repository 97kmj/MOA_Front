import React, {useEffect, useState} from 'react';
import styles from '../../css/funding/FundingContribute.module.css';
import Header from "../Header";
import axios from "axios";
import {userAtom} from "../../atoms";
import {useAtom} from "jotai/react";
import {useLocation} from "react-router-dom";
import {url} from "../../config";

const FundingContribute = () => {
    const [user] = useAtom(userAtom);
    const location = useLocation();
    const { fundingId, selectedRewards, fundingDetail } = location.state || {};//fundingDetail에서 받아온 데이터
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        phoneNumber: "",
        address: "",
    });


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/v1/iamport.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    const requestPayment = async () => {
        if (!window.IMP) {
            alert("아임포트가 아직 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.");
            return;
        }

        const merchantUid = `merchant_${new Date().getTime()}`; // 고유한 merchant_uid 생성
        const paymentAmount = selectedRewards.reduce(
            (sum, reward) => sum + reward.rewardPrice * reward.rewardQuantity,
            0
        ); // 선택한 리워드의 총 금액 계산


        // 백엔드에 전달할 데이터
        const requestData = {
            impUid: null, // 이 값은 결제 성공 후 업데이트됨
            totalAmount: selectedRewards.reduce(
                (sum, reward) => sum + reward.rewardPrice * reward.rewardQuantity,
                0
            ),
            paymentType: "CARD", // 카드 결제 고정 (예시)
            fundingId: fundingId,
            rewardList: selectedRewards,
            userName: user.username,
            address: shippingInfo.address,
            phoneNumber: shippingInfo.phoneNumber || user.phone,
            name: shippingInfo.name || user.name,
            merchantUid: merchantUid,
        };

        try {
            // Step 1: 결제 금액 사전등록 요청
            const prepareResponse = await axios.post(`${url}/api/funding/payment/prepare`, {
                merchant_uid: merchantUid,
                amount: paymentAmount,
            });

            if (prepareResponse.status === 200) {
                console.log("사전 등록 성공:", prepareResponse.data);

                // Step 2: 결제 요청
                const { IMP } = window;
                IMP.init('imp55612646'); // 가맹점 식별코드

                const paymentData = {
                    pg: "html5_inicis", // PG사 선택
                    pay_method: "", // 결제수단
                    merchant_uid: merchantUid, // 주문번호
                    name: "펀딩 결제", // 결제명
                    amount: paymentAmount, // 결제 금액
                    buyer_email: user.email,
                    buyer_name: user.name,
                    buyer_tel: user.phone,
                    buyer_addr: shippingInfo.address || user.address,
                    buyer_postcode: "123-456", // 구매자 우편번호
                    custom_data: JSON.stringify({
                        fundingId: fundingId,
                        rewardList: selectedRewards,
                    }), // 사용자 정의 데이터
                };

                IMP.request_pay(paymentData, async (rsp) => {
                    if (rsp.success) {
                        console.log("결제 성공:", rsp);

                        // 업데이트된 impUid와 paymentType을 requestData에 저장
                        requestData.impUid = rsp.imp_uid;
                        requestData.paymentType = rsp.pay_method.toUpperCase();

                        // Step 3: 백엔드 DB에 결제 정보 저장
                        try {
                            const response = await axios.post(`${url}/api/funding/payment`, requestData);

                            if (response.status === 200) {
                                alert("결제가 성공적으로 완료되었습니다!");
                            } else {
                                alert("결제는 성공했으나 서버 검증 중 오류가 발생했습니다.");
                                console.error("백엔드 검증 실패:", response.data);
                            }
                        } catch (error) {
                            console.error("백엔드 검증 요청 중 오류:", error);
                            alert("결제 검증 중 문제가 발생했습니다.");
                        }
                    } else {
                        // 결제 실패 처리
                        alert(`결제 요청에 실패했습니다. 에러 메시지: ${rsp.error_msg}`);
                        console.error("결제 실패:", rsp);
                    }
                });
            } else {
                alert("사전 등록에 실패했습니다. 다시 시도해주세요.");
                console.error("사전 등록 실패:", prepareResponse);
            }
        } catch (error) {
            console.error("사전 등록 요청 중 오류:", error);
            alert("결제 사전등록 중 문제가 발생했습니다.");
        }
    };

    const inputValueShippingInfo = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    return (
        <>
            <Header/>
            <div className={styles.fundingContributeContainer}>

                {/*  */}
                <div className={styles.fundingContributeLeft}>

                    <header className={styles.fundingContributeHeader}>

                    </header>

                    <div className={styles.breadcrumb}>
                        펀딩 &gt; 펀딩상세 &gt; 펀딩결제
                    </div>

                    <hr className={styles.fundingContributeSectionDivider}/>
                    {/* 이미지 , 펀딩 */}
                    <div className={styles.fundingContributeMainInfo}>
                        <div className={styles.imageCard}>
                            <img
                                src={fundingDetail?.fundingMainImageUrl}
                                alt={fundingDetail?.title || "펀딩 이미지"}
                                className={styles.fundingContributeMainImage}
                            />
                        </div>
                        <div className={styles.fundingContributeDetails}>
                            <p className={styles.fundingContributeDetailsTitle}>펀딩 제목 &nbsp;{fundingDetail?.title}</p>
                            <span className={styles.fundingContributeAmount}></span>
                            <p className={styles.fundingContributeAmount}>
                                후원금액 &nbsp;
                                {selectedRewards
                                    .reduce((sum, reward) => sum + reward.rewardPrice * reward.rewardQuantity, 0)
                                    .toLocaleString()}원

                                <p>목표 금액 {fundingDetail?.goalAmount.toLocaleString()}원</p>
                                {/*<p>현재 달성금액 {fundingDetail?.totalAmount.toLocaleString()}원{" "}</p>*/}

                                <span>
                                {((fundingDetail?.totalAmount / fundingDetail?.goalAmount) * 100).toFixed(2)}% 달성
                            </span>{" "}
                                {Math.ceil(
                                    (new Date(fundingDetail?.endDate) - new Date()) / (1000 * 60 * 60 * 24)
                                )}{" "}
                                일 남음
                            </p>
                        </div>
                    </div>


                    <div className={styles.fundingContributeContent}>
                        <div className={styles.fundingContributeContentInfo}>
                            {/* 리워드 정보  */}
                            <section className={styles.fundingContributeRewardInfo}>
                                <h4 className={styles.sectionTitle}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`}
                                        alt="리워드 아이콘"
                                        className={styles.sectionIcon}
                                    />
                                    리워드 정보
                                </h4>

                                {selectedRewards && selectedRewards.length > 0 ? (
                                    selectedRewards.map((reward) => (
                                        <div key={reward.rewardId} className={styles.fundingContributeRewardItem}>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`}
                                                alt="리워드 아이콘"
                                                className={styles.rewardIcon}
                                            />
                                            <div className={styles.rewardText}>
                                                <h5>{reward.rewardName}</h5>
                                                <p>{reward.rewardDescription}</p>
                                                <p className={styles.rewardPrice}>
                                                    {reward.rewardPrice.toLocaleString()}원 / {reward.rewardQuantity}개
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>선택된 리워드가 없습니다.</p>
                                )}
                            </section>


                            <section className={styles.fundingContributeSupporterInfo}>
                                <h4 className="section-title">👤 후원자 정보</h4>
                                <div className={styles.supporterDetails}>
                                    <p>ID: {user.username}</p>
                                    <p>연락처: {user.phone || "정보 없음"}</p>
                                </div>
                            </section>


                            <section className={styles.fundingContributeShippingInfo}>
                                <h4 className="section-title">📦 배송지 정보</h4>
                                <p className="shipping-note">리워드를 받을 배송지 입력해주세요</p>

                                <div className={styles.shippingDetails}>
                                    <label>
                                        <span>이름</span>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="이름을 입력하세요"
                                            value={shippingInfo.name}
                                            onChange={inputValueShippingInfo}
                                        />
                                    </label>
                                    <label>
                                        <span>연락처</span>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="연락처를 입력하세요"
                                            value={shippingInfo.phoneNumber}
                                            onChange={inputValueShippingInfo}
                                        />
                                    </label>
                                    <label>
                                        <span>주소</span>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="주소를 입력하세요"
                                            value={shippingInfo.address}
                                            onChange={inputValueShippingInfo}
                                        />
                                    </label>
                                </div>

                            </section>
                        </div>
                        {/* 사이드바 */}
                        <aside className={styles.fundingContributeSummary}>
                            <div>
                                <h4>최종 후원 금액</h4>
                                <p className={styles.totalAmount}>
                                    {selectedRewards
                                        .reduce((sum, reward) => sum + reward.rewardPrice * reward.rewardQuantity, 0)
                                        .toLocaleString()}원
                                </p>
                                <label>
                                    <input type="checkbox"/> 개인정보 제 3자 제공 동의
                                </label>
                                <label>
                                    <input type="checkbox"/> 후원 유의사항 확인
                                </label>
                                <p className={styles.noticeText}>
                                    ※ 후원 유의사항: 후원자가 만일 중도 취소할 경우 환불 절차가 필요할 수 있습니다.
                                </p>
                                <button onClick={requestPayment} className={styles.fundingContributeButton}>
                                    펀딩하기
                                </button>
                            </div>
                        </aside>

                    </div>

                </div>
            </div>


        </>
    );
};

export default FundingContribute;
