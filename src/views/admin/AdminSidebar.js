import styles from "../../css/admin/Adminside.module.css"
import {useNavigate} from "react-router-dom";
const AdminSidebar = () => {
    const navigate = useNavigate();


    return(
        <div className={styles.sidebar}>
            <div className={styles.sidehead}>
                <h1 onClick={()=>navigate("/")}>MOA</h1>
            </div>
            <div>
                <div className={styles.sidemenu} onClick={()=>navigate("/admin/notice")}><img src="https://img.icons8.com/?size=50&id=dfiNvwAesiYh&format=png&color=000000" alt=''/>
                <h3>공지사항 관리</h3>
                </div><div className={styles.sidemenu} onClick={()=>navigate("/admin/QnA")}><img src="https://img.icons8.com/?size=50&id=5471&format=png&color=000000" alt=''/>
                <h3>1대1 문의함</h3>
                </div><div className={styles.sidemenu} onClick={()=>navigate("/admin/artistList")}><img src="https://img.icons8.com/?size=50&id=adfGQFjCB0Pw&format=png&color=000000" alt=''/>
                <h3>작가회원 신청 관리</h3>
                </div><div className={styles.sidemenu} onClick={()=>navigate("/admin/funding")}><img src="https://img.icons8.com/?size=50&id=16184&format=png&color=000000" alt=''/>
                <h3>펀딩 신청/취소 관리</h3>
                </div><div className={styles.sidemenu} onClick={()=>navigate("/admin/blackArtwork")}><img src="https://img.icons8.com/?size=50&id=5215&format=png&color=000000" alt=''/>
                <h3>게시물 관리</h3>
                </div>
                <div className={styles.sidemenu} onClick={()=>navigate("/admin/item")}><img src="https://img.icons8.com/?size=50&id=6921&format=png&color=000000" alt=''/>
                <h3>상품 관리</h3>
                </div>
                <div className={styles.sidemenu} onClick={()=>navigate("/admin/frame")}><img src="https://img.icons8.com/?size=50&id=11653&format=png&color=000000" alt=''/>
                <h3>프레임 상품 관리</h3>
                </div>
            </div>
        </div>
    )
}


export default AdminSidebar;