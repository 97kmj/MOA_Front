import Header from "../Header";
import SideNav from "./SideNav";
import styles from "../../css/mypage/MyQnA.module.css";
const MyQnA = () => {
    const questionList = [
        { id: 1, sender: "르브론", content: "안녕하세요, 좋은 하루 되세요!", date: "24/08/07" },
        { id: 2, sender: "제임스", content: "다음 주 미팅 준비 부탁드립니다.", date: "24/08/07" },
        // ... 추가 항목
    ];
    return(
        <>
        <Header/>
        <div className={styles.container}>
            <SideNav/>
            <div className={styles.qnabody}>
                <h3>1대1 문의내역</h3>
                <div className={styles.buttonTabs}>
                    <button className={styles.goldbutton}>답변 대기중</button>
                    <button className={styles.whitebutton}>답변 완료</button>
                </div>  
                <hr className={styles.bar}></hr>

                <div className={styles.questionList}>
                        {questionList.map((message) => (
                            <div key={message.id} className={styles.question}>
                                <div className={styles.messageItemDetails}>
                                    <span>{message.content}</span>
                                    <span className={styles.messageDate}>{message.date}</span>
                                </div>
                            </div>
                        ))}
                </div>

                
                    {/* Pagination */}
                    <div className={styles.messagePagination}>
                        <button>&lt;</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&gt;</button>
                    </div>  
            </div>
        </div>
        </>
    )
}

export default MyQnA;