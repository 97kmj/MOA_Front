import { useAtom } from "jotai/react";
import { userAtom } from "../atoms";
import styles from '../css/Header.module.css';
import {Link, NavLink} from "react-router-dom";


const Header = () => {
    const [user,setUser] = useAtom(userAtom);
    
    return(
        <>
        <div className={styles.header}>
            <Link to="/" className={styles.moa}>MOA</Link>
            <nav className={styles.navmenu}>
                <ul>
                    <li><Link to="/gallery">GALLERY</Link></li>
                    <li><Link to="/shop/saleList">SHOP</Link></li>
                    <li>
                        <Link to="/fundings">FUNDING</Link>
                    </li>
                    <li><Link to="/notice">NOTICE/FAQ</Link></li>
                    {/* { user.role=='ARTIST' && */}

                    <li className={styles.regist}>REGIST&nbsp;
                        <img src="/img/Sort Down.png"/>
                        <ul className={styles.submenu}>
                            <li><Link to="/shop/artworkAdd">Artwork</Link></li>
                            <li>
                                <Link to="/funding/new">Funding</Link>
                            </li>
                        </ul>
                    </li>

                    {/* }; */}
                </ul>
            </nav>
            <div>
            {/* <a href="#" className={styles.login}>Login</a> */}
                <Link to="/user/login" className={styles.login}>Login</Link>            
            </div>

        </div>
        </>
    )
}

export default Header;