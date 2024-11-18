import React from 'react';
import styles from '../../css/funding/FundingRegistrationThankYou.module.css';
import Header from "../Header";

const FundingRegistrationThankYou = () => {
    return (
       <>
           <Header/>
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.aboutTitle}>ABOUT THE Funding</h2>
                <img
                    src={`${process.env.PUBLIC_URL}/img/funding/done.png`}
                    alt="아이콘"
                    className={styles.icon}
                />
            </div>
            <h1 className={styles.title}>펀딩을 등록 신청해주셔서 감사합니다</h1>
            <p className={styles.subtitle}>
                마이페이지에서 등록한 펀딩 정보를 확인하실 수 있습니다.
                <br />
                펀딩 심사는 펀딩에 따라 일정이 다를 수 있습니다.
            </p>
            <button className={styles.confirmButton}>확인</button>
        </div>
       </>
    );
};

export default FundingRegistrationThankYou;
