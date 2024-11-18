import React from 'react';
import styles from '../../css/funding/FundingList.module.css';
import Header from "../Header";
import {useNavigate} from "react-router-dom";


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


    const navigate = useNavigate();

    const goDetailNavigation = (id) => {
        navigate(`/fundings/${id}`);
    };


    return (
      <>
      <Header/>
        <div className={styles.fundingList}>
         <div>
            <p className={styles.fundingTitle}>펀딩</p>
            <div className={styles.titleLine}></div> {/* 금색 줄  */}

             <div className={styles.filter}>
                 <div className={styles.customSelect}>
                     <select>
                         <option>최신순</option>
                         <option>진행중 펀딩</option>
                         <option>완료된 펀딩</option>
                         <option>공개예정 펀딩</option>
                     </select>
                 </div>


             </div>
             <div className={styles.fundingCards}>
                 {fundings.map((funding, index) => (
                     <div key={index} className={styles.fundingCard}
                          onClick={() => goDetailNavigation(123)} //
                         >

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
                     <button className={styles.loadMore}>+</button>
                 </div>
             </div>
         </div>
        </>
          );
};

export default FundingList;
