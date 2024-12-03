import React, { useEffect, useState } from 'react';
import styles from '../../../css/mypage/funding/MyContributedFunding.module.css';
import Header from "../../Header";
import SideNav from "../SideNav";
import axios from "axios";
import { useAtom } from "jotai/react";
import { userAtom } from "../../../atoms";
import { url } from "../../../config";

function MyContributedFunding() {
    const [activeTab, setActiveTab] = useState('ONGOING'); // Default to "성공 펀딩"
    const [fundingList, setFundingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user] = useAtom(userAtom);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태

    // 탭 클릭 핸들러
    const changeTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(0);
    };

    // 페이지 변경 핸들러
    const changePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };



    // API 호출
    useEffect(() => {

        if (!user || !user.username) {
            setError('사용자 정보가 없습니다. 로그인 후 다시 시도해주세요.');
            return;
        }


        const fetchFundingData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${url}/api/myPage/funding/contributedFunding`, {
                    params: {
                        username: user.username,
                        status: activeTab.toUpperCase(),
                        page: currentPage, // 현재 페이지 번호
                        size: 5 // 페이지 크기
                    }
                });
                setFundingList(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log(response.data);

            } catch (err) {
                setError('데이터를 가져오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchFundingData();
    }, [user, activeTab, currentPage]);

    const translateStatus = (status) => {
        switch (status) {
            case "ONGOING":
                return "진행중";
            case "SUCCESSFUL":
                return "성공";
            case "FAILED":
                return "실패";
            case "CANCELLED":
                return "취소됨";
            default:
                return "알 수 없음";
        }
    };



    return (
        <>
            <Header />
            <div className={styles.container}>
                <SideNav />
                <div className={styles.myContributedFunding}>
                    <h3>내가 후원한 펀딩 조회</h3>

                    {/* Tabs */}
                    <div className={styles.myContributedFundingTabs}>
                        <button
                            className={activeTab === 'SUCCESSFUL' ? 'active' : ''}
                            onClick={() => changeTabClick('SUCCESSFUL')}
                        >
                            성공 펀딩
                        </button>
                        <button
                            className={activeTab === 'FAILED' ? 'active' : ''}
                            onClick={() => changeTabClick('FAILED')}
                        >
                            실패 펀딩
                        </button>
                        <button
                            className={activeTab === 'ONGOING' ? 'active' : ''}
                            onClick={() => changeTabClick('ONGOING')}
                        >
                            진행 펀딩
                        </button>
                    </div>

                    {/* Loading Indicator */}
                    {loading && <p>데이터를 불러오는 중...</p>}

                    {/* Error Message */}
                    {error && <p className={styles.error}>{error}</p>}

                    {/* Funding List */}
                    {!loading && !error && (
                        <div className={styles.myContributedFundingList}>
                            {fundingList.map((funding) => (
                                <div key={funding.fundingOrderId} className={styles.myContributedFundingItem}>
                                    <img
                                        src={funding.fundingImage || "https://via.placeholder.com/60"} // 이미지가 없을 경우 기본 이미지 사용
                                        alt="funding"
                                        className={styles.myContributedFundingItemImg}
                                    />
                                    <div className={styles.myContributedFundingItemDetails}>
                                        <h4>{funding.fundingTitle}</h4>
                                        <p>모집 희망금액: {funding.goalAmount.toLocaleString()} 원</p>
                                        <p>상태: {translateStatus(funding.fundingStatus)}</p>
                                        <p>마감일: {new Date(funding.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.myContributedFundingPagination}>
                        {currentPage > 0 && (
                            <button onClick={() => changePageChange(currentPage - 1)}>
                                &lt;
                            </button>
                        )}
                        {Array.from({length: totalPages}, (_, index) => (
                            <button
                                key={index}
                                className={currentPage === index ? 'active' : ''}
                                onClick={() => changePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages - 1 && (
                            <button onClick={() => changePageChange(currentPage + 1)}>
                                &gt;
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyContributedFunding;
