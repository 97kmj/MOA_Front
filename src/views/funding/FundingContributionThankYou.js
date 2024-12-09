import React from 'react';
import styles from '../../css/funding/FundingRegistrationThankYou.module.css';
import Header from "../Header";
import {useNavigate} from "react-router-dom";

const FundingRegistrationThankYou = () => {
    const navigate = useNavigate();

    //메인으로 가려는 함수
    const goToMain = () => {
        navigate("/"); // 메인 페이지로 이동
    };



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
            <h1 className={styles.title}>펀딩을 후원을 해주셔서 감사합니다</h1>
            <p className={styles.subtitle}>
                마이페이지에서 후원 내역을 확인하실수있습니다
                <br />
                펀딩 환불은 후원 마감 당일까지만 가능합니다!
            </p>
            <button className={styles.confirmButton} onClick={goToMain}>확인</button>
        </div>
       </>
    );
};

export default FundingRegistrationThankYou;
