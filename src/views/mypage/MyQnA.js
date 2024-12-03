import Header from "../Header";
import SideNav from "./SideNav";
import styles from "../../css/mypage/MyQnA.module.css";
import { userAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { url } from "../../config";
import { useState,useEffect } from "react";
const MyQnA = () => {

    const user = useAtomValue(userAtom);
    const [questionList,setQuestionList] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(()=>{
        axios.get(`${url}/myQnA`,{ params: 
            { username:user.username,
                isAnswered,
                page : currentPage,
                size : pageSize 
            }})
        .then(res=> {
            console.log(res.data);
            setQuestionList(res.data.content)
            setTotalPages(res.data.totalPages);
        })
        .catch(err=> {
            console.error(err);
            alert("데이터를 가져오는 데 실패했습니다.");
        })
    },[user,isAnswered,currentPage,pageSize])
    const answered = () => {
        setIsAnswered(true);
    }

    const notAnswered = () => {
        setIsAnswered(false)
    }
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };


    return(
        <>
        <Header/>
        <div className={styles.container}>
            <SideNav/>
            <div className={styles.qnabody}>
                <h3>1대1 문의내역</h3>
                <div className={styles.buttonTabs}>
                    <button className={`${!isAnswered ? styles.goldbutton : styles.whitebutton}`} onClick={notAnswered}>답변 대기중</button>
                    <button className={`${isAnswered ? styles.goldbutton : styles.whitebutton}`} onClick={answered}>답변 완료</button>
                </div>  
                <hr className={styles.bar}></hr>

                <div className={styles.questionList}>
                        {
                            questionList.length > 0 ? (

                            questionList.map((question) => (
                                <div key={question.id} className={styles.question}>
                                    <div className={styles.messageItemDetails}>
                                        <span>{question.title}</span>
                                        <span className={styles.messageDate}>{new Date(question.questionAt).toISOString().slice(0,10)}</span>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <>
                                <br/>
                                <div style={{textAlign:"center"}}>문의가 없습니다.</div>
                                </>
                                
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
        </>
    )
}

export default MyQnA;