import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // React Datepicker 라이브러리
import 'react-datepicker/dist/react-datepicker.css'; // Datepicker 기본 스타일
import Header from "../Header";
import SideNav from "./SideNav"; // SideNav 컴포넌트 추가
import styles from '../../css/mypage/RegArtworkList.module.css';
import { useAtomValue } from "jotai";
import { tokenAtom } from "../../atoms";

function RegArtworkList() {
    const [startDate, setStartDate] = useState(null); // 시작 날짜
    const [endDate, setEndDate] = useState(null); // 종료 날짜
    const [activeTab, setActiveTab] = useState('recent'); // Default to "최근 1개월"
    const [artworkList, setArtworkList] = useState([]); // 서버에서 가져온 작품 목록
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const token = useAtomValue(tokenAtom);

   

    // 작품 목록 가져오기 함수
    const fetchArtworks = async (page, start = null, end = null) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({ page });
            if (start) params.append("startDate", start);
            if (end) params.append("endDate", end);

            console.log(`Request URL: http://localhost:8080/api/artworks/list?${params}`);
            console.log("JWT Token:", token);


            const response = await fetch(`http://localhost:8080/api/artworks/list?${params}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include", // 이 부분 추가
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            setArtworkList(data.artworks || data || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching artworks:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Updated artwork list:", artworkList);
    }, [artworkList]);

    
    useEffect(() => {
        if (!token) return;
        fetchArtworks(1);
    }, [token]);

    const handleSearch = () => {
        if (!startDate || !endDate) {
            alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
            return;
        }
        fetchArtworks(currentPage, startDate?.toISOString(), endDate?.toISOString());
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchArtworks(page, startDate?.toISOString(), endDate?.toISOString());
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    
    
    


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
                    {isLoading ? (
                        <p>데이터를 불러오는 중입니다...</p>
                    ) : error ? (
                        <p>에러 발생: {error}</p>
                    ) : (
                        <div className={styles.regArtworkListItems}>
                            {artworkList.length > 0 ? (
                                artworkList.map((artwork) => (
                                    <div key={artwork.artworkId} className={styles.regArtworkItem}>
                                        <img
                                            src={artwork.imageUrl || 'https://via.placeholder.com/60'}
                                            alt="artwork"
                                            className={styles.regArtworkItemImg}
                                        />
                                        <div className={styles.regArtworkItemDetails}>
                                            <h4>{artwork.title}</h4>
                                            <p>작품설명: {artwork.description}</p>
                                            <p>등록일: {new Date(artwork.createAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>작품이 없습니다.</p>
                            )}
                        </div>
                    )}
                    {/* Pagination */}
                    <div className={styles.regArtworkPagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegArtworkList;
