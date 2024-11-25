import Header from "../../Header";
import { useState } from "react";
import styles from "../../../css/mypage/artist/ArtistRegist.module.css";
import SideNav from "../SideNav";
import axios from "axios";
import { useAtomValue} from "jotai/react";
import { userAtom } from "../../../atoms";
const ArtistRegist = () => {
    const user = useAtomValue(userAtom);
    const [portfolioName, setPortfolioName] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [portfolioFile, setPortfolioFile] = useState('');
    const [registArtistInfo, setRegistArtistInfo] = useState({
        username:user.username,
        artistNote:'',
        artistCareer:''
    })

    const portfolioUpload =(e) => {
        const portfolio = e.target.files[0];
        if(portfolio) {
            setPortfolioName(portfolio.name); //파일 이름 미리보기
            setPortfolioFile(portfolio); 
        }
    };
    const profileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
        }
    }

        
    return(
        <>
        <Header/>
        <div className={styles.container}>
            <SideNav/>
            <div className={styles.body}>
                <h3>작가 등록 신청</h3>
                <div className={styles.registform}>
                    <h4 style={{textAlign:"left"}}>포트폴리오</h4>
                    <div className={styles.filebox}>
                        <input className={styles.uploadName} value={portfolioName} placeholder="첨부파일" readOnly/>
                        <label for="portfolio">파일찾기</label> 
                        <input type="file" id="portfolio" name="portfolio" onChange={portfolioUpload}/>
                    </div>    
                    <h4 style={{textAlign:"left"}}>프로필 사진</h4>
                    <div className={styles.imgBox}>
                        <img src={profileImg? profileImg : "https://img.icons8.com/?size=150&id=114064&format=png&color=B39C59"}/>
                    </div>
                    <div className={styles.imgUploadbox}>
                    <label for="profileImage">프로필 사진 선택</label><input type="file" id="profileImage" name="profileImage" accept='image/*' onChange={profileChange}/>
                    </div>
                    <h4 style={{textAlign:"left"}}>작가 이력</h4>
                    <textarea name="artistCareer"></textarea>
                    <h4 style={{textAlign:"left"}}>작가 노트</h4>
                    <textarea name="artistNote"></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>신청하기</button>
                </div>
                </div>
            </div>
            <div>

            </div>
        </div>

        </>
    )
}

export default ArtistRegist;