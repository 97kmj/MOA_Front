import { useState,useEffect } from 'react';
import styles from '../../css/user/Notice.module.css';
import Header from '../Header';
import axios from 'axios';
const Notice = () => {
    const [noticeList, setNoticeList] = useState([]);
    const [FAQList, setFAQList] = useState([]);
    const [selectedNoticeId, setSelectedNoticeId] = useState(null); // 선택된 공지사항 ID
    const [selectedFAQId, setSelectedFAQId] = useState(null); // 선택된 FAQ ID
    const [noticeCount, setNoticeCount] = useState(0);
    const [page,setPage] = useState(0);
    const [hasMore,setHasMore] = useState(true);
    const [username,setUsername] = useState('hong');
    const [question,setQuestion] = useState({username:'',title:'',content:''});
    useEffect(()=>{
        fetchInitialData();
    },[])
    const fetchInitialData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/notice?page=${page}&size=4`);
            const notices = res.data.noticeList;
            const faqList = res.data.faqList;
            const noticeCount = res.data.noticeTotalCount;
            setNoticeList(notices);
            setFAQList(faqList);
            setNoticeCount(noticeCount);
            if (notices.length >= noticeCount) {
                setHasMore(false); // 더 이상 데이터가 없을 경우 "더보기" 숨김
            }
        } catch (err) {
            console.log(err);
        }
    };
    const showNotice = (index) => () => {
        const noticeId = noticeList[index].noticeId;
        setSelectedNoticeId((prev) => (prev === noticeId ? null : noticeId)); // 같은 공지를 클릭하면 닫힘
    }
    const showAnswer = (index) => () => {
        const faqId = FAQList[index].faqId;
        setSelectedFAQId((prev) => (prev===faqId ? null : faqId));
    }

    const loadMoreNotices = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/notice?page=${page + 1}&size=4`);
            setNoticeList([...noticeList,...res.data.noticeList]);
            setPage(page+1);
            if (res.data.noticeList.length + noticeList.length>= noticeCount) {
                setHasMore(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const edit = (e) => {
        setQuestion({...question,[e.target.name]:e.target.value})
    }

    const sendQuestion = () => {
        setQuestion({...question, username:username});
        
        axios.post("http://localhost:8080/sendQuestion",question)
            .then(res => {
                if(res.data === true) {
                    alert("문의 완료");
                } else {
                    alert("문의 실패");
                }
                closeModal();
            })
            .catch(err => {
                console.log(err);
                closeModal();
            })
    }


    const [modalOpen,setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    // const showNotice = (e) => {
    //     console.log(e.target.nextElementSibling)
    //     e.target.nextElementSibling.style.display='block';
    // }

    return(
        <>
        <Header/>
        <div className={styles.container}>
            <h3 align="center">공지사항</h3>
            <hr className={styles.bar}></hr>
            
            <div className={styles.noticeList}>

                <ul>
                    {
                          noticeList.length > 0 ? (
                            noticeList.map((notice,index)=>(
                                <>
                                <li 
                                    key={notice.noticeId} 
                                    onClick={showNotice(index)}
                                    className={`${styles.noticeItem} ${
                                        notice.noticeId === selectedNoticeId ? styles.selected : ""
                                    }`}>
                                    <span className={styles.noticeTitle}>{notice.title}</span>
                                    <span className={styles.date}>{new Date(notice.createdAt).toISOString().slice(0, 10)}</span>        
                                </li>
                                {notice.noticeId === selectedNoticeId && (
                                        <div className={styles.noticeContent}>
                                            {notice.content}
                                        </div>
                                    )}
                                </>
                                ))
                            ) : (
                                <li>등록된 공지사항이 없습니다.</li>
                            )   
                    }
                </ul>
            </div>
                { hasMore && <>
                <div className={styles.buttonDiv}>
                <button className={styles.goldbutton} onClick={loadMoreNotices} >더보기</button>
                </div>
                </>}
            
            <div className={styles.headerText}>
                <h3 className={styles.faq}>FAQ</h3><span className={styles.questionbox}><button className={styles.question} onClick={showModal}>1대1 문의하기</button></span>
            </div>
            <hr className={styles.bar}></hr>
            
            <div className={styles.faqList}>
                <ul>
                    {
                          FAQList.length > 0 ? (
                            FAQList.map((faq,index)=>(
                                <>
                                <li 
                                    onClick={showAnswer(index)}
                                    className={`${styles.faqItem} ${
                                        faq.faqId === selectedFAQId ? styles.selected : ""
                                    }`}>
                                    <span className={styles.faqQuestion}>Q. &nbsp;{faq.question}</span>
                                </li>
                                { faq.faqId === selectedFAQId && (
                                    <div className={styles.faqAnswer}>A. &nbsp;{faq.answer}</div>
                                )}
                                </>
                                ))
                            ) : (
                                <li>등록된 FAQ가 없습니다.</li>
                            )   
                    }
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
                    <input name="title" value={question.title} onChange={edit}></input>
                    <br/>
                    <div>내용 </div>
                    <br/>
                    <textarea name="content" value={question.content} onChange={edit}> </textarea>
                    <div className={styles.buttonDiv}>
                        <button className={styles.goldbutton} onClick={sendQuestion}>문의하기</button>
                    </div>
                </div>
            </div>
            
        }
        </>
    )
}

export default Notice;