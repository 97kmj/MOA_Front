import React from 'react';
import styles from '../../css/user/FindId.module.css';

const FindId = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>아이디찾기</h2>
      <div className={styles.separator}></div>

      <div className={styles.buttonGroup}>
        <button className={styles.button}>휴대폰번호로 찾기</button>
        <button className={styles.button}>이메일로 찾기</button>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>휴대전화번호</label>
          <button className={styles.smallButton}>인증번호 전송</button>
        </div>
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="휴대전화 번호"
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>인증번호</label>
          <button className={styles.smallButton}>확인</button>
        </div>
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="인증번호"
        />
      </div>

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton}>아이디 찾기</button>
      </div>
    </div>
  );
};

export default FindId;
