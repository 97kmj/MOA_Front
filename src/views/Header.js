import { useAtom } from "jotai/react";
import { userAtom } from "../atoms";
import styles from '../css/header.module.css';

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
                    <li><a href="">FUNDING</a></li>
                    <li><a href="">NOTICE/FAQ</a></li>
                    {/* { user.role=='ARTIST' && */}
                        
                        <li>REGIST&nbsp;
                            <img src="/img/Sort Down.png"/>
                            <ul className={styles.submenu}>
                                <li><a href="">Artwork</a></li>
                                <li><a href="">Funding</a></li>
                            </ul>
                        </li>
                        
                    {/* }; */}
                </ul>
            </nav>
            <div>
                <a href="#" className={styles.login}>Login</a>
            </div>
        </div>
        </>
    )
}

export default Header;