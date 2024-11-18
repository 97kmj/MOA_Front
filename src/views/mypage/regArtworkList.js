import React from 'react';
import styles from '../../css/mypage/regArtworkList.module.css';
import SideNav from './side';

function RegArtworkList() {
  return (
    <div className={styles.containerMy}>
      {/* 사이드 네비게이션 */}
      <SideNav />

      {/* 메인 컨텐츠 */}
      <div className={styles.contentArea}>
        <div className={styles.myBidlist}>
          <div className={`${styles.contentTitle} ${styles.contentTitleBorder}`}>
            <div className={styles.title}>
              <h2>등록작품목록</h2>
            </div>
          </div>

          {/* 필터 */}
          <form action="#" method="get">
            <div className={styles.filters}>
              <button type="submit" name="num" value="1">최근 1개월</button>
              <button type="submit" name="num" value="3">3개월</button>
              <button type="submit" name="num" value="6">6개월</button>
              <input
                type="text"
                id="daterange"
                name="daterange"
                style={{ width: '200px' }}
              />
              <input type="hidden" id="startDate" name="startDate" />
              <input type="hidden" id="endDate" name="endDate" />
              <button type="submit">조회</button>
            </div>
          </form>

          {/* 작품 리스트 */}
          <div className={styles.itemContainer}>
            <div className={styles.item}>
              <span>목표금액</span>
            </div>
            <div className={styles.item}>
              <span>최종가</span>
            </div>
            <div className={styles.item}>
              <span>펀딩종료일</span>
            </div>
          </div>

          {/* 작품 항목 - 기본 레이아웃 */}
          <div className={styles.historyItem}>
            <img src="/img/sample.jpg" alt="작품 이미지" />
            <div className={styles.historyContent}>
              <span>작품 제목</span>
            </div>
            <div className={styles.prices}>
              <span>목표금액: 100,000원</span>
              <span style={{ color: 'red' }}>최종가: 90,000원</span>
              <span>2024-11-11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegArtworkList;
