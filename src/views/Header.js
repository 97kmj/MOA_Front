import { useAtom,useAtomValue, useSetAtom } from "jotai/react";
import { tokenAtom, userAtom, initUser} from "../atoms";
import styles from '../css/Header.module.css';
import {Link, NavLink, useNavigate} from "react-router-dom";


const Header = () => {
    const navigate= useNavigate();
    const [user,setUser] = useAtom(userAtom);
    const setToken = useSetAtom(tokenAtom);
    const logout = () => {
        setUser({...initUser});
        setToken('');
        navigate("/login");
    }
    return(
        <>
        <div className={styles.header}>
            <div className={styles.navContainer}>
            
            <Link to="/" className={styles.moa}>MOA</Link>
            <nav className={styles.navmenu}>
                <ul>
                    <li><Link to="/gallery">GALLERY</Link></li>
                    <li><Link to="/shop/saleList">SHOP</Link></li>
                    <li>
                        <Link to="/fundings">FUNDING</Link>
                    </li>
                    <li><Link to="/notice">NOTICE/FAQ</Link></li>
                    { user.role=='ARTIST' && 
                    <>
                    <li className={styles.regist}>REGIST&nbsp;

                        <img src="/img/Sort_Down.png"/>

                        <ul className={styles.submenu}>
                            <li><Link to="/shop/artworkAdd">Artwork</Link></li>
                            <li>
                                <Link to="/funding/new">Funding</Link>
                            </li>
                        </ul>
                    </li>
                    </>
                    }{ user.role=='ADMIN' && 
                        <>
                        <li><Link to="/admin/notice">ADMIN</Link>
                        </li>
                        </>
                        }
                </ul>
            </nav>
            <div className={styles.naviIconBox}>
                {
                    user.username!==''? <>                 
                        {
                            user.role!=='ADMIN' &&<>
                            <Link to="/shop/shoppingCart/:artworkId"><img src="/img/cartIcon.png"/></Link>
                            <Link to=""><img src="/img/messageIcon.png"/></Link>
                            <Link to=""><img src="/img/notificationIcon.png"/></Link>
                            </>
                        }
                        <Link to="" className={styles.login}>{user.name}</Link>&nbsp;&nbsp;&nbsp;
                        <Link to="#" className={styles.login} onClick={logout}>Logout</Link> 
                    </>:
                    <>
                    <Link to="/user/login" className={styles.login}>Login</Link>            
                    </>

                    
                }
                </div>
            </div>
        </div>
        </>
    )
}

export default Header;