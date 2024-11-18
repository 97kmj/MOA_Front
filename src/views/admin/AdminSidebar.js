import styles from "../../css/admin/adminside.module.css"
const AdminSidebar = () => {
    return(
        <div className={styles.sidebar}>
            <div>
                <h2 align="center">관리자 메뉴</h2>
                <div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=dfiNvwAesiYh&format=png&color=000000" alt=''/>
                <h3>공지사항 관리</h3>
                </div><div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=5471&format=png&color=000000" alt=''/>
                <h3>1대1 문의함</h3>
                </div><div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=adfGQFjCB0Pw&format=png&color=000000" alt=''/>
                <h3>작가회원 신청 관리</h3>
                </div><div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=16184&format=png&color=000000" alt=''/>
                <h3>펀딩 신청/취소 관리</h3>
                </div><div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=5215&format=png&color=000000" alt=''/>
                <h3>게시물 관리</h3>
                </div>
                <div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=6921&format=png&color=000000" alt=''/>
                <h3>상품 관리</h3>
                </div>
                <div className={styles.sidemenu}><img src="https://img.icons8.com/?size=50&id=11653&format=png&color=000000" alt=''/>
                <h3>프레임 상품 관리</h3>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar;