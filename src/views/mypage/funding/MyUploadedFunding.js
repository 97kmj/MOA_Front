import React, { useState } from 'react';
import styles from '../../../css/mypage/funding/MyUploadedFunding.module.css';
import Header from "../../Header";
function MyUploadedFunding() {
    const [activeTab, setActiveTab] = useState('success'); // Default to "성공 펀딩"

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const fundingList = [
        { id: 1, title: "르브론", amount: "50,000 원", completed: "O", endDate: "24/08/07" },
        { id: 2, title: "제임스", amount: "50,000 원", completed: "O", endDate: "24/08/07" },
        // ... 추가 항목
    ];

    return (
        <>
            <Header/>
        <div className={styles.myUploadedFunding}>
            <h2>내가 올린 펀딩 조회</h2>

            {/* Tabs */}
            <div className={styles.myUploadedFundingTabs}>
                <button
                    className={activeTab === 'success' ? 'active' : ''}
                    onClick={() => handleTabClick('success')}
                >
                    성공 펀딩
                </button>
                <button
                    className={activeTab === 'failed' ? 'active' : ''}
                    onClick={() => handleTabClick('failed')}
                >
                    실패 펀딩
                </button>
                <button
                    className={activeTab === 'ongoing' ? 'active' : ''}
                    onClick={() => handleTabClick('ongoing')}
                >
                    진행 펀딩
                </button>
            </div>

            {/* Funding List */}
            <div className={styles.myUploadedFundingList}>
                {fundingList.map((funding) => (
                    <div key={funding.id} className={styles.myUploadedFundingItem}>
                        <img src="https://via.placeholder.com/60" alt="funding" className={styles.myUploadedFundingItemImg} />
                        <div className={styles.myUploadedFundingItemDetails}>
                            <h4>{funding.title}</h4>
                            <p>모집 희망금액: {funding.amount}</p>
                            <p>완료 여부: {funding.completed}</p>
                            <p>마감일: {funding.endDate}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className={styles.myUploadedFundingPagination}>
                <button>&lt;</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>&gt;</button>
            </div>
        </div>
        </>
    );
}

export default MyUploadedFunding;
