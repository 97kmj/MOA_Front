import Header from "../Header";
import styles from "../../css/user/ArtistDetail.module.css"
import { useState } from "react";
const ArtistDetail = () => {
    const [modalOpen,setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
        
    };
    const closeModal = () => {
        setModalOpen(false);
    }
    
    return(        
        <>
        <Header/>
        <div className={styles.container}>
            <h3>작가 정보</h3>
            <hr className={styles.bar}></hr>
            <div className={styles.artistInfo}>
                <div className={styles.infoLeftBox}>
                    <div className={styles.artistImgBox}>
                        <img className={styles.artistImg}/>
                    </div>
                    <div><b>홍길동</b> &nbsp;<button className={styles.messagebutton} onClick={showModal}>쪽지 보내기</button></div>
                    <div className={styles.likecount}>
                        <img src="/img/heart.svg" />&nbsp;&nbsp;&nbsp;222&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/?size=40&id=5215&format=png&color=B39C59"/>&nbsp;&nbsp;&nbsp;44&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://img.icons8.com/?size=40&id=15892&format=png&color=B39C49"/>&nbsp;&nbsp;&nbsp;11
                    </div>
                </div>
                <div className={styles.infoRightBox}>
                    <div className={styles.toggle}>
                        <div className={styles.note}>작가노트</div>
                        <div className={styles.career}>작가이력</div>    
                    </div>
                    <textarea readOnly></textarea>
                </div>
            </div>
            <div className={styles.artworktoggle}>
                    <div className={styles.gallery}>온라인 갤러리</div>
                    <div className={styles.sale}>판매중인 작품</div>    
                    <div className={styles.soldout}>판매완료 작품</div>    
            </div>
            <div className={styles.artworkList}>
                <article>
                    <div className={styles.artwork}>
                        <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                    </div>
                    <div className={styles.artworkInfo}>        
                        <span className={styles.artworkTitle}>암실 기획전</span><img src="/img/heart.svg" />
                    </div>
                </article>
                
                <article>
                    <div className={styles.artwork}>
                        <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                    </div>
                    <div className={styles.artworkInfo}>        
                        <span className={styles.artworkTitle}>별이 빛나는 밤</span><img src="/img/heart.svg" />
                    </div>
                </article>
                <article>
                    <div className={styles.artwork}>
                        <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                    </div>
                    <div className={styles.artworkInfo}>        
                        <span className={styles.artworkTitle}>별이 빛나는 밤</span><img src="/img/heart.svg" />
                    </div>
                </article>

            </div>
        </div>
        {
            modalOpen &&
            <div className={styles.modalBackground}>

                <div className={styles.modalContainer}>
                    <button className={styles.close} onClick={closeModal}><img src='https://img.icons8.com/?size=15&id=71200&format=png&color=B39C49'/></button>
                    <h3>작가에게 쪽지보내기</h3>
                    <div>제목</div>
                    <input></input>
                    <br/>
                    <div>내용 </div>
                    <br/>
                    <textarea></textarea>
                    <div className={styles.buttonDiv}>
                        <button className={styles.sendbutton}>쪽지보내기</button>
                    </div>
                </div>
            </div>
            
        }

        </>
    )
}

export default ArtistDetail;