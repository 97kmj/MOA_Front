import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminArtist.module.css"
const AdminArtist = () => {
    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>작가 신청 목록</h4>
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
                <h3>작가 신청 정보</h3><br/>
                <div style={{display:"flex"}}>
                    <div className={styles.imgBox}>
                    </div>
                    <table className={styles.info}>
                        <tr><td>아이디</td><td><b>hong1234</b></td></tr>
                        <tr><td>이름</td><td><b>홍길동</b></td></tr>
                    </table>
                </div>
                <h5>포트폴리오</h5>
                <input type="file"></input>    
                <h5>작가이력</h5>
                <textarea></textarea>
                <h5>작가노트</h5>
                <textarea></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>승인하기</button>
                    <button className={styles.goldbutton}>반려하기</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminArtist;