import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminItem.module.css";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { useState, useEffect } from "react";
const AdminItem = () => {
    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.itemList}>
                <h4>상품 주문 목록</h4>
                <div className={styles.tableBox}>
                <table>
                    <thead>
                        <tr><th>주문번호</th><th>구매자ID</th><th>판매자ID</th><th>작품명</th><th>프레임</th><th>구매 일시</th><th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                        <td>1</td>
                        <td>hong1234</td><td>artist1234</td><td>별이 빛나는 밤</td><td>없음</td><td>2024-10-10</td>
                        <td>
                            <div className={styles.customSelect}>
                            <select>
                                <option value="작가 배송대기" selected>작가 배송대기</option>
                                <option value="검수중">검수중</option>
                                <option value="발송완료">발송완료</option>
                            </select>
                            </div>
                        </td>
                        </tr>
                        
                        
                    </tbody>
                </table>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>상태 저장</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminItem;