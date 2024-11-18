import Header from "../../Header";
import styles from "../../../css/mypage/artist/artistEdit.module.css"

const ArtistEdit = () => {
    return(
        <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.body}>
                <h3>작가 정보 수정</h3>
                <div className={styles.registform}>
                    <h4 style={{textAlign:"left"}}>프로필 사진</h4>
                    <div className={styles.imgBox}>
                    </div><input type="file" />
                    <h4 style={{textAlign:"left"}}>작가 이력</h4>
                    <textarea></textarea>
                    <h4 style={{textAlign:"left"}}>작가 노트</h4>
                    <textarea></textarea>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton}>수정하기</button>
                </div>
                </div>
            </div>
            <div>
            </div>
        </div>

        </>
    )
}

export default ArtistEdit;