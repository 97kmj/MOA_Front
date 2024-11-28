import React from 'react';
import styles from '../../css/mypage/InfoEdit.module.css';
import Header from "../Header";
import SideNav from "./SideNav"; // SideNav 컴포넌트 추가

const InfoEdit = () => {
  return (
    <div>
      <Header />
      <div className={styles.layout}>
        <div className={styles.sideNav}>
          <SideNav />
        </div>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>회원정보 수정</h1>
          <div className={styles.container}>
            <div className={styles.imageSection}>
              <div className={styles.imagePlaceholder}>이미지사진</div>
              <span className={styles.role}>[일반회원]</span>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.row}>
                <span className={styles.label}>이름</span>
                <span className={styles.value}>권익재</span>
                <button className={styles.editButton}>수정하기</button>
              </div>
              {/* <div className={styles.row}>
                <span className={styles.label}>닉네임</span>
                <span className={styles.value}>JakeKwon</span>
                <button className={styles.editButton}>수정하기</button>
              </div> */}
              <div className={styles.row}>
                <span className={styles.label}>아이디</span>
                <span className={styles.value}>ijkk9801</span>
                <button className={styles.editButton}>수정하기</button>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>비밀번호</span>
                <span className={styles.value}>****************</span>
                <button className={styles.editButton}>수정하기</button>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>휴대폰 번호</span>
                <span className={styles.value}>010-5814-1377</span>
                <button className={styles.editButton}>수정하기</button>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>주소</span>
                <div className={styles.address}>
                  <span>postcode</span>
                  <span>address</span>
                  <span>detail address</span>
                </div>
                <button className={styles.editButton}>수정하기</button>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>이메일</span>
                <span className={styles.value}>ijkk9801@naver.com</span>
                <button className={styles.editButton}>수정하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoEdit;
