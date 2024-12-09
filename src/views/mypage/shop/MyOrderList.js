import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // 스타일 파일 임포트
import styles from '../../../css/mypage/MyPageSaleList.module.css';
import SideNav from '../../../views/mypage/SideNav';
import Header from '../../Header';
import {url} from '../../../config.js'
import axios from 'axios';
import { userAtom } from '../../../atoms';
import { useAtomValue } from 'jotai';
import { tokenAtom } from "../../../atoms";




function MyContributedFunding() {
    const user = useAtomValue(userAtom);
    const itemsPerPage = 5; // Items per page
    const [startDate, setStartDate] = useState(null); // 시작일자
    const [endDate, setEndDate] = useState(null); // 종료일자
    const [currentPage, setCurrentPage] = useState(0); // Pagination state
    const token = useAtomValue(tokenAtom);
    const [orderlist, setOrderLIst]= useState([]);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const today = new Date();
        const lastweek = new Date();
        lastweek.setDate(today.getDate()-7);

        setStartDate(lastweek);
        setEndDate(today);

        getsaleInfo(currentPage);
    },[currentPage]);

    const getsaleInfo = (currentPage) =>{
        axios.post(`${url}/mypage/MyOrderList`,{
            userName:user.username,
            startDate:startDate,
            endDate: endDate,
            page:currentPage,
            size: itemsPerPage
        }, {
            headers: {
                Authorization: token,
            }   
        })
        .then(res=>{
            setOrderLIst(res.data.content);
            setTotalPages(res.data.totalPages);
        })
        .catch(err=>{
            console.log(err)
        });
    }

    // Handle start date change
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    // Handle end date change
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Filter sale list by the selected date range
    const filteredByDate = orderlist.filter((saleItem) => {
        const saleEndDate = new Date(saleItem.endDate); // Convert saleItem's endDate to Date object
        return (
            (!startDate || saleEndDate >= startDate) && (!endDate || saleEndDate <= endDate)
        );
    });


    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
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
                        {orderlist.length > 0 ? (
                            orderlist.map((saleItem) => (
                                <div key={saleItem.id} className={styles.myPageSaleListItem}>
                                    <img src="https://via.placeholder.com/60" alt="orderlist" className={styles.myPageSaleListItemItemImg} />
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
                        {Array.from({length: totalPages}, (_, index) => (
                            <button
                                key={index }
                                className={currentPage === index  ? styles.active : ''}
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages -1}
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
