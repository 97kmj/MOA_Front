import styles from '../../css/user/notice.module.css';
const Notice = () => {
    const showNotice = (e) => {
        console.log(e.target.nextElementSibling)
        
        e.target.nextElementSibling.style.display='block';
    }
    return(
        <>
        <div className={styles.container}>
            <div className={styles.headerText}>
                <h2 align="center">공지사항</h2>
            </div><br/>
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
                <h2 className={styles.faq}>FAQ</h2><span style={{display:"inline-block", verticalAlign:"middles"}}><button className={styles.question}>1대1문의하기</button></span>
            </div><br/>
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
        </>
    )
}

export default Notice;