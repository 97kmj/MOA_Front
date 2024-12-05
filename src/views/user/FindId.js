import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/user/FindId.module.css';
import {url} from '../../config';
import axios from 'axios';

const FindId = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("sms");
  const [verification, setVerification] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState("");

  // 아이디 찾기 버튼 클릭 시 호출되는 함수
  const handleFindIdClick = () => {
    if(isVerified===false) {
      alert("인증이 필요합니다");
      return;
    }
    navigate(`/user/findIdResult/${username}`); // /user/findIdResult 경로로 이동
  };
  const reqVerificationCode = () => {
    if(verification===null || verification==='') {
      if(type==="sms") {
        alert("전화번호를 입력하세요");
      } else {
        alert("이메일을 입력하세요");
      }
      return;
    }
    const path = "send-"+type;
    const param = {[type]:verification}
    console.log(param)
    axios.post(`${url}/api/verification/${path}`, param)
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
    console.log(isRequired)
    if(isRequired!==true) {
      alert("인증코드를 요청하세요")
      return;
    }
    if(verificationCode===null || verificationCode==='') {
      alert("인증코드를 입력하세요");
      return;
    }
    const path = "verify-"+type;
    const param = {[type]:verification,verificationCode:verificationCode}    
    axios.post(`${url}/api/verification/${path}`, param)
      .then(res=>{
        console.log(res.data);
        setIsVerified(res.data.verified)
        if(res.data.verified===true) {
          setUsername(res.data.username)
          alert("인증이 완료되었습니다")
        } else {
          alert("인증에 실패했습니다")
        }
      }).catch(err=>{
        console.log(err)
        alert("인증에 실패했습니다")
      })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MOA</h1>
      <h2 className={styles.subtitle}>아이디 찾기</h2>
      <div className={styles.separator}></div>

      <div className={styles.buttonGroup}>
        <button className={type==="sms"? styles.selbutton: styles.button} 
          onClick={()=>setType("sms")}>휴대폰번호로 찾기</button>
        <button className={type==="email"? styles.selbutton: styles.button}
          onClick={()=>setType("email")}>이메일로 찾기</button>        
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
          onChange={(e)=>setVerificationCode(e.target.value)}
        />
      </div>

      <div className={styles.alignCenter}>
        <button className={styles.primaryButton} onClick={handleFindIdClick}>
          아이디 찾기
        </button>
      </div>
    </div>
  );
};

export default FindId;
