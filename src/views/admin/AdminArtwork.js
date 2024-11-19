import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminArtwork.module.css";
const AdminArtwork = () => {
    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>신고/의심 작품 리스트</h4>
                <table>
                    <thead>
                        <tr><th>아이디</th><th>제목</th><th>게시일</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>hont1234</td><td>별이 빛나는 밤</td><td>2024-10-10</td></tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.artDetail}>
                <h3>작품 정보</h3><br/>
                <div className={styles.artwork}>
                    <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                </div>
                <div>제목 &nbsp;&nbsp;&nbsp;&nbsp;<span><b>별이 빛나는 밤</b></span></div><br/>
                <div>설명</div>
                <textarea>

                </textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>삭제하기</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminArtwork;