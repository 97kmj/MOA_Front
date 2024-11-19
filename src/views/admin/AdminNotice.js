import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminNotice.module.css"
const AdminNotice = () => {
    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.noticeList}>
                <h4>등록된 공지사항</h4>
                <table>
                    <tbody>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>

                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    <tr>
                        <td className={styles.title}>작가 회원 신청 시 유의사항</td>
                        <td className={styles.date}>2024-10-22</td>
                    </tr>
                    </tbody>
                </table>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>공지 작성하기</button>
                </div>
            </div>
            <div className={styles.noticeDetail}>
                <h4>공지사항 상세</h4>
                <div className={styles.detailTitle}>제목</div><input   readOnly />
                <div className={styles.detailContent}>내용</div>
                <textarea></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>수정하기</button>
                    <button className={styles.goldbutton}>삭제하기</button>
                </div>
            </div>
        </div>
        </>
    )
}
 
export default AdminNotice;