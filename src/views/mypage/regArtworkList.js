import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // React Datepicker 라이브러리
import 'react-datepicker/dist/react-datepicker.css'; // Datepicker 기본 스타일
import Header from "../Header";
import SideNav from "./SideNav"; // SideNav 컴포넌트 추가
import styles from '../../css/mypage/RegArtworkList.module.css';

function RegArtworkList() {
    const [startDate, setStartDate] = useState(null); // 시작 날짜
    const [endDate, setEndDate] = useState(null); // 종료 날짜
    const [activeTab, setActiveTab] = useState('recent'); // Default to "최근 1개월"

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSearch = () => {
        if (startDate && endDate) {
            console.log(`기간 검색: ${startDate.toISOString()} - ${endDate.toISOString()}`);
        }
    };

    const artworkList = [
        { id: 1, title: "작품 1", goalAmount: "100,000 원", finalPrice: "90,000 원", endDate: "2024-11-11" },
        { id: 2, title: "작품 2", goalAmount: "200,000 원", finalPrice: "180,000 원", endDate: "2024-11-12" },
        // ... 추가 항목
    ];

    return (
        <>
            <Header />
            <div className={styles.regArtworkListContainer}>
                {/* Side Navigation */}
                <SideNav />

                {/* Main Content */}
                <div className={styles.regArtworkMainContent}>
                    <h2>등록작품목록</h2>

                    {/* Tabs with DatePicker */}
                    <div className={styles.regArtworkTabsContainer}>
                        <div className={styles.regArtworkTabs}>
                            <button
                                className={activeTab === 'recent' ? 'active' : ''}
                                onClick={() => handleTabClick('recent')}
                            >
                                최근 1개월
                            </button>
                            <button
                                className={activeTab === 'threeMonths' ? 'active' : ''}
                                onClick={() => handleTabClick('threeMonths')}
                            >
                                3개월
                            </button>
                            <button
                                className={activeTab === 'sixMonths' ? 'active' : ''}
                                onClick={() => handleTabClick('sixMonths')}
                            >
                                6개월
                            </button>
                        </div>
                        <div className={styles.dateRangePicker}>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="시작 날짜"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="종료 날짜"
                            />
                            <button onClick={handleSearch} className={styles.searchButton}>
                                검색
                            </button>
                        </div>
                    </div>

                    {/* Artwork List */}
                    <div className={styles.regArtworkListItems}>
                        {artworkList.map((artwork) => (
                            <div key={artwork.id} className={styles.regArtworkItem}>
                                <img src="https://via.placeholder.com/60" alt="artwork" className={styles.regArtworkItemImg} />
                                <div className={styles.regArtworkItemDetails}>
                                    <h4>{artwork.title}</h4>
                                    <p>목표금액: {artwork.goalAmount}</p>
                                    <p style={{ color: 'red' }}>최종가: {artwork.finalPrice}</p>
                                    <p>마감일: {artwork.endDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className={styles.regArtworkPagination}>
                        <button>&lt;</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&gt;</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegArtworkList;
