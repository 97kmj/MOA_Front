import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/user/Join.module.css";

function Join() {
    const navigate = useNavigate();

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
    try {
        const response = await fetch(`http://localhost:8080/api/user/check-username?username=${formData.id}`);
        const isAvailable = await response.json();

        if (isAvailable) {
            alert("사용 가능한 아이디입니다.");
            setIsIdAvailable(true);
        } else {
            alert("이미 사용 중인 아이디입니다.");
            setIsIdAvailable(false);
        }
    } catch (error) {
        alert("아이디 중복 확인 중 에러가 발생했습니다.");
    }
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

    // 전화번호 인증 코드 전송
    const handleSendCode = async () => {
        if (!formData.phone) {
            alert("전화번호를 입력해주세요.");
            return;
        }
    
        // 전화번호를 국제 형식으로 변환
        let formattedPhone = formData.phone;
        if (formattedPhone.startsWith("0")) {
            formattedPhone = "+82" + formattedPhone.substring(1); // 0을 +82로 변경
        }
    
        try {
            const response = await fetch("http://localhost:8080/api/phone/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedPhone), // 변환된 전화번호 사용
            });
    
            if (response.ok) {
                alert("인증 코드가 발송되었습니다.");
            } else {
                alert("인증 코드 발송에 실패했습니다.");
            }
        } catch (error) {
            alert("에러가 발생했습니다. 다시 시도해주세요.");
        }
    };
    

    // 전화번호 인증 코드 검증
    const handleVerifyCode = async () => {
        if (!formData.phoneCode) {
            alert("인증번호를 입력해주세요.");
            return;
        }
    
        // 전화번호를 국제 형식으로 변환
        let formattedPhone = formData.phone;
        if (formattedPhone.startsWith("0")) {
            formattedPhone = "+82" + formattedPhone.substring(1); // 0을 +82로 변경
        }
    
        try {
            const response = await fetch("http://localhost:8080/api/phone/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: formattedPhone, // 변환된 전화번호 사용
                    code: formData.phoneCode,
                }),
            });
    
            const result = await response.text();
            if (response.ok && result === "Verification successful!") {
                setVerificationStatus(true);
                alert("전화번호 인증이 완료되었습니다.");
            } else {
                setVerificationStatus(false);
                alert("인증번호가 일치하지 않습니다.");
            }
        } catch (error) {
            alert("에러가 발생했습니다. 다시 시도해주세요.");
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

        if (formData.password !== formData.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
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

    return (
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
                        />
                        <button type="button" onClick={handleUsernameCheck}>
                            확인
                        </button>                    
                    </div>
                </div>

                {/* Password */}
                <div className={styles.formGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호 입력"
                    />
                </div>

                {/* Password Check */}
                <div className={styles.formGroup}>
                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                    <input
                        type="password"
                        id="passwordCheck"
                        value={formData.passwordCheck}
                        onChange={handleChange}
                        placeholder="비밀번호 확인"
                    />
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
                        />
                        <button type="button" onClick={handleAddressSearch}>
                            찾기
                        </button>
                    </div>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="주소"
                    />
                    <input
                        type="text"
                        id="detailAddress"
                        value={formData.detailAddress}
                        onChange={handleChange}
                        placeholder="상세주소"
                    />
                    <input
                        type="text"
                        id="extraAddress"
                        value={formData.extraAddress}
                        onChange={handleChange}
                        placeholder="참고항목"
                    />
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label htmlFor="phone">전화번호</label>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder=" - 를 제외한 숫자만 입력"
                        />
                        <button type="button" onClick={handleSendCode}>
                        전송
                    </button>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="phoneCode"
                            value={formData.phoneCode}
                            onChange={handleChange}
                            placeholder="인증번호 확인"
                        />
                        <button type="button" onClick={handleVerifyCode}>
                        확인
                    </button>
                    </div>
                    {verificationStatus === true && (
                    <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>전화번호 인증이 완료되었습니다.</p>
                )}
                {verificationStatus === false && (
                    <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>인증번호가 일치하지 않습니다.</p>
                )}
                </div>

                {/* Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름 입력"
                    />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email">이메일</label>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button">전송</button>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="emailCode"
                            value={formData.emailCode}
                            onChange={handleChange}
                            placeholder="인증번호 확인"
                        />
                        <button type="button">확인</button>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Join;
