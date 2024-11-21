import React from "react";
import styles from "../../css/user/Join.module.css";

function Join() {
    return (
        <div className={styles.joinContainer}>
            <h1 className={styles.joinTitle}>
                MOA에 오신 것을 환영합니다
                {/* <br />회원가입을 위한 정보들을<br />빠짐없이 입력해 주세요 */}
            </h1>
            
            <form>
                {/* ID */}
                <div className={styles.formGroup}>
                    <label htmlFor="id">아이디</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="id" placeholder="아이디 입력" />
                        <button type="button">확인</button>
                    </div>
                </div>

                {/* Password */}
                <div className={styles.formGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" placeholder="비밀번호 입력" />
                </div>

                {/* Password Check */}
                <div className={styles.formGroup}>
                    <label htmlFor="password-check">비밀번호 확인</label>
                    <input type="password" id="password-check" placeholder="비밀번호 확인" />
                </div>

                {/* Address */}
                <div className={styles.formGroup}>
                    <label htmlFor="address">주소</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="postcode" placeholder="우편번호" />
                        <button type="button">찾기</button>
                    </div>
                    <input type="text" id="address" placeholder="주소" />
                    <input type="text" id="detail-address" placeholder="상세주소" />
                    <input type="text" id="extra-address" placeholder="상세주소" />
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label htmlFor="phone">전화번호</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="phone" placeholder="전화번호 입력" />
                        <button type="button">전송</button>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="text" id="phone-code" placeholder="인증번호 확인" />
                        <button type="button">확인</button>
                    </div>
                </div>

                {/* Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" placeholder="사용할 이름 입력" />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email">이메일</label>
                    <div className={styles.inputGroup}>
                        <input type="email" id="email" placeholder="이메일 입력" />
                        <button type="button">전송</button>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="text" id="email-code" placeholder="인증번호 확인" />
                        <button type="button">확인</button>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>회원가입</button>
            </form>
        </div>
    );
}

export default Join;
