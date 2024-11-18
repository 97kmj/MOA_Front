import React from 'react';
import styles from '../../css/funding/StepNavigation.module.css';

function StepNavigation({ currentStep }) {
    return (
        <div className={styles.stepNavigation}>
            <span className={`${styles.step} ${currentStep === '펀딩 등록' ? styles.active : ''}`}>펀딩 등록</span>
            <span> &gt; </span>
            <span className={`${styles.step} ${currentStep === '리워드 등록' ? styles.active : ''}`}>리워드 등록</span>
            <span> &gt; </span>
            <span className={`${styles.step} ${currentStep === '펀딩 계획' ? styles.active : ''}`}>펀딩 계획</span>
        </div>
    );
}

export default StepNavigation;
