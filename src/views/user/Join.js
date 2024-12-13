import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/user/Join.module.css";
import Header from "../Header";
import {url} from '../../config';
import axios from "axios";

function Join() {
    const navigate = useNavigate();

    const [type, setType] = useState("sms");
    const [verification, setVerification] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
  
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        passwordCheck: "",
        postcode: "",
        address: "",
        detailAddress: "",
        extraAddress: "",
        phone: "",
        phoneCode: "",
        name: "",
        email: "",
        emailCode: "",
    });

    // 아이디 중복 확인
    const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 중복 확인 상태
    const handleUsernameCheck = async () => {
        if (!formData.id.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }
        axios.get(`${url}/api/user/check-username?username=${formData.id}`)
            .then(res => {
                setIsIdAvailable(res.data);
                if (res.data) {
                    alert("사용 가능한 아이디입니다.");
                } else {
                    alert("이미 사용 중인 아이디입니다.");
                }
            })
            .catch(error => {
                alert("아이디 중복 확인 중 에러가 발생했습니다.");
            })
        
    };

    // 비밀번호 확인 상태
    const [passwordMatch, setPasswordMatch] = useState(null);
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    useEffect(() => {
        if (formData.password && formData.passwordCheck) {
            setPasswordMatch(formData.password === formData.passwordCheck);
        } else {
            setPasswordMatch(null); // 초기 상태로 설정
        }
    }, [formData.password, formData.passwordCheck]);


    const [verificationStatus, setVerificationStatus] = useState(null); // 인증 상태 저장

    const reqVerificationCode = (e) => {
        e.preventDefault();
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
    
    const sendVerificationCode = (e) => {
        e.preventDefault();
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
        const param = {[type]:verification,verificationCode:verificationCode,type:"join"}    
        axios.post(`${url}/api/verification/${path}`, param)
          .then(res=>{
            console.log(res.data);
            setIsVerified(res.data.verified)
            if(res.data.verified===true) {
              alert("인증이 완료되었습니다")
              setVerificationStatus(true);
            } else {
              alert("인증에 실패했습니다")
              setVerificationStatus(false);
            }
          }).catch(err=>{
            console.log(err)
            alert("인증에 실패했습니다")
            setVerificationStatus(false);
        })
      }

    // Input change handler
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        // 비밀번호 확인 상태 업데이트
        if (id === "password" || id === "passwordCheck") {
            setPasswordMatch(formData.password === (id === "password" ? value : formData.passwordCheck));
        }
    };


    // Daum Postcode API handler
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                let addr = ""; // 주소 변수
                let extraAddr = ""; // 참고항목 변수

                if (data.userSelectedType === "R") {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                if (data.userSelectedType === "R") {
                    if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    if (data.buildingName && data.apartment === "Y") {
                        extraAddr += (extraAddr !== "" ? ", " + data.buildingName : data.buildingName);
                    }
                    if (extraAddr !== "") {
                        extraAddr = " (" + extraAddr + ")";
                    }
                }

                setFormData((prevData) => ({
                    ...prevData,
                    postcode: data.zonecode,
                    address: addr,
                    extraAddress: extraAddr,
                }));

                document.getElementById("detailAddress").focus();
            },
        }).open();
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isIdAvailable) {
            alert("아이디 중복 체크가 필요합니다.");
            return;
        }

        if (formData.password !== formData.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if(!verificationStatus) {
            alert("사용자 인증이 필요합니다.")
            return;
        }

        try {
            const response = await fetch(`${url}/api/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.id,
                    password: formData.password,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    postcode: formData.postcode,
                    address: formData.address,
                    detailAddress: formData.detailAddress,
                    extraAddress: formData.extraAddress,
                }),
            });

            if (response.ok) {
                alert("회원가입이 완료되었습니다!");
                navigate("/user/login");

                // Reset form
                setFormData({
                    id: "",
                    password: "",
                    passwordCheck: "",
                    postcode: "",
                    address: "",
                    detailAddress: "",
                    extraAddress: "",
                    phone: "",
                    phoneCode: "",
                    name: "",
                    email: "",
                    emailCode: "",
                });
            } else {
                const errorData = await response.json();
                alert(`회원가입 실패: ${errorData.message}`);
            }
        } catch (error) {
            alert("에러가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const changeVerificationType = (e, ctype) => {
        e.preventDefault();
        setType(ctype);
        setVerification('');
        setVerificationCode('');
    }

    return (
        <>
            <Header />
            <div className={styles.joinContainer}>
                <h1 className={styles.joinTitle}>MOA에 오신 것을 환영합니다</h1>
                <form onSubmit={handleSubmit}>
                    {/* ID */}
                    <div className={styles.formGroup}>
                        <label htmlFor="id">아이디</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="id"
                                value={formData.id}
                                onChange={handleChange}
                                placeholder="아이디 입력"
                                required
                            />
                            <button type="button" onClick={handleUsernameCheck}>
                                확인
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name">이름</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="이름 입력"
                                required
                            />
                        </div>
                    </div>                    

                    {/* Password */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password">비밀번호</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="비밀번호 입력"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Check */}
                    <div className={styles.formGroup}>
                        <label htmlFor="passwordCheck">비밀번호 확인</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                id="passwordCheck"
                                value={formData.passwordCheck}
                                onChange={handleChange}
                                placeholder="비밀번호 확인"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        {passwordMatch === true && (
                            <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>
                                비밀번호가 일치합니다.
                            </p>
                        )}
                        {passwordMatch === false && (
                            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                                비밀번호가 일치하지 않습니다.
                            </p>
                        )}
                    </div>

                    {/* email */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name">이메일</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="이메일 입력"
                                required
                            />
                        </div>
                    </div>

                    {/* phone */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name">전화번호</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="전화번호 입력"
                                required
                            />
                        </div>
                    </div>                    

                    {/* Address */}
                    <div className={styles.formGroup}>
                        <label htmlFor="address">주소</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="postcode"
                                value={formData.postcode}
                                onChange={handleChange}
                                placeholder="우편번호"
                                required
                            />
                            <button type="button" onClick={handleAddressSearch}>
                                찾기
                            </button>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="주소"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="detailAddress"
                                value={formData.detailAddress}
                                onChange={handleChange}
                                placeholder="상세주소"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="extraAddress"
                                value={formData.extraAddress}
                                onChange={handleChange}
                                placeholder="참고항목"
                            />
                        </div>
                    </div>



                    <div className={styles.buttonGroup}>
                        <button className={type === "sms" ? styles.selbutton : styles.button}
                            onClick={(e) => changeVerificationType(e,"sms")}>휴대폰번호 인증</button>
                        <button className={type === "email" ? styles.selbutton : styles.button}
                            onClick={(e) => changeVerificationType(e,"email")}>이메일 인증</button>
                    </div>                    

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">{type==="sms"? '휴대전화번호':'이메일'}</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                value={verification}
                                onChange={(e)=>setVerification(e.target.value)}
                                placeholder={type==="sms"? '휴대전화번호':'이메일'}
                            />
                            <button type="button" onClick={reqVerificationCode}>
                                전송
                            </button>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e)=>setVerificationCode(e.target.value)}
                                placeholder="인증번호"
                            />
                            <button type="button" onClick={sendVerificationCode}>
                                확인
                            </button>
                        </div>
                        {verificationStatus === true && (
                            <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>인증이 완료되었습니다.</p>
                        )}
                        {verificationStatus === false && (
                            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>인증번호가 일치하지 않습니다.</p>
                        )}
                    </div>


                    {/* Submit Button */}
                    <button type="submit" className={styles.submitButton}>
                        회원가입
                    </button>
                </form>
            </div>
        </>
    );
}

export default Join;
