import AdminSidebar from "./AdminSidebar";
import { useState,useEffect, useRef } from "react";
import styles from "../../css/admin/AdminNotice.module.css";
import axios from "axios"
import {url} from "../../config.js"
import { userAtom,tokenAtom } from "../../atoms.js";
import { useAtomValue } from "jotai";
const AdminNotice = () => {
    const token = useAtomValue(tokenAtom);
    const [noticeList, setNoticeList] = useState([]);
    const [notice,setNotice] = useState({});
    const [selectedNoticeId, setSelectedNoticeId] = useState(null); // 선택된 공지사항 ID
    const [backupNotice, setBackupNotice] = useState({}); // 수정 전 데이터를 저장할 상태
    const [isModify, setIsModify] = useState(false);
    const [isRegist, setIsRegist] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const modalHandler = () => {
        setModalOpen(!modalOpen);        
    }

    

    useEffect(()=>{
        token!==null && token!=='' && axios.get(`${url}/adminNotice`,{
            headers:
            {
                Authorization: token
            }
        })
            .then(res => {
                if (res.data.length>0){
                    const newnoticeList = res.data;
                    setNoticeList(newnoticeList);
                    setNotice(newnoticeList[0]);
                    setSelectedNoticeId(newnoticeList[0].noticeId)
                } else {
                    setNoticeList([]);
                    setNotice({});
                }
            })
            .catch (err => {
                console.log(err);
            })
    },[token])
    
    const selectNotice =(index) => () => {
       setNotice(noticeList[index]);
       setSelectedNoticeId(noticeList[index].noticeId); // 선택된 공지사항 ID 설정
       setIsRegist(false);
       setIsModify(false);
    }
    const edit = (e) => {
        setNotice({...notice,[e.target.name]:e.target.value})
    }
    const registOnClick = () => {
        setIsRegist(true);
        setIsModify(true);
        setNotice({noticeId:'',title:'',content:''});
    }

    const modifyHandler = () => {
        if(!isModify) {
            setBackupNotice({...notice});
        }
        setIsModify(!isModify);
    }
    
    const cancelModify = () => {
        setNotice(backupNotice);
        setIsModify(false);
    }
    
    const modifyNotice = () => {
        const modifiedNotice = {noticeId:notice.noticeId, title:notice.title, content:notice.content};
        axios.post(`${url}/modifyNotice`,modifiedNotice ,{
            headers:
            {
                Authorization: token
            }
        })
            .then(res => {
                // 1. 개별 공지사항 업데이트
                setNotice(res.data);
                // 2. noticeList에서 수정된 항목 업데이트
                setNoticeList((prevList) =>
                    prevList.map((item) =>
                        item.noticeId === res.data.noticeId ? res.data : item
                    )
                );
                alert("공지사항 수정이 완료되었습니다.");
                setIsModify(!isModify);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    const registNotice = () => {
        axios.post(`${url}/writeNotice`,notice ,{
            headers:
            {
                Authorization: token
            }
        })
            .then(res => {
                const newNotice = res.data; // 새로 등록된 공지사항 데이터
                setNotice(newNotice);
                setNoticeList([newNotice,...noticeList]);
                setSelectedNoticeId(newNotice.noticeId)
                alert("공지사항이 등록되었습니다.");
                setIsModify(false);
                setIsRegist(false);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    const deleteNotice = () => {
        axios.post(`${url}/deleteNotice/${notice.noticeId}` ,{
            headers:
            {
                Authorization: token
            }
        })
            .then(res => {
                // 1. 삭제된 공지사항을 목록에서 제거
                const updatedList = noticeList.filter(item => item.noticeId !== notice.noticeId);
                setNoticeList(updatedList);
                // 2. 삭제 후 첫 번째 공지사항 선택 또는 비우기
                if (updatedList.length > 0) {
                    setNotice(updatedList[0]); // 첫 번째 공지사항으로 설정
                } else {
                    setNotice({}); // 공지사항이 없으면 빈 객체로 설정
                }

                alert("삭제가 완료되었습니다.");
                modalHandler(); // 모달 닫기
            })
            .catch( err=>{
                console.log(err);
            })
    }

    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.noticeList}>
                <h4>등록된 공지사항</h4>
                <hr className={styles.bar}></hr>
                    <ul>
                    {
                        noticeList.length > 0 ? (
                        noticeList.map((notice,index)=>(
                            <li 
                                key={notice.noticeId} 
                                onClick={selectNotice(index)}
                                className={`${styles.noticeItem} ${
                                    notice.noticeId === selectedNoticeId ? styles.selected : ""
                                }`}>
                                <span className={styles.title}>{notice.title}</span>
                                <span className={styles.date}>{new Date(notice.createdAt).toISOString().slice(0, 10)}</span>        
                            </li>
                            ))
                        ) : (
                            <li>등록된 공지사항이 없습니다.</li>
                        )   
                    }
                    </ul>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={registOnClick} >공지 작성하기</button>
                </div>
            </div>
            <div className={styles.noticeDetail}>
                <h4>{isRegist? "공지사항 작성" : isModify ? "공지사항 수정" : "공지사항 상세"}</h4>    
                <div className={styles.detailTitle}>제목</div>
                <input id="title" name="title" readOnly={!isModify} value={notice.title || ""} onChange={edit}/>
                <div className={styles.detailContent}>내용</div>
                <textarea id="content" name="content" readOnly={!isModify} value={notice.content || ""} onChange={edit}></textarea>
                <div className={styles.buttonDiv}>
                    {   
                        isRegist ? ( 
                        <>
                            <button className={styles.goldbutton} onClick={registNotice}>등록하기</button>
                        </>) 
                        :
                        isModify ? (
                        <>
                        <button className={styles.goldbutton} onClick={modifyNotice}>수정완료</button>
                        <button className={styles.goldbutton} onClick={cancelModify}>수정취소</button>
                        </> )
                        :(<>
                        <button className={styles.goldbutton} onClick={modifyHandler}>수정하기</button>
                        <button className={styles.goldbutton} onClick={modalHandler}>삭제하기</button>
                        </>)
                    }
                </div>
            </div>
        </div>
        {
            modalOpen &&
            <div className={styles.modalBackground}>

                <div className={styles.modalContainer}>
                    <h3>공지사항을 삭제하시겠습니까?</h3>
                    <br></br>
                    <div className={styles.buttonDiv}>
                        <button className={styles.modalbutton} onClick={deleteNotice}>확인</button>
                        <button className={styles.modalbutton} onClick={modalHandler}>취소</button>
                    </div>
                </div>
            </div>
            
        }
        </>
    )
}
 
export default AdminNotice;