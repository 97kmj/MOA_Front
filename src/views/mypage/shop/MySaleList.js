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
    const [currentPage, setCurrentPage] = useState(0); // Pagination state
    const [saleData, setSaleData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5; // Items per page
    const token = useAtomValue(tokenAtom);


    useEffect(() => {
        getSaleInfo(activeTab,currentPage);

    },[currentPage])

    const getSaleInfo = (tab, currentPage) => {
        console.log(tab)
        console.log(currentPage)
        axios.post(`${url}/mypage/MaSaleList`, {
            userName: user.username, 
            saleStatus: tab, 
            page: currentPage,
            size: itemsPerPage
            
        },{
            headers: {
                Authorization: token,
            }
        })
        .then(res=> {
            console.log(res);
            setSaleData(res.data.content);
            setTotalPages(res.data.totalPages);
               
        })
        .catch(err=> {
            console.log(err)
        });
    }


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(0); // Reset to page 1 when changing tab
        getSaleInfo(tab, 0)

    };


    const filteredSaleList = saleData.filter((saleItem) => {
        if (activeTab === 'SOLD_OUT') {
            return saleItem.saleResult === 1; // 판매완료 (saleResult: 1)
        }
        if (activeTab === 'AVAILABLE') {
            return saleItem.saleResult === 0; // 판매중 (saleResult: 0)
        }
        if (activeTab === 'all') {
            return saleItem.saleResult === 2; // 전체보기 (saleResult: 0)
        }
        return true; // 
    });


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
                    <h2>내가 올린 판매글 조회</h2>

                    {/* Tabs: 전체 보기, 판매완료, 판매중 */}
                    <div className={styles.myPageSaleListTabs}>
                        <button
                            className={activeTab === null ? styles.active : ''}
                            onClick={() => handleTabClick(null)}
                        >
                            전체 보기
                        </button>
                        <button
                            className={activeTab === 'SOLD_OUT' ? styles.active : ''}
                            onClick={() => handleTabClick('SOLD_OUT')}
                        >
                            판매완료
                        </button>
                        <button
                            className={activeTab === 'AVAILABLE' ? styles.active : ''}
                            onClick={() => handleTabClick('AVAILABLE')}
                        >
                            판매중
                        </button>

                    </div>
                
                    {/* Sale List */}
                    <div className={styles.myPageSaleListList}>
                        {saleData.length > 0 ? (
                            saleData.map((saleItem) => (
                                <div key={saleItem.artworkId} className={styles.myPageSaleListItem}>
                                    <img src={saleItem.imageUrl} alt="saleList" className={styles.myPageSaleListItemItemImg} />
                                    <div className={styles.myPageSaleListItemItemDetails}>
                                        <h4>{saleItem.title}</h4>
                                        <p>금액: {saleItem.price}</p>
                                        <p>판매여부: {saleItem.saleStatus==="AVAILABLE" ? "판매중" : "판매완료" }</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>선택된 조건에 맞는 판매글이 없습니다.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className={styles.myPageSaleListPagination}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
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
