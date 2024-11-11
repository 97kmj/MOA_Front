import { useAtom } from "jotai/react";
import { userAtom } from "../atoms";
import '../css/header.css'

const Header = () => {
    const [user,setUser] = useAtom(userAtom);
    
    return(
        <>
        <div className="header">
            <a href="/" className="moa">MOA</a>
            <nav className="navmenu">
                <ul>
                    <li><a href="">GALLERY</a></li>
                    <li><a href="">SHOP</a></li>
                    <li><a href="">FUNDING</a></li>
                    <li><a href="">NOTICE/FAQ</a></li>
                    {/* { user.role=='ARTIST' && */}
                        
                        <li>REGIST&nbsp;
                            <img src="/img/Sort Down.png"/>
                            <ul id="submenu">
                                <li><a href="">Artwork</a></li>
                                <li><a href="">Funding</a></li>
                            </ul>
                        </li>
                        
                    {/* }; */}
                </ul>
            </nav>
            <div>
                <a href="#" className="login">Login</a>
            </div>
        </div>
        </>
    )
}

export default Header;