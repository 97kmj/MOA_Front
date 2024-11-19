import React from 'react';
import styles from '../../css/user/FindPwdResult.module.css';

const FindPwdResult = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>비밀번호찾기</h2>
      <div className={styles.separator}></div>

      

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>새로운 비밀번호 입력</label>
          <button className={styles.smallButton}>확인</button>
        </div>
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="새로운 비밀번호"
        />
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="비밀번호 확인"
        />

      </div>

      

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton}>로그인 화면으로 돌아가기 </button>
      </div>
    </div>
  );
};

export default FindPwdResult;
