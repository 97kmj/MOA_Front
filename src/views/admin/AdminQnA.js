import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminQnA.module.css";
import {useState, useEffect} from "react";
import axios from "axios";
import {url} from "../../config.js"
import { tokenAtom } from "../../atoms.js";
import { useAtomValue } from "jotai";
const AdminQnA = () => {
    const token = useAtomValue(tokenAtom);
    const [notAnswerQuestions,setNotAnswerQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]); 
    const [searchPeriod, setSearchPeriod] = useState({startDate:'',endDate:''}); // 답변완료질문 기간 범위 
    const [selectedQuestion,setSelectedQuestion] = useState(null); // 선택한 qna
    const [isAnswered,setIsAnswered] = useState(false);

    const handleDateChange = (e) => {
        setSearchPeriod({...searchPeriod,[e.target.name]:e.target.value});
    };

    useEffect(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        setSearchPeriod({
            startDate: thirtyDaysAgo.toISOString().slice(0, 10), // 30일 전 날짜
            endDate: today.toISOString().slice(0, 10) // 오늘 날짜
        });
    }, []);
    
    // searchPeriod 상태가 업데이트된 후에 실행
    useEffect(() => {
        if (searchPeriod.startDate && searchPeriod.endDate) {
            console.log(searchPeriod); // 상태 업데이트 후 확인
            axios.get(`${url}/adminQnA`, {
                params: {
                    startDate: searchPeriod.startDate,
                    endDate: searchPeriod.endDate,
                },
                headers: {
                    Authorization: token
                },
            })
                .then(res => {
                    setNotAnswerQuestions(res.data.notAnswerQuestions);
                    setAnsweredQuestions(res.data.answeredQuestions);
                    
                })
                .catch(err => {
                    console.log(err);
                });
            }
    }, [searchPeriod]); // searchPeriod가 변경될 때 실행
    //답변완료 후 실행
    useEffect(()=> {
        if (notAnswerQuestions.length>0) {
            setSelectedQuestion(notAnswerQuestions[0]);
        }
    },[notAnswerQuestions]) //notAnswerQuestions가 변경될 때 실행


    const selectQuestion = (question) => () => {
       setSelectedQuestion(question);
       const answered = answeredQuestions.some((q) => q.questionId === question.questionId);
       setIsAnswered(answered);
       console.log(selectedQuestion);
    }

    const edit = (e) => {
        setSelectedQuestion({...selectedQuestion,[e.target.name]:e.target.value})
    }

    const writeAnswer = () => {
        const answer = {...selectedQuestion,answerStatus:true,answerAt:new Date()}
        axios.post(`${url}/writeAnswer`,answer , {
            headers : {
                Authorization : token
            }
        })
            .then(res => {
                if(res.data===true) {
                    alert("답변이 완료되었습니다.")
                    // 목록 새로 불러오기
                    axios.get(`${url}/adminQnA`, {
                        params: {
                            startDate: searchPeriod.startDate,
                            endDate: searchPeriod.endDate
                        },headers: {
                            Authorization: token
                        },
                    })
                    .then(response => {
                        setNotAnswerQuestions(response.data.notAnswerQuestions);
                        setAnsweredQuestions(response.data.answeredQuestions);
                    })
                    .catch(err => {
                        console.error("목록 갱신 오류:", err);
                    });
                } else {
                    alert("답변 오류")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.questionList}>
                <h4>답변 완료한 문의</h4>
                <hr className={styles.bar}/>
                <div className={styles.dateSelect}>
                      <span style={{fontSize:"14px"}}>답변일자</span> &nbsp;<input type="date" name="startDate" value={searchPeriod.startDate} onChange={handleDateChange}/>
                      &nbsp;~ &nbsp; 
                      <input type="date" name="endDate" value={searchPeriod.endDate} onChange={handleDateChange}/>
                  </div>
                <hr className={styles.bar}/>
                <table>
                    <tbody>
                    {
                        answeredQuestions.length > 0 ? (
                        answeredQuestions.map((question) => (
                                <tr key={question.questionId}
                                className={`${question.questionId === selectedQuestion?.questionId ? styles.selected : ""}`}
                                >
                                    <td className={styles.title} onClick={selectQuestion(question)}>{question.title}</td>
                                    <td className={styles.date}>{new Date(question.answerAt).toISOString().slice(0, 10)}</td>
                                </tr>
                            ))
                        ) : (
                            <div className={styles.noQuestion}>
                                등록된 문의가 없습니다.

                            </div>
                            
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
                            notAnswerQuestions.map((question) => (
                                <tr key={question.questionId} 
                                className={`${question.questionId === selectedQuestion?.questionId ? styles.selected : ""}`}
                                >
                                    <td className={styles.title} onClick={selectQuestion(question)}>{question.title}</td>
                                    <td className={styles.date}>{new Date(question.questionAt).toISOString().slice(0, 10)}</td>
                                </tr>
                            ))
                        ) : (
                            <div className={styles.noQuestion}>
                                등록된 문의가 없습니다.
                            </div>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className={styles.questionDetail}>
                <h4>문의 상세</h4>
                <div className={styles.detailTitle}>제목</div><input readOnly value={selectedQuestion?.title} />
                <div className={styles.detailContent}>내용</div>
                <textarea readOnly value={selectedQuestion && selectedQuestion?.content}></textarea>
                <h4>{!isAnswered ? "답변 작성" : "답변 내용"}</h4>

                <div className={styles.detailTitle}>제목</div><input readOnly={isAnswered} name="answerTitle" onChange={edit} value={selectedQuestion?.answerTitle || ''} />
                <div className={styles.detailContent}>내용</div>
                <textarea readOnly={isAnswered} name="answerContent" onChange={edit} value={selectedQuestion?.answerContent || ''}></textarea>
                {
                    !isAnswered &&
                    <div className={styles.buttonDiv}>
                        <button className={styles.goldbutton} onClick={writeAnswer}>답변하기</button>
                    </div>
                }
            </div>
        </div>
        </>
        
    )
}
 
export default AdminQnA;