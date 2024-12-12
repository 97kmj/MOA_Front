import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/user/FindPwd.module.css';
import {url} from '../../config';
import axios from 'axios';
import FindPwdResult from './FindPwdResult'

const FindPwd = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("sms");
  const [verification, setVerification] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [id, setId] = useState('');
  const [idConfirm, setIdConfirm] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  // 비밀번호 찾기 버튼 클릭 시 호출되는 함수
  const handleFindPwdClick = () => {
    if(isVerified===false) {
      alert("인증이 필요합니다");
      return;
    }    
    setIsChangePassword(true);
    //navigate(`/user/findPwdResult/${id}`); // /user/findPwdResult 경로로 이동
  };

  const confirmId = () => {
    if(id===null || id==='') {
      alert("아이드를 입력하세요")
      return;
    }
    axios.post(`${url}/api/verification/confirmId`, {username:id})
      .then(res=> {
        console.log(res)
        setIdConfirm(res.data);
        if(res.data===true) {
          alert("아이디가 맞습니다")
        } else {
          alert("아이디가 틀립니다")
        }
      })
      .catch(err=> {
        console.log(err)
        alert("오류가 발생했습니다")
      })
  }

  const reqVerificationCode = () => {
    if(idConfirm===false) {
      alert("아이디를 확인하세요")
      return;
    }

    if(verification===null || verification==='') {
      if(type==="sms") {
        alert("전화번호를 입력하세요")
      } else {
        alert("이메일을 입력하세요")
      }
      return;
    }

    const path = `send-${type}`;
    axios.post(`${url}/api/verification/${path}`, {[type]:verification})
      .then(res=>{
        console.log(res.data);
        setIsRequired(res.data);
        if(res.data===true) {
          alert("인증코드를 확인하세요")
        } else {
          alert("인증코드 전송에 실패했습니다")
        }
      }).catch(err=>{
        console.log(err)
        alert("인증코드 전송에 실패했습니다")
      })
  }

  const sendVerificationCode = () => {
    if(idConfirm===false) {
      alert("아이디를 확인하세요")
      return;
    }

    if(isRequired!==true) {
      alert("인증코드를 요청하세요")
      return;
    }
    if(verificationCode===null || verificationCode==='') {
      alert("인증코드를 입력하세요");
      return;
    }

    const path = `verify-${type}`;
    const param = {[type]:verification,verificationCode:verificationCode,type:"search"};
    axios.post(`${url}/api/verification/${path}`, param)
      .then(res=>{
        console.log(res.data);
        setIsVerified(res.data.verified)
        setId(res.data.username)
        if(res.data.verified===true) {
          alert("인증이 완료되었습니다")
        } else {
          alert("인증에 실패했습니다")
        }
      }).catch(err=>{
        console.log(err)
        alert("인증에 실패했습니다")
      })
  }

  const changeVerificationType = (ptype) => {
    setType(ptype);
    setVerification('');
    setVerificationCode('');
  }

  return (
    <>
    { isChangePassword===false && <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>비밀번호 찾기</h2>
      <div className={styles.separator}></div>

      <div className={styles.buttonGroup}>
        <button className={type==="sms"? styles.selbutton: styles.button} 
          onClick={()=>changeVerificationType("sms")}>휴대폰번호 인증</button>
        <button className={type==="email"? styles.selbutton: styles.button}
          onClick={()=>changeVerificationType("email")}>이메일로 인증</button>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>아이디</label>
          <button className={styles.smallButton} onClick={confirmId}>확인</button>
        </div>
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="아이디 입력"
          onChange={(e)=>{setIdConfirm(false); setId(e.target.value);}}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>{type==="sms"? '휴대전화번호':'이메일'}</label>
          <button className={styles.smallButton} onClick={reqVerificationCode}>인증번호 요청</button>
        </div>
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder={type==="sms"? '휴대전화번호':'이메일'}
          value={verification}
          onChange={(e)=>setVerification(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.titleWithButton}>
          <label className={styles.label}>인증번호</label>
          <button className={styles.smallButton} onClick={sendVerificationCode}>확인</button>
        </div>
        <input
          type="text"
          className={`${styles.input} ${styles.shortInput}`}
          placeholder="인증번호"
          value={verificationCode}
          onChange={(e)=>setVerificationCode(e.target.value)}
        />
      </div>

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton} onClick={handleFindPwdClick}>
          비밀번호 변경
        </button>
      </div>
    </div>
  }
  { isChangePassword===true && id!==null && id!=='' && <FindPwdResult username={id}/> }
  </>
  );
};

export default FindPwd;
