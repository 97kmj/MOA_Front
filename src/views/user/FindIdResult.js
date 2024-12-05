import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/user/FindIdResult.module.css';
import {useParams} from 'react-router-dom';

const FindIdResult = () => {
  const navigate = useNavigate();
  const foundId = "exampleID123"; // 예제 데이터, 실제로는 API를 통해 가져와야 함.
  const {id} = useParams();

  // 로그인 화면으로 돌아가기 버튼 클릭 시 호출되는 함수
  const handleGoToLogin = () => {
    navigate('/user/login');
  };

  // 비밀번호 찾기 버튼 클릭 시 호출되는 함수
  const handleFindPwd = () => {
    navigate('/user/findpwd');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>아이디 찾기</h2>
      <div className={styles.separator}></div>

      <div className={styles.resultGroup}>
        <label className={styles.label}>아이디</label>
        <div className={styles.foundId}>{id}</div>
      </div>

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton} onClick={handleGoToLogin}>
          로그인
        </button>
        <button className={styles.primaryButton} onClick={handleFindPwd}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default FindIdResult;
