import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/user/FindPwdResult.module.css';
import {useParams} from 'react-router-dom';
import {url} from '../../config';
import axios from 'axios';

const FindPwdResult = ({username}) => {
  const navigate = useNavigate();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const changePassword = () => {
    if(password1!==password2) {
      alert("비빌번호 확인이 틀립니다")
      return;
    }
    axios.post(`${url}/api/verification/changePassword`, {username:username,password:password1})
      .then(res=> {
        console.log(res);
        if(res.data===true) {
          setIsChanged(res.data);
          alert("비밀번호가 변경되었습니다")
        } else {
          alert("비밀번호 변경에 오류가 발생했습니다")
        }
      })
      .catch(err=> {
        console.log(err)
        alert("비밀번호 변경에 오류가 발생했습니다")
      })
  }
  // 로그인 화면으로 돌아가기 버튼 클릭 시 호출되는 함수
  const handleGoToLogin = () => {
    navigate('/user/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>비밀번호 변경</h2>
      <div className={styles.separator}></div>

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>새로운 비밀번호 입력</label>
          <button className={styles.smallButton} onClick={changePassword}>확인</button>
        </div>
        <input
          type="password"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="새로운 비밀번호"
          onChange={(e)=>setPassword1(e.target.value)}
        />
        <input
          type="password"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="비밀번호 확인"
          onChange={(e)=>setPassword2(e.target.value)}
        />
      </div>

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton} onClick={handleGoToLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default FindPwdResult;
