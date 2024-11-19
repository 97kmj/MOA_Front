import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // 날짜 picker 스타일 파일
import styles from '../../../css/mypage/MyPageSaleList.module.css';
import SideNav from '../../../views/mypage/SideNav';

function MyContributedFunding() {
    const [activeTab, setActiveTab] = useState('all'); // Default to "전체 보기"
    const [startDate, setStartDate] = useState(null); // 시작 날짜
    const [endDate, setEndDate] = useState(null); // 종료 날짜
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const itemsPerPage = 5; // Items per page

    // Sample data for sale items
    const saleList = [
        { id: 1, title: "훈민정음가나다라마바사", amount: "250,000 원", saleResult: 1, endDate: "2024-08-07" },
        { id: 2, title: "영어ABCDEFG", amount: "350,000 원", saleResult: 1, endDate: "2024-08-07" },
        { id: 3, title: "영어ABCDEFG-짭", amount: "350,000 원", saleResult: 0, endDate: "" },
        { id: 4, title: "동자 승", amount: "350,000 원", saleResult: 0, endDate: "" },
        { id: 5, title: "가나다라마바사아자차카타파하ABCDEFGHIJKLMN", amount: "350,000 원", saleResult: 1, endDate: "2023-08-07" },
        { id: 6, title: "가나다라마바사아자차카타파하ABCDEFGHIJKLMN", amount: "350,000 원", saleResult: 1, endDate: "2023-08-07" },
    ];

    // Handle tab click (all, success, or failed)
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to page 1 when changing tab
        if (tab !== 'success') {
            setStartDate(null); // Clear the startDate if not in "판매완료" (Success) tab
            setEndDate(null); // Clear the endDate if not in "판매완료" (Success) tab
        }
    };

    // Handle start date change
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    // Handle end date change
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Format date to compare with saleItem.endDate (yyyy-mm-dd format)
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    // Filter sale list based on active tab
    const filteredSaleList = saleList.filter((saleItem) => {
        if (activeTab === 'success') {
            return saleItem.saleResult === 1; // 판매완료 (saleResult: 1)
        }
        if (activeTab === 'failed') {
            return saleItem.saleResult === 0; // 판매중 (saleResult: 0)
        }
        return true; // 전체 보기 (All sales)
    });

    // Apply date filter if startDate and endDate are selected
    const filteredByDate = startDate && endDate
        ? filteredSaleList.filter((saleItem) => {
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
        
        <div className={styles.myPageSaleList}>
            <div>
                <SideNav/>
            </div>
            <div className='myPageSaleListRight'>
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
                        className={activeTab === 'success' ? 'active' : ''}
                        onClick={() => handleTabClick('success')}
                    >
                        판매완료
                    </button>
                    <button
                        className={activeTab === 'failed' ? 'active' : ''}
                        onClick={() => handleTabClick('failed')}
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
                        currentItems.map((saleItem) => (
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
    );
}

export default MyContributedFunding;
