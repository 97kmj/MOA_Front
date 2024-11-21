import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminQnA.module.css";
import {useState, useEffect} from "react";
import axios from "axios";

const AdminQnA = () => {
    const [notAnswerQuestions,setNotAnswerQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/adminQnA")
            .then(res => {
                console.log(res.data)
                setNotAnswerQuestions(res.data.notAnswerQuestions);
                setAnsweredQuestions(res.data.answeredQuestions);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    return(
        
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.questionList}>
                <h4>답변 완료한 문의</h4>
                <hr className={styles.bar}/>
                <table>
                    <tbody>
                    {
    answeredQuestions.length > 0 ? (
        answeredQuestions.map((question) => (
            <tr key={question.questionId}>
                <td className={styles.title}>{question.title}</td>
                <td className={styles.date}>{new Date(question.questionAt).toISOString().slice(0, 10)}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={2}>등록된 문의가 없습니다</td>
        </tr>
    )
}
                    </tbody>
                </table>
            </div>
            <div className={styles.questionList}>
                <h4>답변 대기중 문의</h4>
                <hr className={styles.bar}/>
                <table>
                    <tbody>
                    {
                        notAnswerQuestions.length > 0 ? (
                            notAnswerQuestions.map((question) => {
                                
                                <tr key={question.questionId}>
                                <td className={styles.title}>{question.title}</td>
                                <td className={styles.date}>{new Date(question.questionAt).toISOString().slice(0, 10)}</td>
                                </tr>
                                
                            })
                        ) : (
                            <tr>
                            <td colSpan={2}>등록된 문의가 없습니다</td>
                            </tr>
                        )
                    }
                    
                    
                    </tbody>
                </table>
            </div>
            <div className={styles.questionDetail}>
                <h4>문의 상세</h4>
                <div className={styles.detailTitle}>제목</div><input   readOnly />
                <div className={styles.detailContent}>내용</div>
                <textarea></textarea>
                <h4>답변 작성</h4>
                <div className={styles.detailTitle}>제목</div><input   readOnly />
                <div className={styles.detailContent}>내용</div>
                <textarea></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>답변하기</button>
                </div>
            </div>
        </div>
        </>
        
    )
}
 
export default AdminQnA;