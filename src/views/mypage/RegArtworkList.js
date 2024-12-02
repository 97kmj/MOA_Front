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
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // 날짜 검색 핸들러
    const handleSearch = () => {
        if (startDate && endDate) {
            console.log(`기간 검색: ${startDate.toISOString()} - ${endDate.toISOString()}`);
            fetchArtworks(currentPage, startDate.toISOString(), endDate.toISOString());
        }
    };

    const token = useAtomValue(tokenAtom); // Jotai로 토큰 가져오기
    console.log("JWT Token:", token); // 콘솔로 토큰 출력

    // 작품 목록 가져오기 함수
    const fetchArtworks = async (page, start = null, end = null) => {
        try {
            // 쿼리 파라미터 구성
            const params = new URLSearchParams();
            params.append("page", page);
            if (start) params.append("startDate", start);
            if (end) params.append("endDate", end);
    
            // Fetch 요청
            const response = await fetch(`http://localhost:8080/api/artworks/list?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // JWT 토큰 추가
                },
            });
    
            // 응답 상태 확인
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // JSON 응답 처리
            const data = await response.json();
            setArtworkList(data.artworks || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching artworks:", error);
            setArtworkList([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchArtworks(page, startDate?.toISOString(), endDate?.toISOString());
    };

    // 컴포넌트가 마운트되었을 때 초기 데이터 가져오기
    useEffect(() => {
        fetchArtworks(1); // 첫 페이지 데이터 로드
    }, []);


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
                        {Array.isArray(artworkList) && artworkList.length > 0 ? (
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
