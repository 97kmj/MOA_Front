import React, {useState} from 'react';
import styles from'../../css/funding/FundingRegistration.module.css';
import Header from "../Header";
import StepNavigation from "./StepNavigation";
import {useNavigate} from "react-router-dom";
import useFundingStore from "./store/fundingStore";
import {useAtom} from "jotai/react";
import {userAtom} from "../../atoms";

function FundingRegistration() {
    const [user] = useAtom(userAtom);
    const setFundingInfo = useFundingStore((state) => state.setFundingInfo);

    // 로컬 상태 관리
    const [goalAmount, setGoalAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [registrantName, setRegistrantName] = useState('');
    const [accountInfo, setAccountInfo] = useState({ bank: '카카오', account: '' });

    const navigate = useNavigate();

    // 숫자 입력 검증 함수
    const validationNumericInput = (e, setter) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // 숫자만 허용
            setter(value);
        }
    };

    const goToNextStep = () => {
        if (!goalAmount || isNaN(Number(goalAmount))) {
            alert("목표 금액은 숫자만 입력해야 합니다.");
            return;
        }

        if (!accountInfo.account || isNaN(Number(accountInfo.account))) {
            alert("계좌 번호는 숫자만 입력해야 합니다.");
            return;
        }

        if (!startDate || !endDate) {
            alert("펀딩 일정을 모두 입력해주세요.");
            return;
        }

        // Zustand 스토어에 펀딩 정보를 저장
        setFundingInfo({
            goalAmount,
            user,
            schedule: { startDate, endDate },
            registrant: {
                name: registrantName,
                account: accountInfo,
            },
        });

        // Zustand 상태 확인
        console.log("Zustand 상태:", useFundingStore.getState().fundingInfo);

        // RewardCreation 페이지로 이동
        navigate("/funding/new/rewards");
    };

    return (
        <>
            <Header />
            <div className={styles.fundingRegistrationOutForm}>
                <StepNavigation currentStep="펀딩 등록" />
                <div className={styles.fundingRegistration}>
                    <div className={styles.fundingRegistrationInfo}>
                        <div className={styles.fundingRegistrationInfoSection}>
                            <h3>목표 금액</h3>
                            <p>프로젝트를 완수하기 위해 필요한 금액을 설정해주세요.</p>
                            <ul>
                                <li>목표 금액에 도달하지 못하면 펀딩이 성사되지 않습니다.</li>
                                <li>취소 및 지연 등을 고려하여 목표 금액을 설정하세요.</li>
                            </ul>
                        </div>
                        <div className={styles.fundingRegistrationInfoSection}>
                            <h3>펀딩 일정</h3>
                            <p>설정한 일정에 따라 펀딩이 자동 시작됩니다.</p>
                        </div>
                    </div>

                    <div className={styles.fundingRegistrationBox}>
                        <h3>등록자 정보</h3>
                        <div className={styles.fundingRegistrationRow}>
                            <label>이름</label>
                            <input
                                type="text"
                                placeholder="등록자 이름을 입력하세요"
                                value={registrantName}
                                onChange={(e) => setRegistrantName(e.target.value)}
                            />
                        </div>
                        <div className={styles.fundingRegistrationRow}>
                            <label>입금 계좌</label>
                            <div className={styles.fundingRegistrationAccount}>
                                <select
                                    value={accountInfo.bank}
                                    onChange={(e) =>
                                        setAccountInfo({ ...accountInfo, bank: e.target.value })
                                    }
                                >
                                    <option value="카카오">카카오</option>
                                    <option value="네이버">네이버</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="계좌 번호를 입력하세요"
                                    value={accountInfo.account}
                                    onChange={(e) => validationNumericInput(e, (val) =>
                                        setAccountInfo({ ...accountInfo, account: val })
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.fundingRegistrationBox}>
                        <h3>목표 금액</h3>
                        <input
                            type="text"
                            placeholder="목표 금액을 입력하세요"
                            value={goalAmount}
                            onChange={(e) => validationNumericInput(e, setGoalAmount)}
                        />
                    </div>

                    <div className={styles.fundingRegistrationBox}>
                        <h3>펀딩 일정</h3>
                        <div className={styles.fundingRegistrationRow}>
                            <label>시작일</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className={styles.fundingRegistrationRow}>
                            <label>종료일</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className={styles.fundingRegistrationSubmit}
                        onClick={goToNextStep}
                    >
                        다음 단계
                    </button>
                </div>
            </div>
        </>
    );
}

export default FundingRegistration;
