import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminFrame.module.css";
const AdminFrame = () => {
    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.frameList}>
                <h4>프레임 옵션 목록</h4>
                <div className={styles.listBox}>
                <table>
                    <thead>
                        <tr><th>상품명</th><th>사이즈(호)</th><th>가격</th><th>재고</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                        <td>기본 프레임</td><td>50</td><td>100,000</td><td>45</td>
                        <td>
                            <div className={styles.buttonDiv}>
                                <button className={styles.goldbutton}>수정하기</button>
                            </div>
                        </td>
                        </tr> 
                    </tbody>
                </table>
                </div>
                <h4>추가 옵션 등록</h4>
                <div className={styles.tableBox}>
                <table>
                    <thead>
                        <tr><th>상품명</th><th>사이즈(호)</th><th>가격</th><th>재고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><input type="text"></input></td><td><input type="text"></input></td><td><input type="text"></input></td><td><input type="text"></input></td>
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

export default AdminFrame;