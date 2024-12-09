import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminArtwork.module.css";
import axios from "axios";
import { url } from "../../config";
import { useState,useEffect } from "react";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";

const AdminArtwork = () => {
    const token = useAtomValue(tokenAtom);
    const [suspiciousArtworkList, setSuspiciousArtworkList] = useState([]); //의심작품리스트
    const [selectedArtwork,setSelectedArtwork] = useState({});
    useEffect(()=>{
        token!==null && token!=='' && axios.get(`${url}/adminBlackArtwork`, {
            headers :{ 
                Authorization : token
            }
        })
            .then(res=> {
                setSuspiciousArtworkList(res.data);
                setSelectedArtwork(res.data[0]);
            })
            .catch(err=> {
                console.error(err);
            })
    },[token])

    const handleSelecteArtwork = (artwork) => {
        setSelectedArtwork(artwork);
    }

    const deleteArtwork = () => {
        const artworkId = selectedArtwork.artworkId;
        axios.post(`${url}/deleteArtwork`,{ artworkId },{
            headers : {
                Authorization : token
            }})
        .then(res => {
            if(res.status === 200 ) {
                //삭제된 공지사항을 목록에서 제거
                const updatedList = suspiciousArtworkList.filter(item => item.artworkId !== artworkId)
                setSuspiciousArtworkList(updatedList);
                if (updatedList.length > 0) {
                    setSelectedArtwork(updatedList[0]); //첫 번째 아트워크를 selectedArtwork로 설정
                } else { 
                    setSelectedArtwork({}) //없으면 빈 객체로 설정
                }
                alert("삭제가 완료되었습니다.");
            } else {
                alert("삭제 중 오류가 발생하였습니다.");
            }
        })
        .catch(err => {
            console.error(err)
        })
    }


    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.regList}>
                <h4>의심 작품 리스트</h4>
                <table>
                    <thead>
                        <tr><th>아이디</th><th>제목</th><th>게시일</th></tr>
                    </thead>
                    <tbody>
                        {
                            suspiciousArtworkList.length > 0 ? 
                                suspiciousArtworkList.map((item)=>(
                                    <tr className={`${item.artworkId === selectedArtwork.artworkId ? styles.selectedTr : ''}`}
                                    onClick={()=>handleSelecteArtwork(item)}>
                                        <td>{item?.artistId}</td>
                                        <td>{item?.title}</td>
                                        <td>{new Date(item?.createAt).toISOString().slice(0, 10)}</td>
                                    </tr>    
                                ))
                            : 
                                <>
                                <tr><td colSpan={3}>의심 작품이 없습니다.</td></tr>
                                </>
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.artDetail}>
                <h3>작품 정보</h3><br/>
                <div className={styles.artwork}>
                    <img className={styles.artImg}  src={selectedArtwork?.imageUrl || "/img/default_image.jpg"}  alt='작품'/>
                </div>
                <div>제목 &nbsp;&nbsp;&nbsp;&nbsp;<span><b>{selectedArtwork?.title}</b></span></div><br/>
                <div>설명</div>
                <textarea value={selectedArtwork?.description} readOnly>
                </textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={deleteArtwork}>삭제하기</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminArtwork;