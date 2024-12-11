import {useState, useEffect} from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminArtist.module.css";
import axios from "axios";
import { url } from "../../config";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";

const AdminArtist = () => {
    const [registList,setRegistList] = useState([])
    const [selectedArtistInfo, setSelectedArtistInfo] = useState({})
    const token = useAtomValue(tokenAtom);
    useEffect(()=>{
        token!==null && token!=='' && axios.get(`${url}/adminApplyArtists`, {
             headers : {
                Authorization: token
            }
        })
            .then(res=>{
                if(res.data.length > 0) {
                    setRegistList(res.data);
                    setSelectedArtistInfo(res.data[0])
                }
            })
            .catch(err => {
                console.log(err);
            })
    },[token])
    
    const selectArtist = (artist) => () => {
        setSelectedArtistInfo(artist)
        console.log(selectedArtistInfo)
    }
    const portfolioDownload = () => {
        if(!selectedArtistInfo.portfolioUrl) {
            alert("포트폴리오 URL이 없습니다.");
            return;
        }
        const url = selectedArtistInfo.portfolioUrl;
        const fileExtension = url.substring(url.lastIndexOf(".") + 1); // 확장자 추출
        const filename = `${selectedArtistInfo.username}_portfolio.${fileExtension}`; // 파일명 설정
        axios.get(url, {
            responseType: "blob", // 바이너리 데이터로 받아오기
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename); // 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch((error) => {
            console.error("파일 다운로드 실패:", error);
            alert("포트폴리오 다운로드 중 문제가 발생했습니다.");
        });
    }

    const approve = () => {
        axios.post(`${url}/approveArtist`, {username:selectedArtistInfo.username},
            { headers : {
                "Content-Type": "application/json",
                Authorization: token
                }
            }
        )
        .then(res => {
            if(res.data===true) {
                alert("승인되었습니다.")
                 // 목록에서 제거
                const updatedList = registList.filter(
                    (artist) => artist.username !== selectedArtistInfo.username
                );
                setRegistList(updatedList);

                // 새로운 선택된 작가 설정
                if (updatedList.length > 0) {
                    setSelectedArtistInfo(updatedList[0]); // 첫 번째 작가 선택
                } else {
                    setSelectedArtistInfo({}); // 빈 값 설정
                }
            } else {
                alert("승인 오류")
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }
    const reject = () => {
        const username = selectedArtistInfo.username;
        axios.post(`${url}/rejectArtist`,{username:selectedArtistInfo.username}, {
            headers : {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        .then(res => {
            if(res.data===true) {
                 // 목록에서 제거
                const updatedList = registList.filter(
                    (artist) => artist.username !== selectedArtistInfo.username
                );
                setRegistList(updatedList);

                // 새로운 선택된 작가 설정
                if (updatedList.length > 0) {
                    setSelectedArtistInfo(updatedList[0]); // 첫 번째 작가 선택
                } else {
                    setSelectedArtistInfo({}); // 빈 값 설정
                }
                alert("신청 반려되었습니다.")
            } else {
                alert("작가 신청 반려 오류")
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }
    

    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>작가 신청 목록</h4>
                <table>
                    <thead>
                    <tr><td colSpan={3}><hr className={styles.bar}></hr></td></tr>
                        <tr><th>이름</th><th>아이디</th><th>신청일</th></tr>
                    <tr><td colSpan={3}><hr className={styles.bar}></hr></td></tr>
                    </thead>
                    <tbody>
                        {
                            registList.length > 0 ? (
                            registList.map((artist)=> (
                                <tr 
                                    onClick={selectArtist(artist)}
                                    className={`${styles.registItem} ${artist.username === selectedArtistInfo.username ? styles.selected:''}`
                                }>
                                    <td>{artist.name}</td>
                                    <td>{artist.username}</td>
                                    <td>{new Date(artist.applicationDate).toISOString().slice(0, 10)}</td>
                                </tr>

                            ))
                            ) : (
                                <tr><td colSpan={3}>신청한 회원이 없습니다.</td></tr>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.regDetail}>
                <h3>작가 신청 정보</h3><br/>
                <div style={{display:"flex"}}>
                    <div className={styles.imgBox}>
                        <img className={styles.profileImage} src={selectedArtistInfo.profileImage || ""}/>
                    </div>
                    <table className={styles.info}>
                        <tr><td>아이디</td><td>{selectedArtistInfo.username}</td></tr>
                        <tr><td>이름</td><td>{selectedArtistInfo.name}</td></tr>
                    </table>
                <button className={styles.goldbutton} onClick={portfolioDownload}>포트폴리오 다운로드</button>
                </div>
                <br></br>
                <h5>작가이력</h5>
                <textarea readOnly value={selectedArtistInfo.artistCareer || ""}></textarea>
                <h5>작가노트</h5>
                <textarea readOnly value={selectedArtistInfo.artistNote || ""}></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={approve}>승인하기</button>
                    <button className={styles.goldbutton} onClick={reject}>반려하기</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminArtist;