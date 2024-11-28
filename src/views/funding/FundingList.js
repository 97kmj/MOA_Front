import React, { useEffect, useState } from "react";
import styles from "../../css/funding/FundingList.module.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { url } from "../../config";

const FundingList = () => {
    const navigate = useNavigate();
    const [fundingList, setFundingList] = useState([]);
    const [filterType, setFilterType] = useState("진행중 펀딩"); // 필터 타입
    const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    // 필터 드롭다운 열기/닫기
    const handleFilterDropdown = () => {
        setIsFilterDropdownOpen(!isFilterDropdownOpen);
        setIsSortDropdownOpen(false);
    };

    // 정렬 드롭다운 열기/닫기
    const handleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
        setIsFilterDropdownOpen(false);
    };
    const handleSortChange = (option) => {
        console.log(`Sort option changed to: ${option}`);
        setSortOption(option);
        setPage(0);
        setFundingList([]);
    };


    // 펀딩 리스트 가져오기
    const fetchFundingList = async () => {
        try {
            console.log(`Fetching with filterType: ${filterType}, sortOption: ${sortOption}, page: ${page}`);

            const response = await fetch(
                `${url}/api/funding?filterType=${filterType}&sortOption=${sortOption}&page=${page}`
            );
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched funding list:", data); // 서버 응답 확인

                // 중복 방지: 기존 데이터에 새 데이터 병합
                setFundingList((prev) => {
                    const fundingIds = new Set(prev.map((funding) => funding.fundingId));
                    const uniqueFundings = data.fundingList.filter(
                        (funding) => !fundingIds.has(funding.fundingId)
                    );
                    return [...prev, ...uniqueFundings];
                });
                setIsLastPage(data.isLastPage);

                // 마지막 페이지 여부 업데이트
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error during fetchFundingList:", error);
        }
    };

    // 필터/정렬/페이지 변경 시 데이터 요청
    useEffect(() => {
        fetchFundingList();
    }, [filterType, sortOption, page]);

    // 더보기 클릭
    const loadMore = () => {
        if (!isLastPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    // 상세 페이지로 이동
    const goDetailNavigation = (id) => {
        navigate(`/fundings/${id}`);
        console.log("상세 페이지로 이동:", id);
    };

    // 정렬 옵션
    const getSortOptions = () => {
        if (filterType === "진행중 펀딩") {
            return [
                "최신순",
                "오래된순",
                "마감 임박순",
                "달성률 높은순",
                "달성률 낮은순",
                "목표금액 높은순",
                "목표금액 낮은순",
            ];
        }

        if (filterType === "공개 예정 펀딩") {
            return ["가까운순", "멀리있는순"];
        }

        if (filterType === "마감된 펀딩") {
            return ["최신순", "오래된순"];
        }

        return [];
    };

    const calculateProgressStep = (achievementRate) => {
        if (achievementRate >= 100) return "100%";
        if (achievementRate >= 75) return "75%";
        if (achievementRate >= 50) return "50%";
        if (achievementRate >= 35) return "45%";
        if (achievementRate >= 25) return "30%";
        if (achievementRate >= 10) return "20%";
        return "0%";
    };


    return (
        <>
            <Header />
            <div className={styles.fundingList}>
                <div>
                    <h3>펀딩</h3>
                    <div className={styles.titleLine}></div>

                    {/* 필터 및 정렬 옵션 */}
                    <div className={styles.filterContainer}>
                        {/* 필터 드롭다운 */}
                        <div className={styles.customButton} onClick={handleFilterDropdown}>
                            <span>{filterType}</span>
                            <span className={styles.arrow}>▼</span>
                            {isFilterDropdownOpen && (
                                <ul className={styles.dropdown}>
                                    <li onClick={() => setFilterType("진행중 펀딩")}>진행중 펀딩</li>
                                    <li onClick={() => setFilterType("공개 예정 펀딩")}>공개 예정 펀딩</li>
                                    <li onClick={() => setFilterType("마감된 펀딩")}>마감된 펀딩</li>
                                </ul>
                            )}
                        </div>

                        {/* 정렬 드롭다운 */}
                        <div className={styles.customButton} onClick={handleSortDropdown}>
                            <span>{sortOption}</span>
                            <span className={styles.arrow}>▼</span>
                            {isSortDropdownOpen && (
                                <ul className={styles.dropdown}>
                                    {getSortOptions().map((option) => (
                                        <li key={option} onClick={() => handleSortChange(option)}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* 펀딩 리스트 */}
                    <div className={styles.grid}>
                        {fundingList.map((funding) => (
                            <div
                                key={funding.fundingId}
                                className={styles.fundingListCard}
                                onClick={() => goDetailNavigation(funding.fundingId)}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={funding.fundingMainImageUrl}
                                        alt={funding.title}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.info}>
                                    {/* 제목 */}
                                    <h3 className={styles.title}>{funding.title}</h3>

                                    {/* 펀딩 통계 */}
                                    <div className={styles.fundingStats}>
                                        <div className={styles.progressBar}>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.fundingListProgressBar}
                                                    style={{
                                                        width: `${Math.min(funding.achievementRate || 0, 100)}%`, // 달성률로 게이지바 설정
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* 달성률, 목표 금액, 남은 날짜 */}
                                        <span className={styles.fundingListGoalText}>
                                          {funding.achievementRate || 0}% 달성
                                        </span>

                                        <span className={styles.fundingListGoalAmount}>
                                          {funding.goalAmount.toLocaleString()}₩
                                        </span>

                                        <span className={styles.fundingListLeftDays}>
                                          {funding.remainingDays || 0}일 남음
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 더보기 버튼 */}
                    <div className={styles.loadMoreContainer}>
                        {!isLastPage && fundingList.length > 0 && fundingList.length % 8 === 0 && (
                            <button className={styles.loadMore} onClick={loadMore}>
                                <img src="/img/seemore.png" alt={"더보기"}/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FundingList;
