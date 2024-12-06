import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // 날짜 picker 스타일 파일
import styles from '../../../css/mypage/MyPageSaleList.module.css';
import SideNav from '../../../views/mypage/SideNav';
import {url} from '../../../config.js'
import Header from '../../Header';
import axios from 'axios';
import { userAtom } from '../../../atoms';
import { useAtomValue } from 'jotai';
import { tokenAtom } from "../../../atoms";

function MyContributedFunding() {
    const user = useAtomValue(userAtom);
    const [activeTab, setActiveTab] = useState('all'); // Default to "전체 보기"
    const [startDate, setStartDate] = useState(null); // 시작 날짜
    const [endDate, setEndDate] = useState(null); // 종료 날짜
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [saleData, setSaleData] = useState([]);
    const itemsPerPage = 5; // Items per page
    const token = useAtomValue(tokenAtom);


    useEffect(() => {

        const getSaleInfo = async () => {
            try{
                const response = await axios.post(`${url}/mapage/MaSaleList`, {
                    userName: user.username, 
                    saleStatus: activeTab === 'AVAILABLE' ? 'AVAILABLE' : 'NOT_SALE' , 
                    startDate: startDate ? formatDate(startDate) : null,
                    endDate: endDate ? formatDate(endDate) : null,
                    page: currentPage,
                    size: itemsPerPage
                },{
                    headers: {
                        Authorization: token,
                    }
                });
                setSaleData(response.data);
            }catch{
                console.error('작품정보를 못 가져왔음');
            }
        };
        getSaleInfo();

    },[])


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to page 1 when changing tab
        if (tab !== 'success') {
            setStartDate(null); // Clear the startDate if not in "판매완료" (Success) tab
            setEndDate(null); // Clear the endDate if not in "판매완료" (Success) tab
        }
    };
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

     const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    const filteredSaleList = saleData.filter((saleItem) => {
        if (activeTab === 'NOTSALE') {
            return saleItem.saleResult === 1; // 판매완료 (saleResult: 1)
        }
        if (activeTab === 'AVAILABLE') {
            return saleItem.saleResult === 0; // 판매중 (saleResult: 0)
        }
        return true; // 
    });

      const filteredByDate = startDate && endDate
        ? filteredSaleList.filter((saleItem) => {
            if (!saleItem.endDate) return false;
            const saleEndDate = new Date(saleItem.endDate);
            return saleEndDate >= startDate && saleEndDate <= endDate;
        })
        : filteredSaleList;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredByDate.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header/>
            <div className={styles.myPageSaleList}>

                <div>
                    <SideNav/>
                </div>
                <div className={styles.myPageSaleListRight}>
                    <h2>내가 올린 판매글 조회</h2>

                    {/* Tabs: 전체 보기, 판매완료, 판매중 */}
                    <div className={styles.myPageSaleListTabs}>
                        <button
                            className={activeTab === 'all' ? 'active' : ''}
                            onClick={() => handleTabClick('all')}
                        >
                            전체 보기
                        </button>
                        <button
                            className={activeTab === 'NOTSALE' ? 'active' : ''}
                            onClick={() => handleTabClick('NOTSALE')}
                        >
                            판매완료
                        </button>
                        <button
                            className={activeTab === 'AVAILABLE' ? 'active' : ''}
                            onClick={() => handleTabClick('AVAILABLE')}
                        >
                            판매중
                        </button>

                        {/* Date Filter for "판매완료" tab */}
                        {activeTab === 'success' && (
                            <div className={styles.dateFilters}>
                                <div className={styles.dateFilterStart}>
                                    <label htmlFor="startDate"></label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        className={styles.dateInput}
                                        placeholderText="시작 날짜 선택"
                                    />
                                </div>
                                <div className={styles.dateFilterEnd}>
                                    <label htmlFor="endDate"></label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        className={styles.dateInput}
                                        placeholderText="종료 날짜 선택"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                
                    {/* Sale List */}
                    <div className={styles.myPageSaleListList}>
                        {currentItems.length > 0 ? (
                            saleData.map((saleItem) => (
                                <div key={saleItem.id} className={styles.myPageSaleListItem}>
                                    <img src="https://via.placeholder.com/60" alt="saleList" className={styles.myPageSaleListItemItemImg} />
                                    <div className={styles.myPageSaleListItemItemDetails}>
                                        <h4>{saleItem.title}</h4>
                                        <p>모집 희망금액: {saleItem.amount}</p>
                                        <p>판매일: {saleItem.endDate}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>선택된 조건에 맞는 판매글이 없습니다.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className={styles.myPageSaleListPagination}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            &lt;
                        </button>
                        {[...Array(Math.ceil(filteredByDate.length / itemsPerPage))].map((_, index) => (
                            <button
                                key={index + 1}
                                className={currentPage === index + 1 ? 'active' : ''}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredByDate.length / itemsPerPage)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyContributedFunding;
