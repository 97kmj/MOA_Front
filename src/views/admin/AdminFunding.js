import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminFunding.module.css"
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { url } from "../../config";
import React, { useState, useEffect } from "react";
const AdminFunding = () => {
    const token = useAtomValue(tokenAtom);
    const [applyList, setApplyList] = useState([]);
    const [selectedFunding ,setSelectedFunding] = useState({});
    useEffect(()=>{
        token!==null && token!=='' && axios.get(`${url}/adminFundings`,{
            headers :{
                Authorization : token
            }
        })
            .then(res => {
                console.log(res.data);
                setApplyList(res.data);
                if(res.data.length > 0) {
                    setSelectedFunding(res.data[0]);
                } else {
                    setSelectedFunding({})
                }
            })
            .catch(err=>{
                console.log(err);
            })
    },[token])

    const selectFunding = (fundingItem) => () => {
        setSelectedFunding(fundingItem);
    }

    const approve = () => {
        axios.post(`${url}/approveFunding`,{fundingId:selectedFunding.fundingId}, {
            headers:{
                Authorization: token
            }
        })
        .then(res => {
            if(res.data===true) {
                const updateList = applyList.filter(
                    (funding) => funding.fundingId !== selectedFunding.fundingId
                );
                setApplyList(updateList);
                //새로운 펀딩 설정 
                if (updateList.length > 0) {
                    setSelectedFunding(updateList[0]);
                } else {
                    setSelectedFunding({})
                }
                alert("승인되었습니다.")
            } else {
                alert("펀딩 승인 오류 발생")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const reject = () => {
        axios.post(`${url}/rejectFunding`,{fundingId:selectedFunding.fundingId}, {
            headers:{
                Authorization: token
            }
        })
        .then(res => {
            if(res.data===true) {
                const updateList = applyList.filter(
                    (funding) => funding.fundingId !== selectedFunding.fundingId
                );
                setApplyList(updateList);
                //새로운 펀딩 설정 
                if (updateList.length > 0) {
                    setSelectedFunding(updateList[0]);
                } else {
                    setSelectedFunding({})
                }
                alert("반려되었습니다.")
            } else {
                alert("펀딩 반려 오류 발생")
            }
        })
        .catch(err => {
            console.log(err)
        })

    }

    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>펀딩 신청 목록</h4>
                <table>
                    <thead>
                        <tr><td colSpan={3}><hr className={styles.bar}></hr></td></tr>
                        <tr><th>이름</th><th>아이디</th><th>신청일</th></tr>
                        <tr><td colSpan={3}><hr className={styles.bar}></hr></td></tr>
                    </thead>
                    <tbody>
                        {   applyList.length>0 ? (
                            applyList.map((fundingItem) => (
                                <tr 
                                key={fundingItem.fundingId} 
                                className={`${styles.registItem} ${
                                    selectedFunding?.fundingId === fundingItem.fundingId? styles.selectedFunding : ""
                                }`}
                                onClick={selectFunding(fundingItem)}>
                                    <td>{fundingItem.fundingUserName}</td><td>{fundingItem.username}</td><td>{new Date(fundingItem.applicationDate).toISOString().slice(0, 10)}</td>
                                </tr>
                            ))
                            ) : (
                                <>
                                <br></br>
                                <tr><td colSpan={3}>펀딩 신청 목록이 없습니다.</td></tr>
                                </>
                            ) 
                        }

                    </tbody>
                </table>
            </div>
            <div className={styles.regDetail}>
                <h4>펀딩 신청 정보</h4><br/>
                <div style={{display:"flex",marginBottom:"20px",justifyContent:"space-between"}}>
                    <div className={styles.detailLeftBox}>
                        <div className={styles.optionText}>목표금액</div>
                        <span
                            className={styles.gold}>{selectedFunding?.goalAmount ? selectedFunding.goalAmount.toLocaleString() : 0}</span>원

                        <div className={styles.optionText}>펀딩 기간</div>
                        <table className={styles.fundingPeriod}>
                            <tr>
                                <th>시작일</th>
                                <th>종료일</th>
                            </tr>
                            <tr>
                                <td>{selectedFunding?.startDate ? new Date(selectedFunding.startDate).toISOString().slice(0, 10) : " "}&nbsp;</td>
                                <td>{selectedFunding?.endDate ? new Date(selectedFunding.endDate).toISOString().slice(0, 10) : " "}&nbsp;</td>
                            </tr>
                        </table>
                        <div className={styles.optionText}>펀딩 소개</div>

                        {/*<textarea className={styles.fundingDescription}*/}
                        {/*          value={selectedFunding?.introduction}></textarea>*/}
                        <div  className={styles.fundingDescription} dangerouslySetInnerHTML={{__html: selectedFunding?.introduction}}/>

                    </div>
                    <div className={styles.detailRightBox}>
                    <div className={styles.optionText}>리워드 목록</div>
                        <div className={styles.rewardListContainer}>
                            <table className={styles.rewardList}>
                                <tr><th>리워드 이름</th><th>설명</th><th>가격</th><th>수량</th><th>수량제한</th></tr>
                                <tbody>
                                {selectedFunding.rewardList?.length > 0 ? (
                                    selectedFunding.rewardList?.map((reward, index) => (
                                    <tr key={reward.id || index}>
                                        <td className={styles.gold}>{reward.name}</td>
                                        <td>{reward.description}</td>
                                        <td className={styles.gold}>{reward.price ? reward.price.toLocaleString() : 0}&#8361;</td>
                                        <td>{reward.quantity ? reward.quantity.toLocaleString() : '제한없음'}</td>
                                        <td>{reward.limitPerPerson ? reward.limitPerPerson : 'X'}</td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan={5}>리워드 목록이 없습니다.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        {/* <div className={styles.optionText}>펀딩 소개</div>
                        <textarea className={styles.fundingDescription}></textarea> */}
                        <div className={styles.optionText}>작품 사진</div>
                        <div className={styles.imglist}>
                            {
                                selectedFunding.imageUrlList && 
                                selectedFunding.imageUrlList.map((image)=> (
                                    <img className={styles.fundingImage} src={image} />
                                ))
                            }
                        </div>
                        
                    </div>

                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={approve}>펀딩 승인</button>
                    <button className={styles.goldbutton} onClick={reject}>펀딩 반려</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminFunding;