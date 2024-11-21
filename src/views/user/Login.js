import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/user/Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  // 회원가입 버튼 클릭 시 호출되는 함수
  const handleSignupClick = () => {
    navigate('/user/join'); // /join 경로로 이동
  };
// 아이디 찾기 버튼 클릭 시 호출되는 함수
const handleFindIdClick = () => {
  navigate('/user/findid'); // /user/findid 경로로 이동
};

// 비밀번호 찾기 버튼 클릭 시 호출되는 함수
const handleFindPwdClick = () => {
  navigate('/user/findpwd'); // /user/findpwd 경로로 이동
};


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginSideText}>
        <h2>Museum Of Art<br />Dreams Come True</h2>
      </div>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>WELCOME TO THE <br /> MOA</h1>
        
        <label className={styles.inputLabel} htmlFor="id">ID</label>
        <input type="text" id="id" className={styles.inputBox} />

        <label className={styles.inputLabel} htmlFor="password">PASSWORD</label>
        <input type="text" id="password" className={styles.inputBox} />

        <button className={styles.loginButton}>로그인</button>
        <button className={styles.signupButton} onClick={handleSignupClick}>회원가입</button>

        <div className={styles.findOptions}>
          <button className={styles.findButton} onClick={handleFindIdClick}>아이디 찾기</button>
          <button className={styles.findButton} onClick={handleFindPwdClick}>비밀번호 찾기</button>
        </div>

        <div className={styles.socialLogin}>
          <button className={styles.socialButton}>네이버 소셜로그인</button>
          <button className={styles.socialButton}>카카오 소셜로그인</button>
          <button className={styles.socialButton}>구글 소셜로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
