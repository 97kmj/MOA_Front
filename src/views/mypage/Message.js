import React, { useState,useEffect } from 'react';
import styles from '../../css/mypage/Message.module.css';
import Header from "../Header";
import SideNav from "./SideNav"; // SideNav 컴포넌트 추가
import { tokenAtom, userAtom } from '../../atoms';
import { useAtomValue, useAtom } from 'jotai';
import axios from 'axios';
import { url } from '../../config';


function Message() {
    const user = useAtomValue(userAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const [messageType, setMessageType] = useState("send") // 기본값 보낸 쪽지
    const [messageList, setMessageList] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [modalOpen,setModalOpen] = useState(false);
    const [reply, setReply] = useState('');
    useEffect(()=>{
        
        axios.get(`${url}/message`,{ params: 
            { username:user.username,
                messageType : messageType,
                page : currentPage,
                size : pageSize 
            }, headers : {
                Authorization: token
            }})
        .then(res=> {
            if(res.headers.authorization!==null && res.headers.authorization!==undefined) { //갱신받은 토큰이 있을 시
                setToken(res.headers.authorization)
            }
            setMessageList(res.data.content);
            setTotalPages(res.data.totalPages);
        })
        .catch(err=> {
            console.error(err);
            alert("데이터를 가져오는 데 실패했습니다.");
        })
    },[messageType, currentPage, pageSize])

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleMessageType = (e) => {
        setCurrentPage(0);
        setMessageType(e.target.name);
        console.log(e.target.name);
    }

    const showMessage = (message) => {
        setSelectedMessage(message);
        setModalOpen(true);
        if (messageType === 'notRead') {
            axios.patch(`${url}/message/${message.messageId}/read`,{},{headers:{Authorization:token}})
            .then(()=>{
                // 목록에서 해당 메시지 제거
                setMessageList((prev) => prev.filter((msg) => msg.messageId !== message.messageId));
            })
            .catch(err=> {
                console.error(err);
                alert("메시지 상태를 업데이트하지 못했습니다.");
            })
        }
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedMessage({});
        setReply('');
    }
    const editReply = (e) => {
        setReply(e.target.value);
    }
    const sendReply = () => {
        const replyMessage = {...selectedMessage, reply : reply}
        axios.post(`${url}/replyMessage`,replyMessage, {headers : {Authorization: token}})
            .then(res=> {
                if(res.status === 200) {
                    alert("답장을 성공적으로 보냈습니다.")
                    setSelectedMessage(replyMessage);
                } else {
                    alert("답장 보내는 중 오류가 발생했습니다.")   
                }
            })
            .catch(err=> {
                console.error(err);
            })
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                {/* Side Navigation */}
                <SideNav />

                {/* Main Content */}
                <div className={styles.messageContent}>
                    <h3>쪽지함</h3>
                    {/* Tabs */}
                    <div className={styles.buttonTabs}>
                                <>
                                <button name='send' className={`${messageType==="send" ? styles.goldbutton : styles.whitebutton}`} onClick={handleMessageType} >보낸 쪽지</button>
                                </>
                        {
                            user.role === "ARTIST" &&
                                <>
                                <button name='receive' className={`${messageType==="receive" ? styles.goldbutton : styles.whitebutton}`} onClick={handleMessageType}>받은 쪽지</button>
                                <button name='notRead' className={`${messageType==="notRead" ? styles.goldbutton : styles.whitebutton}`} onClick={handleMessageType}>읽지않은 쪽지</button>
                                </>
                        }
                    </div>  
                    <hr className={styles.bar}></hr>
                    {/* Message List */}
                    <div className={styles.messageList}>
                        { 
                            messageList?.length > 0 ? (
                                messageList.map((message) => (
                                <div key={message.messageId} className={styles.messageItem}>
                                <div className={styles.messageItemDetails}>
                                <span>제목&nbsp;&nbsp;:&nbsp;&nbsp;</span><span onClick={()=>showMessage(message)}>{message.title}</span> <br/>
                                <p>날짜&nbsp;&nbsp;:&nbsp;&nbsp; {new Date(message.createAt).toISOString().slice(0,10)}</p>
                                </div>
                                </div>
                            ))
                            ) : (
                                <div> 쪽지가 없습니다. </div>
                            )

                        }
                    </div>

                    <div className={styles.pagenationBox}>
                        {/* Pagination */}
                        <div className={styles.messagePagination}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >&lt;</button>
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePageChange(idx)}
                                    className={currentPage === idx ? styles.active : ""}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}
                            >&gt;</button>
                        </div>  
                    </div>
                </div>
            </div>
            {
                modalOpen &&
            <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <button className={styles.close} onClick={closeModal}><img src='https://img.icons8.com/?size=15&id=71200&format=png&color=B39C49'/></button>
                    <h3>쪽지 내용</h3>
                    <div>제목</div>
                    <input name="title" value={selectedMessage.title} readOnly></input>
                    <br/>
                    <div>내용</div>
                    <textarea name="content" value={selectedMessage.content} readOnly></textarea>
                    {
                        messageType === 'send' &&
                        (
                            selectedMessage.reply ?  (
                                <>
                                <div>답변 내용</div>
                                <textarea name="reply" value={selectedMessage.reply} readOnly></textarea>
                                </>
                            )
                            :(
                                <>
                            <div className={styles.noreply}>아직 답변이 없습니다.</div>
                            </>
                            )
                        )
                    }
                    {
                        (messageType === 'receive' || messageType === 'notRead') &&
                        (
                            selectedMessage.reply ?  (
                                <>
                                <h3>답변 내용</h3>
                                <textarea name="reply" value={selectedMessage.reply} readOnly></textarea>
                                </>
                            ) : (
                                <>
                                <h3>답변 작성하기</h3>
                                <textarea name="reply" value={reply} onChange={editReply}></textarea>
                                <div className={styles.buttonDiv}>
                                    <button className={styles.goldbutton} onClick={sendReply} >답변 보내기</button>
                                </div>
                                </>
                            )
                        )
                    }
                    
                </div>
            </div>
            }
        </>
    );
}

export default Message;
