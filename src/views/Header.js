import { useAtom } from "jotai/react";
import { userAtom } from "../atoms";
import styles from '../css/Header.module.css';
import {Link, NavLink} from "react-router-dom";


const Header = () => {
    const [user,setUser] = useAtom(userAtom);
    
    return(
        <>
        <div className={styles.header}>
            <a href="/" className={styles.moa}>MOA</a>
            <nav className={styles.navmenu}>
                <ul>
                    <li><a href="">GALLERY</a></li>
                    <li><a href="">SHOP</a></li>
                    <li>
                        <Link to="/fundings">FUNDING</Link>
                    </li>
                    <li><a href="">NOTICE/FAQ</a></li>
                    {/* { user.role=='ARTIST' && */}

                    <li className={styles.regist}>REGIST&nbsp;
                        <img src="/img/Sort Down.png"/>
                        <ul className={styles.submenu}>
                            <li><a href="">Artwork</a></li>
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
            <Link to="/user/login" className={styles.login}>Login</Link>            </div>
        </div>
        </>
    )
}

export default Header;