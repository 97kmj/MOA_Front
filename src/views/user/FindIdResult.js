import React from 'react';
import styles from '../../css/user/FindIdResult.module.css';

const FindIdResult = () => {
  const foundId = "exampleID123"; // 예제 데이터, 실제로는 API를 통해 가져와야 함.

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>아이디찾기</h2>
      <div className={styles.separator}></div>

      <div className={styles.resultGroup}>
        <label className={styles.label}>찾은 아이디</label>
        <div className={styles.foundId}>{foundId}</div>
      </div>

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton}>로그인 화면으로 돌아가기</button>
        <button className={styles.primaryButton}>비밀번호 찾기</button>
      </div>
    </div>
  );
};

export default FindIdResult;
