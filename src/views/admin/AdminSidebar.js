import styles from "../../css/admin/Adminside.module.css"
import {useNavigate,useLocation} from "react-router-dom";


const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 메뉴 배열 (경로와 텍스트를 객체로 관리)
    const menuItems = [
        { path: "/admin/notice", label: "공지사항 관리", icon: "https://img.icons8.com/?size=50&id=dfiNvwAesiYh&format=png&color=000000" },
        { path: "/admin/QnA", label: "1대1 문의함", icon: "https://img.icons8.com/?size=50&id=5471&format=png&color=000000" },
        { path: "/admin/artistList", label: "작가회원 신청 관리", icon: "https://img.icons8.com/?size=50&id=adfGQFjCB0Pw&format=png&color=000000" },
        { path: "/admin/funding", label: "펀딩 신청/취소 관리", icon: "https://img.icons8.com/?size=50&id=16184&format=png&color=000000" },
        { path: "/admin/blackArtwork", label: "게시물 관리", icon: "https://img.icons8.com/?size=50&id=5215&format=png&color=000000" },
        { path: "/admin/item", label: "상품 관리", icon: "https://img.icons8.com/?size=50&id=6921&format=png&color=000000" },
        { path: "/admin/frame", label: "프레임 상품 관리", icon: "https://img.icons8.com/?size=50&id=11653&format=png&color=000000" },
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidehead}>
                <h1 onClick={() => navigate("/")}>MOA</h1>
            </div>
            <div>
                {menuItems.map((menu) => (
                    <div
                        key={menu.path}
                        className={`${styles.sidemenu} ${location.pathname === menu.path ? styles.active : ""}`}
                        onClick={() => navigate(menu.path)}
                    >
                        <img src={menu.icon} alt={menu.label} />
                        <h3>{menu.label}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default AdminSidebar;