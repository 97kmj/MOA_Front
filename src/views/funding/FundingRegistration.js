import React from 'react';
import styles from'../../css/funding/FundingRegistration.module.css';
import Header from "../Header";

function FundingRegistration() {
    return (

       <>
           <Header/>
      <div className={styles.fundingRegistrationOutForm}>
          <div className={styles.fundingRegistration}>
              <h2>펀딩 등록</h2>

              {/* 목표 금액 및 펀딩 일정 안내 */}
              <div className={styles.fundingRegistrationInfo}>
                  <div className={styles.fundingRegistrationInfoSection}>
                      <h3>목표 금액</h3>
                      <p>프로젝트를 완수하기 위해 필요한 금액을 설정해주세요.</p>
                      <ul>
                          <li>목표 금액에 도달하지 못하면 펀딩이 성사되지 않습니다.</li>
                          <li>취소 및 지연 등을 고려하여 목표 금액을 설정하세요.</li>
                      </ul>
                  </div>
                  <div className={styles.fundingRegistrationInfoSection}>
                      <h3>펀딩 일정</h3>
                      <p>설정한 일정에 따라 펀딩이 자동 시작됩니다.</p>
                  </div>
              </div>

              {/* 등록자 정보 */}
              <div className={styles.fundingRegistrationBox}>
                  <h3>등록자 정보</h3>
                  <div className={styles.fundingRegistrationRow}>
                      <label>이름</label>
                      <input type="text" placeholder="등록자 이름을 입력하세요"/>
                  </div>
                  <div className={styles.fundingRegistrationRow}>
                      <label>입금 계좌</label>
                      <div className={styles.fundingRegistrationAccount}>
                          <select>
                              <option value="카카오">카카오</option>
                              <option value="네이버">네이버</option>
                          </select>
                          <input type="text" placeholder="계좌 정보를 입력하세요"/>
                      </div>
                  </div>
              </div>

              {/* 목표 금액 */}
              <div className={styles.fundingRegistrationBox}>
                  <h3>목표 금액</h3>
                  <input type="text" placeholder="목표 금액을 입력하세요"/>
                  <div className={styles.fundingRegistrationGoalInfo}>
                      <p>목표 금액 달성 시 예상 수익액: 900,000원</p>
                      <p>총 수수료: 100,000원</p>

                  </div>
              </div>

              {/* 펀딩 일정 */}
              <div className={styles.fundingRegistrationBox}>
                  <h3>펀딩 일정</h3>
                  <div className={styles.fundingRegistrationRow}>
                      <label>공지하기</label>
                      <select>
                          <option>7일 전</option>
                      </select>
                  </div>
                  <div className={styles.fundingRegistrationRow}>
                      <label>시작일</label>
                      <input type="date"/>
                  </div>
                  <div className={styles.fundingRegistrationRow}>
                      <label>종료일</label>
                      <input type="date"/>
                  </div>
              </div>

              <button className={styles.fundingRegistrationSubmit}>다음 단계</button>
          </div>
      </div>
       </>
    );
}

export default FundingRegistration;
