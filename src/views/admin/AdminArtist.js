import {useState, useEffect} from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminArtist.module.css";
import axios from "axios";
import { url } from "../../config";
const AdminArtist = () => {
    const [registList,setRegistList] = useState([])
    const [selectedArtistInfo, setSelectedArtistInfo] = useState({})
    useEffect(()=>{
        axios.get(`${url}/adminApplyArtists`)
            .then(res=>{
                console.log(res.data)
                setRegistList(res.data);
                setSelectedArtistInfo(res.data[0])
            })
            .catch(err => {
                console.log(err);
            })
    },[])


    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>작가 신청 목록</h4>
                <table>
                    <thead>
                        <tr><th>이름</th><th>아이디</th><th>신청일</th></tr>
                    </thead>
                    <tbody>
                        {
                            registList.length > 0 ? (
                            registList.map((artist)=> (
                                <tr>
                                    <td>{artist.name}</td>
                                    <td>{artist.username}</td>
                                    <td>{new Date(artist.applicationDate).toISOString().slice(0, 10)}</td>
                                </tr>

                            ))
                            ) : (
                                <div>신청한 회원이 없습니다.</div>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.regDetail}>
                <h3>작가 신청 정보</h3><br/>
                <div style={{display:"flex"}}>
                    <div className={styles.imgBox}>
                        <img className={styles.profileImage}src={selectedArtistInfo.profileImage}/>
                    </div>
                    <table className={styles.info}>
                        <tr><td>아이디</td><td>hong1234</td></tr>
                        <tr><td>이름</td><td>홍길동</td></tr>
                    </table>
                <button className={styles.goldbutton}>포트폴리오 다운로드</button>
                </div>
                <br></br>
                <h5>작가이력</h5>
                <textarea readOnly value={selectedArtistInfo.artistCareer}></textarea>
                <h5>작가노트</h5>
                <textarea readOnly value={selectedArtistInfo.artistNote}></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}
                    >승인하기</button>
                    <button className={styles.goldbutton}>반려하기</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminArtist;