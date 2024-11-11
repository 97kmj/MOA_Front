import React from 'react';
import styles from '../../css/funding/FundingList.module.css';
import Header from "../Header";


const FundingList = () => {
    // 임의의 펀딩 데이터 생성
    const fundings = Array.from({ length: 8 }, (_, index) => ({
        imageUrl:`${process.env.PUBLIC_URL}/img/funding/image6.png`,
        title: '서울대학교 전시기획안내',
        description: '일시 개별링크 <선택의자유: 나만의 공간>',
        progress: 47,
        amount: '236,000원',
        daysLeft: 17,
    }));

    return (
      <>
      <Header/>
        <div className={styles.fundingList}>
         <div>
            <h3>펀딩하기</h3>
            <div className={styles.titleLine}></div> {/* 금색 줄  */}

             <div className={styles.filter}>
                 <div className={styles.customSelect}>
                     <select>
                         <option>최신순</option>
                         {/* 다른 정렬 옵션 추가 가능 */}
                     </select>
                 </div>
                 </div>
                 <div className={styles.fundingCards}>
                     {fundings.map((funding, index) => (
                         <div key={index} className={styles.fundingCard}>
                             <img src={funding.imageUrl} alt={funding.title}/>
                             <div className={styles.fundingInfo}>
                                 <h3>{funding.title}</h3>
                                 <p>{funding.description}</p>
                                 <div className={styles.fundingStats}>
                                     <div className={styles.progressBar}>
                                         <div className={styles.fundingListProgressBar}
                                              style={{width: `${funding.progress}%`}}></div>
                                     </div>
                                     <span>{funding.progress}% 달성</span>
                                     <span>{funding.amount}</span>
                                     <span>{funding.daysLeft}일 남음</span>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>

                 <div className={styles.loadMoreContainer}>
                     <button className={styles.loadMore}>더 보기</button>
                 </div>
             </div>
         </div>
        </>
          );
};

export default FundingList;
