import Header from "../Header";
import styles from "../../css/user/ArtistDetail.module.css"
import { userAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import { useState,useEffect } from "react";
import { useLocation } from "react-router";
import { url } from "../../config";
import axios from "axios";
const ArtistDetail = () => {
    const user = useAtomValue(userAtom);
    const [artist,setArtist] = useState({});
    const [isArtistNote, setIsArtistNote] = useState(true);
    const [artworks, setArtworks] = useState([]); // 작품 리스트
    const [artworkType, setArtworkType] = useState("NOT_SALE"); // 현재 작품 타입 (온라인 갤러리)
    const [modalOpen,setModalOpen] = useState(false);
    const location = useLocation();
    const artistId = location.state?.artistId;
    
    const artistInfoToggle = (e) => {
        if(e.target.dataset.name==='note') {
            setIsArtistNote(true)
        } else {
            setIsArtistNote(false)
        }
    }
    useEffect(()=> {
        axios.post(`${url}/artistDetail/${artistId}`)
        .then(res => {
            console.log(res.data)
            setArtist(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const handleArtworkTypeChange = (e) => {
        setArtworkType(e.target.dataset.name); // 클릭한 버튼의 `data-name` 값으로 상태 변경
    };

    useEffect(()=> {
        if(!artistId) return;
        axios.get(`${url}/artistArtworks`,{params : {artistId,artworkType}})
            .then(res=> {
                setArtworks(res.data);
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err);
            });
    },[artistId,artworkType])

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
                        <img className={styles.artistImg} src={artist?.profileImage}/>
                    </div>
                    <div><b>홍길동</b> &nbsp;<button className={styles.messagebutton} onClick={showModal}>쪽지 보내기</button></div>
                    <div className={styles.likecount}>
                        <img src="/img/heart.svg" />&nbsp;&nbsp;&nbsp;{artist?.likeCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/?size=40&id=5215&format=png&color=B39C59"/>&nbsp;&nbsp;&nbsp;{artist?.totalArtworkCount}
                    </div>
                </div>
                <div className={styles.infoRightBox}>
                    <div className={styles.toggle}>
                        <div className={isArtistNote ? styles.selected : styles.notSelected} data-name="note" onClick={artistInfoToggle}>작가노트</div>
                        <div className={!isArtistNote ? styles.selected : styles.notSelected} data-name="career" onClick={artistInfoToggle}>작가이력</div>    
                    </div>
                    <textarea readOnly value={isArtistNote ? artist.artistNote : artist.artistCareer}></textarea>
                </div>
            </div>
            <div className={styles.artworktoggle}>
                    <div className={artworkType === "NOT_SALE" ? styles.typeSelected : styles.typeNotSelected} data-name="NOT_SALE" onClick={handleArtworkTypeChange}>온라인 갤러리</div>
                    <div className={artworkType === "AVAILABLE" ? styles.typeSelected : styles.typeNotSelected} data-name="AVAILABLE" onClick={handleArtworkTypeChange}>판매중인 작품</div>    
                    <div className={artworkType === "SOLD_OUT" ? styles.typeSelected : styles.typeNotSelected} data-name="SOLD_OUT" onClick={handleArtworkTypeChange}>판매완료 작품</div>    
            </div>
            <div className={styles.artworkList}>
                {
                    artworks.length > 0 ? (
                        artworks.map((artwork)=> (
                            <article>
                                <div className={styles.artwork}>
                                    <img className={styles.artImg} src={artwork.imageUrl} alt=''/>
                                </div>
                                <div className={styles.artworkInfo}>        
                                    <span className={styles.artworkTitle}>{artwork.title}</span><img src="/img/heart.svg" />
                                </div>
                            </article>
                        ))
                    ) : (
                        <>
                        <br/>
                        <div style={{fontSize:"large",textAlign:"center",width:"100%",color:"#B39C59"}}>해당하는 작품이 없습니다.</div>
                        </>
                    )
                }


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