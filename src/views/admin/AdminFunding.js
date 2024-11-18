import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/adminFunding.module.css"
const AdminFunding = () => {
    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>펀딩 신청 목록</h4>
                <hr></hr>
                <table>
                    <thead>
                        <tr><th>이름</th><th>아이디</th><th>신청일</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>홍길동</td><td>hong1234</td><td>2024-10-10</td></tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.regDetail}>
                <h3>펀딩 신청 정보</h3><br/>
                <div style={{display:"flex",margin:"20px",justifyContent:"space-between"}}>
                    <div className={styles.detailLeftBox}>
                    <h5>목표금액</h5>
                    <input className={styles.goalAmount}></input>
                    <h5>펀딩 기간</h5>
                    <table className={styles.fundingPeriod}>
                        <tr><th>시작일</th><th>종료일</th></tr>
                        <tr><td>2024-10-20</td><td>2024-11-30</td></tr>
                    </table>
                    <h5>리워드 목록</h5>
                    
                    <div className={styles.rewardListContainer}>
                        <table className={styles.rewardList}>
                            <tbody>
                            <tr>
                                <td className={styles.gold}>리워드없는 후원</td>
                                <td>리워드없는 후원</td>
                                <td className={styles.gold}>0&#8361;</td>
                                <td>1개</td>
                            </tr>
                            <tr>
                                <td className={styles.gold}>리워드없는 후원</td>
                                <td>리워드없는 후원</td>
                                <td className={styles.gold}>0&#8361;</td>
                                <td>1개</td>
                            </tr>
                            <tr>
                                <td className={styles.gold}>리워드없는 후원</td>
                                <td>리워드없는 후원</td>
                                <td className={styles.gold}>0&#8361;</td>
                                <td>1개</td>
                            </tr>
                            <tr>
                                <td className={styles.gold}>리워드없는 후원</td>
                                <td>리워드없는 후원</td>
                                <td className={styles.gold}>0&#8361;</td>
                                <td>1개</td>
                            </tr>
                            
                            </tbody>
                        </table>
                    </div>
                    
                    </div>
                    <div className={styles.detailRightBox}>
                        <h5>펀딩 소개</h5>
                        <textarea></textarea>
                        <h5>작품 사진</h5>
                        <div className={styles.imglist}>

                        </div>
                        
                    </div>

                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>펀딩 승인</button>
                    <button className={styles.goldbutton}>펀딩 반려</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminFunding;