import { useState,useEffect } from 'react';
import styles from '../../css/user/Notice.module.css';
import Header from '../Header';
import axios from 'axios';
const Notice = () => {
    const [modalOpen,setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
        
    };
    const closeModal = () => {
        setModalOpen(false);
    }
    



    const showNotice = (e) => {
        console.log(e.target.nextElementSibling)
        e.target.nextElementSibling.style.display='block';
    }
    return(
        <>
        <Header/>
        <div className={styles.container}>
            <h3 align="center">공지사항</h3>
            <hr className={styles.bar}></hr>
            <br/>
            <div className={styles.noticeList}>
                <ul>
                    <li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
<li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
<li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
<li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
                </ul>
            </div>
            <div className={styles.more}><img src='/img/Vector.png' alt=''/></div>
            <br/>
            <div className={styles.headerText}>
                <h3 className={styles.faq}>FAQ</h3><span className={styles.questionbox}><button className={styles.question} onClick={showModal}>1대1 문의하기</button></span>
            </div>
            <hr className={styles.bar}></hr>
            <br/>
            <div className={styles.noticeList}>
                <ul>
                    <li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
<li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
<li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
<li onClick={showNotice}><span className={styles.noticeTitle}>작가 등록 시 유의사항 안내</span><span className={styles.date}>2024-10-15</span></li>
                    <div className={styles.notice}>안녕하세요 모아입니다.
판매 작품 중 다른 사람의 작품을 카피한 사실 또는 본인의 것이 아닌 작품을 등록한 것이 적발될 시, 작가 승인이 취소됨을 알려드립니다. 
또한 이로 발생하는 모든 문제는 본인에게 있음을 알립니다.</div>
                </ul>
            </div>
        </div>
        {
            modalOpen &&
            <div className={styles.modalBackground}>

                <div className={styles.modalContainer}>
                    <button className={styles.close} onClick={closeModal}><img src='https://img.icons8.com/?size=15&id=71200&format=png&color=B39C49'/></button>
                    <h3>문의하기</h3>
                    <div>제목</div>
                    <input></input>
                    <br/>
                    <div>내용 </div>
                    <br/>
                    <textarea></textarea>
                    <div className={styles.buttonDiv}>
                        <button className={styles.goldbutton}>문의하기</button>
                    </div>
                </div>
            </div>
            
        }
        </>
    )
}

export default Notice;