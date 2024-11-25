import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // 스타일 파일 임포트
import styles from '../../../css/mypage/MyPageSaleList.module.css';
import SideNav from '../../../views/mypage/SideNav';
import Header from '../../Header';

function MyContributedFunding() {
    const itemsPerPage = 5; // Items per page
    const [startDate, setStartDate] = useState(null); // 시작일자
    const [endDate, setEndDate] = useState(null); // 종료일자
    const [currentPage, setCurrentPage] = useState(1); // Pagination state

    // Sample data for sale items
    const saleList = [
        { id: 1, title: "훈민정음가나다라마바사", amount: "250,000 원", saleResult: 1, endDate: "2024-08-07" },
        { id: 2, title: "영어ABCDEFG", amount: "350,000 원", saleResult: 1, endDate: "2024-08-07" },
        { id: 3, title: "가나다라마바사아자차카타파하ABCDEFGHIJKLMN", amount: "350,000 원", saleResult: 1, endDate: "2023-08-07" },
        { id: 4, title: "가나다라마바사아자차카타파하ABCDEFGHIJKLMN", amount: "350,000 원", saleResult: 1, endDate: "2023-08-07" },
    ];

    // Handle start date change
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    // Handle end date change
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Filter sale list by the selected date range
    const filteredByDate = saleList.filter((saleItem) => {
        const saleEndDate = new Date(saleItem.endDate); // Convert saleItem's endDate to Date object
        return (
            (!startDate || saleEndDate >= startDate) && (!endDate || saleEndDate <= endDate)
        );
    });

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
                    <h2>구매 목록 조회</h2>

                    {/* Date Filter: Start and End Date */}
                    <div className={styles.myPageSaleListTabs}>
                        <div className={styles.orderDateFilterStart}>
                            <label htmlFor="startDate"></label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                className={styles.dateInput}
                                placeholderText="시작 날짜 선택"
                            />
                        </div>
                        <div className={styles.orderDateFilterEnd}>
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
                            <p>선택된 날짜 범위에 해당하는 판매글이 없습니다.</p>
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
                                className={currentPage === index + 1 ? styles.active : ''}
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
