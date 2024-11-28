import Header from "../../Header";
import { useEffect, useState } from "react";
import styles from "../../../css/mypage/artist/ArtistRegist.module.css";
import SideNav from "../SideNav";
import axios from "axios";
import { useAtomValue,useAtom} from "jotai/react";
import { userAtom,tokenAtom } from "../../../atoms";
import { url } from "../../../config";
const ArtistRegist = () => {
    const user = useAtomValue(userAtom);
    const token = useAtomValue(tokenAtom);
    const [portfolioName, setPortfolioName] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [portfolioFile, setPortfolioFile] = useState('');
    const [registArtistInfo, setRegistArtistInfo] = useState({
        username:'',
        artistNote:'',
        artistCareer:''
    })
    
    useEffect(() => {
        setRegistArtistInfo((prev) => ({
            ...prev,
            username: user.username || "", // user.username이 초기화되지 않았으면 빈 문자열로 설정
        }));
    }, [user]);

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

    const artistSubmit =() => {
        if (!registArtistInfo.username) {
            alert("사용자 이름이 설정되지 않았습니다.");
            return;
        }
        const formData = new FormData();

        // 프로필 이미지 파일 추가
        formData.append("profileImage", document.querySelector("#profileImage").files[0]);

        // 포트폴리오 파일 추가
        formData.append("portfolio", portfolioFile);

        // JSON 문자열로 변환 후 추가
        formData.append("registArtistDto", JSON.stringify(registArtistInfo));

        axios.post(`${url}/artistSubmit`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // 반드시 명시
                },
            })
            .then((res) => {
                if (res.data === true) {
                    alert("신청 완료");
                } else {
                    alert("등록 실패");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const edit = (e) => {
        setRegistArtistInfo({...registArtistInfo,[e.target.name]:e.target.value})
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
                    <textarea name="artistCareer" onChange={edit}></textarea>
                    <h4 style={{textAlign:"left"}}>작가 노트</h4>
                    <textarea name="artistNote" onChange={edit}></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={artistSubmit}>신청하기</button>
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