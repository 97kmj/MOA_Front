import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../atoms';
import styles from '../../css/user/Login.module.css';
import {url} from '../../config';
import axios from 'axios';
import Header from "../Header";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져옴
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //일반 로그인 처리
  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post(`${url}/login`, formData);
  
      // 헤더에서 JWT 토큰 읽기
      const token = response.headers['authorization']
      
  
      if (!token) {
        throw new Error('Access Token is missing in response headers.');
      }
  
      // 토큰과 사용자 정보 저장
      setToken(token); // Jotai를 통해 관리
      setUser(response.data); // 본문에서 사용자 정보 저장

      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하세요.');
    }
  };
 
  return (
      <>
      <Header/>
    <div className={styles.loginContainer}>
      <div className={styles.loginSideText}>
        {/*<h2>Museum Of Art<br />Dreams Come True</h2>*/}
      </div>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>WELCOME TO THE <br /> MOA</h1>

        <label className={styles.inputLabel} htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          className={styles.inputBox}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className={styles.inputLabel} htmlFor="password">PASSWORD</label>
        <input
          type="password"
          id="password"
          className={styles.inputBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.loginButton} onClick={handleLogin}>로그인</button>
        <button className={styles.signupButton} onClick={() => navigate('/user/join')}>회원가입</button>

        <div className={styles.findOptions}>
          <button className={styles.findButton} onClick={() => navigate('/user/findid')}>아이디 찾기</button>
          <button className={styles.findButton} onClick={() => navigate('/user/findpwd')}>비밀번호 찾기</button>
        </div>

        <div className={styles.socialLogin}>
          <button className={styles.socialButton}
            onClick={() => (window.location.href = 'http://localhost:8080/oauth2/authorization/naver')}>네이버 로그인</button>
          <button
            className={styles.socialButton}
            onClick={() => (window.location.href = 'http://localhost:8080/oauth2/authorization/kakao')}>카카오 로그인</button>
          <button className={styles.socialButton}>구글 로그인</button>
        </div>
      </div>
    </div>
      </>
  );
};
export default Login;
