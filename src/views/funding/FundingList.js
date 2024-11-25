import React, { useState } from 'react';
import styles from '../../css/funding/FundingList.module.css';
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const FundingList = () => {
    const [filterType, setFilterType] = useState('진행중 펀딩'); // 필터 타입
    const [sortOption, setSortOption] = useState('최신순'); // 정렬 옵션

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const handleFilterDropdown = () => {
        setIsFilterDropdownOpen(!isFilterDropdownOpen);
        setIsSortDropdownOpen(false); // 다른 드롭다운 닫기
    };

    const handleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
        setIsFilterDropdownOpen(false); // 다른 드롭다운 닫기
    };
    // 임의의 펀딩 데이터 생성
    const fundings = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        imageUrl: `${process.env.PUBLIC_URL}/img/funding/image6.png`,
        title: '서울대학교 전시기획안내',
        description: '일시 개별링크 <선택의자유: 나만의 공간>',
        progress: 47,
        amount: '236,000',
        daysLeft: 17,
    }));

    const navigate = useNavigate();

    const goDetailNavigation = (id) => {
        navigate(`/fundings/${id}`);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        setSortOption('최신순'); // 필터 변경 시 기본 정렬로 리셋
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const getSortOptions = () => {
        if (filterType === '진행중 펀딩') {
            return ['최신순', '마감 임박순', '오래된순'];
        }
        if (filterType === '완료된 펀딩') {
            return ['최신순', '오래된순'];
        }
        if (filterType === '공개예정 펀딩') {
            return ['최신순', '오래된순'];
        }
        return [];
    };

    return (
        <>
            <Header />
            <div className={styles.fundingList}>
                <div>
                    <h3>펀딩</h3>
                    <div className={styles.titleLine}></div>
                    {/* 금색 줄 */}

                    <div className={styles.filterContainer}>
                        {/* 필터: 진행중, 완료된, 공개예정 */}
                        <div className={styles.customButton} onClick={handleFilterDropdown}>
                            <span>{filterType}</span>
                            <span className={styles.arrow}>▼</span>
                            {isFilterDropdownOpen && (
                                <ul className={styles.dropdown}>
                                    <li onClick={() => setFilterType('진행중 펀딩')}>진행중 펀딩</li>
                                    <li onClick={() => setFilterType('완료된 펀딩')}>완료된 펀딩</li>
                                    <li onClick={() => setFilterType('공개예정 펀딩')}>공개예정 펀딩</li>
                                </ul>
                            )}
                        </div>

                        {/* 정렬 옵션 */}
                        <div className={styles.customButton} onClick={handleSortDropdown}>
                            <span>{sortOption}</span>
                            <span className={styles.arrow}>▼</span>
                            {isSortDropdownOpen && (
                                <ul className={styles.dropdown}>
                                    {getSortOptions().map((option) => (
                                        <li key={option} onClick={() => setSortOption(option)}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={styles.grid}>
                        {fundings.map((funding) => (
                            <div
                                key={funding.id}
                                className={styles.fundingListCard}
                                onClick={() => goDetailNavigation(funding.id)}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={funding.imageUrl}
                                        alt={funding.title}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    {/* 제목 */}
                                    <h3 className={styles.title}>{funding.title}</h3>

                                    {/* 설명 */}
                                    <p className={styles.description}>{funding.description}</p>

                                    {/* 펀딩 통계 */}
                                    <div className={styles.fundingStats}>
                                        {/* 프로그래스 바 */}
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.fundingListProgressBar}
                                                style={{width: `${funding.progress}%`}}
                                            ></div>
                                        </div>

                                       < div className={styles.fundingStats}>
                                        {/* 달성률 */}
                                        <span className={styles.fundingListGoalText}>{funding.progress}% 달성</span>
                                        {/* 목표 금액 */}
                                        <span className={styles.fundingListGoalAmount}>{funding.amount}₩</span>
                                        {/* 남은 날짜 */}
                                        <span className={styles.fundingListLeftDays}>{funding.daysLeft}일 남음</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.loadMoreContainer}>
                        <button className={styles.loadMore}><img src="/img/seemore.png" alt={"더보기"}/></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FundingList;
