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
import { useNavigate } from 'react-router';




function MyContributedFunding() {
    const itemsPerPage = 5; // Items per page
    const [startDate, setStartDate] = useState((new Date()).getDate()-7); // 시작일자
    const [endDate, setEndDate] = useState(new Date()); // 종료일자
    const [currentPage, setCurrentPage] = useState(0); // Pagination state
    const token = useAtomValue(tokenAtom);
    const user = useAtomValue(userAtom);
    const [orderlist, setOrderLIst]= useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();



    useEffect(() => {
        if(user!==null && user.username!=='' && token!==null && token!=='')  {
            const today = new Date();
            console.log(today)
            setEndDate(today.toISOString().slice(0,10))

            let beforeDay = new Date();
            beforeDay.setDate(today.getDate() - 7);
            setStartDate(beforeDay.toISOString().slice(0,10));
            getsaleInfo(0, beforeDay.toISOString().slice(0,10), today.toISOString().slice(0,10));
        }
        
    },[user,token]);

    const getsaleInfo = (page, start, end) =>{
        console.log(user.username)
        console.log(start)
        console.log(end);
        axios.post(`${url}/mypage/MyOrderList`,{
            userName:user.username,
            // startDate:start+"T00:00:00.000Z",
            // endDate: end+"T23:59:59.000Z",
            startDate: start + "T00:00:00.000+09:00",  
            endDate: end + "T23:59:59.000+09:00",      
            page:page,
            size: itemsPerPage
        }, {
            headers: {
                Authorization: token,
            }   
        })
        .then(res=>{
            // setOrderLIst(res.data);
            console.log(res.data.content);
            setOrderLIst(res.data.content);
            setTotalPages(res.data.totalPages);
        })
        .catch(err=>{
            console.log(err)
        });
    }

    // Handle start date change
    const handleStartDateChange = (date) => {
        setStartDate(date.target.value);
        getsaleInfo(currentPage, date.target.value, endDate);
    }

    // Handle end date change
    const handleEndDateChange = (date) => {
        setEndDate(date.target.value);
        getsaleInfo(currentPage, startDate, date.target.value);
    }
    

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
            getsaleInfo(pageNumber, startDate, endDate);
        }
    };

    const handleOrderListClieck = (artworkId) =>{
        navigate(`/shop/saleDetail/${artworkId}`);
    }

    return (
        <>
            <Header/>
            <div className={styles.myPageSaleList}>
                <SideNav/>
                
                <div className={styles.myPageSaleListRight}>
                    <h3>구매 목록 조회</h3>

                    {/* Date Filter: Start and End Date */}
                    <div className={styles.myPageSaleListTabs}>
                        <div className={styles.orderDateFilterStart}>
                            <label htmlFor="startDate"></label>
                            <input type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </div>
                        <div className={styles.orderDateFilterEnd}>
                            <label htmlFor="endDate"></label>
                            <input type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </div>

                    {/* Sale List */}
                    <div className={styles.myPageSaleListList}  >
                        {orderlist.length > 0 ? (
                            orderlist.map((saleItem) => (
                                <div key={saleItem.id} className={styles.myPageSaleListItem} onClick={()=>handleOrderListClieck(saleItem.artworkId)}>
                                    <img src={saleItem.imageUrl} alt="orderlist" className={styles.myPageSaleListItemItemImg} />
                                    <div className={styles.myPageSaleListItemItemDetails}>
                                        <h4>{saleItem.title}</h4>
                                        <p>주문 금액: {saleItem.price.toLocaleString()}</p>
                                        <p>판매일: {new Date(saleItem.paymentDate).toLocaleDateString('ko-KR')}</p>
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
