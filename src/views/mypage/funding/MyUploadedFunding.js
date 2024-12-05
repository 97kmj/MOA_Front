import React, {useEffect, useState} from 'react';
import styles from '../../../css/mypage/funding/MyUploadedFunding.module.css';
import Header from "../../Header";
import SideNav from "../SideNav";
import {useNavigate} from "react-router-dom";
import {url} from "../../../config";

import axios from "axios";
import {useAtom} from "jotai/react";
import {tokenAtom, userAtom} from "../../../atoms";
import {useAtomValue} from "jotai/index";
function MyUploadedFunding() {
    const [activeTab, setActiveTab] = useState('ONGOING'); // Default to "성공 펀딩"
    const [fundingList, setFundingList] = useState([]);
    const navigate = useNavigate();
    const [user] = useAtom(userAtom);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const token = useAtomValue(tokenAtom);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


     const goToDetail = (fundingId) => {
            navigate(`/mypage/fundings/uploaded/${fundingId}`);
     }


    useEffect(() => {
        axios.get(`${url}/api/myPage/funding/registeredFunding`, {
            params: {
                username: user.username,
                status: activeTab,
                page: 0,
                size: 10
            }, headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                setFundingList(response.data.content);
            })
            .catch((error) => {
                console.error('Error fetching funding data', error);
            });
    }, [activeTab]);


    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
    };



    return (
        <>
            <Header />
            <div className={styles.container}>
                <SideNav />

                <div className={styles.mainContent}>
                    <div className={styles.myUploadedFunding}>
                        <h3>내가 올린 펀딩 조회</h3>

                        {/* Tabs */}
                        <div className={styles.myUploadedFundingTabs}>
                            <button
                                className={activeTab === 'SUCCESSFUL' ? 'active' : ''}
                                onClick={() => handleTabClick('SUCCESSFUL')}
                            >
                                성공 펀딩
                            </button>
                            <button
                                className={activeTab === 'FAILED' ? 'active' : ''}
                                onClick={() => handleTabClick('FAILED')}
                            >
                                실패 펀딩
                            </button>
                            <button
                                className={activeTab === 'ONGOING' ? 'active' : ''}
                                onClick={() => handleTabClick('ONGOING')}
                            >
                                진행 펀딩
                            </button>
                        </div>

                        {/* Funding List */}
                        <div className={styles.myUploadedFundingList}>
                            {fundingList.map((funding) => (
                                <div key={funding.fundingId} className={styles.myUploadedFundingItem} onClick={() => goToDetail(funding.fundingId)}>
                                    <img
                                        src={funding.fundingImage}
                                        alt="funding"
                                        className={styles.myUploadedFundingItemImg}
                                    />
                                    <div className={styles.myUploadedFundingItemDetails}>
                                        <h4>{funding.fundingTitle}</h4>
                                        <p>모집 희망금액: {funding.goalAmount} 원</p>
                                        <p>상태: {funding.fundingStatus}</p>
                                        <p>마감일: {new Date(funding.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className={styles.myUploadedFundingPagination}>
                            {/* 이전 페이지 버튼 (첫 페이지일 때 숨김) */}
                            {currentPage > 0 && (
                                <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                            )}

                            {/* 페이지 번호 버튼들 */}
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={currentPage === index ? 'active' : ''}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            {/* 다음 페이지 버튼 (끝 페이지일 때 숨김) */}
                            {currentPage < totalPages - 1 && (
                                <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyUploadedFunding;