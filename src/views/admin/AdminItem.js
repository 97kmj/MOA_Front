import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminItem.module.css";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { url } from "../../config";
import { useState, useEffect } from "react";
const AdminItem = () => {
    const token = useAtomValue(tokenAtom);
    const [orderItemList,setOrderItemList] = useState([]);
    const [updateStatusList,setUpdateStatusList] = useState([]);
    useEffect(()=>{
        axios.get(`${url}/adminItem`,{headers:{
            Authorization: `Bearer ${token}`
        }})
        .then(res => {
            console.log(res.data)
            setOrderItemList(res.data);
        })
        .catch(err => {
            console.error(err)
        })
    },[token])

    const handleStatusChange = (orderItemId, newStatus) => {
        setOrderItemList((prevList) =>
            prevList.map((item) =>
                item.orderItemId === orderItemId
                    ? { ...item, shippingStatus: newStatus }
                    : item
            )
        );

        // 업데이트 목록에 추가하거나 기존 값 업데이트
        setUpdateStatusList((prevList) => {
            const existingIndex = prevList.findIndex(
                (update) => update.orderItemId === orderItemId
            );
            //기존에 있으면 변경
            if (existingIndex !== -1) {   
                const updatedList = [...prevList];
                updatedList[existingIndex].status = newStatus;
                return updatedList;
            } else { 
                return [...prevList, { orderItemId: orderItemId, status: newStatus }]; //없으면 추가
            }
        });
    };

    const saveStatuses = () => {
        axios.put(`${url}/updateStatus`,
                updateStatusList ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                alert("상태가 성공적으로 저장되었습니다.");
                setUpdateStatusList([]); // 성공 시 리스트 초기화
            })
            .catch((err) => {
                console.error(err);
                alert("상태 저장 중 오류가 발생했습니다.");
            });
    };

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
                        {
                            orderItemList.length > 0 ?
                            orderItemList.map(item=>(
                            <tr>
                            <td>{item.orderItemId}</td>
                            <td>{item.buyerId}</td><td>{item.sellerId}</td><td>{item.artworkTitle}</td><td>{item.frameType || '없음'}</td><td>{new Date(item.paymentDate).toISOString().slice(0,10)}</td>
                            <td>
                                <div className={styles.customSelect}>
                                <select
                                    value={item.shippingStatus} // shippingStatus 값을 select의 value로 설정
                                    onChange={(e) =>
                                        handleStatusChange(
                                            item.orderItemId,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="WAITING">작가 배송대기</option>
                                    <option value="INSPECTION">검수중</option>
                                    <option value="DELIVERED">발송완료</option>
                                    <option value="DEFECTIVE">검수불량</option>
                                </select>
                                </div>
                            </td>
                            </tr>  
                            ))
                            :
                            <tr><td colSpan={7}>주문목록이 없습니다.</td></tr>
                        }
                        
                    </tbody>
                </table>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}
                     onClick={saveStatuses}
                     disabled={updateStatusList.length === 0} // 변경 사항 없을 시 비활성화
                     >상태 저장</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminItem;