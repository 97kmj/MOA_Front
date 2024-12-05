import Header from "../Header";
import styles from "../../css/user/ArtistDetail.module.css"
import { userAtom,tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import { useState,useEffect } from "react";
import { useLocation } from "react-router";
import { url } from "../../config";
import axios from "axios";
const ArtistDetail = () => {
    const user = useAtomValue(userAtom);
    const token = useAtomValue(tokenAtom);
    const [artist,setArtist] = useState({});
    const [isArtistNote, setIsArtistNote] = useState(true);
    const [artworks, setArtworks] = useState([]); // 작품 리스트
    const [artworkType, setArtworkType] = useState("NOT_SALE"); // 현재 작품 타입 (온라인 갤러리)
    const [modalOpen,setModalOpen] = useState(false);
    const [isArtistLiked,setIsArtistLiked] = useState(false);
    const [message,setMessage] = useState({title:'',content:'',artistId:'',username:''})
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
            setArtist(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    useEffect(()=>{
        if(!artistId || !user.username) return;
        axios.get(`${url}/existsLikeArtist`,{params:{artistId:artistId,username:user.username} , headers : {
            Authorization : token
        }})
        .then(res=> {
            console.log(res.data);
            setIsArtistLiked(res.data)
        })
        .catch(err=> {
            console.log(err);
        })
    },[artistId,user])

    const handleArtworkTypeChange = (e) => {
        setArtworkType(e.target.dataset.name); // 클릭한 버튼의 `data-name` 값으로 상태 변경
    };
    //작가 좋아요
    const handleLikeArtistButton = () => {
        if(!user.username) {
            alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
            return;
        } 
        axios.get(`${url}/likeArtist`,{params:{artistId:artistId,username:user.username}, headers : {
            Authorization : token
        }})
            .then(res=>{
                setIsArtistLiked(res.data);
                // 좋아요 상태에 따라 likeCount 업데이트
                setArtist((prevArtist) => ({
                    ...prevArtist,
                    likeCount: res.data 
                        ? prevArtist.likeCount + 1 // 좋아요 추가
                        : prevArtist.likeCount - 1 // 좋아요 취소
                }));
            })
            .catch(err=> {
                console.log(err);
            })
    }
    //작품 목록 가져오기 
    useEffect(()=> {
        if (!artistId) return; // artistId이 있어야 요청 가능
        axios.get(`${url}/artistArtworks`,{params : {artistId,artworkType, username:user.username}})
            .then(res=> {
                setArtworks(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
    },[artistId,artworkType])
    //작품 좋아요
    const handleLikeArtworkButton = (artworkId) => {
        if (!user.username) {
            alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
            return;
        }

        axios.get(`${url}/likeArtwork`, { params: { artworkId, username: user.username }, headers : {Authorization : token} })
            .then((res) => {
                const updatedArtworks = artworks.map((artwork) =>
                    artwork.artworkId === artworkId
                        ? { ...artwork, isLiked: res.data } // 서버 응답에 따라 isLiked 업데이트
                        : artwork
                );
                setArtworks(updatedArtworks); // 상태 업데이트
               
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const showModal = () => {
        if(!user.username) {
            alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
            return;
        }
        setModalOpen(true);
        
    };
    const closeModal = () => {
        setModalOpen(false);
    }
    const editMessage = (e) => {
        setMessage({...message,[e.target.name]:e.target.value})
    }

    //작가에게 쪽지 보내기
    const sendMessage = () => {
        if(!message.title || !message.content) {
            alert("제목과 내용을 모두 입력하세요.");
            return;
        } 
        setMessage({...message, artistId:artistId, username:user.username });
        axios.post(`${url}/sendMessage`,message , {headers : {Authorization : token}})
            .then(res=>{
                if(res.data===true) {
                    alert("작가님께 쪽지를 보냈습니다.")
                    setMessage({...message,title:'',content:''})
                    closeModal();
                } else {
                    alert("쪽지를 보내는 중 오류가 발생했습니다.")
                }
            })
            .catch(err=>{
                console.log(err)
            })
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
                    <div><b>{artist.name}</b> &nbsp;<button className={styles.messagebutton} onClick={showModal}>쪽지 보내기</button></div>
                    <div className={styles.likecount}>
                        {/* 좋아요 버튼 */}
                        <img
                        src={isArtistLiked ? "/img/heart.svg" : "/img/goldheart.png"}
                        alt="좋아요"
                        className={styles.likeIcon}
                        onClick={handleLikeArtistButton}
                        />&nbsp;&nbsp;&nbsp;{artist?.likeCount}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.icons8.com/?size=40&id=5215&format=png&color=B39C59"/>&nbsp;&nbsp;&nbsp;{artist?.totalArtworkCount}
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
                                    <span className={styles.artworkTitle}>{artwork.title}</span>
                                    <img
                                        src={artwork.isLiked ? "/img/heart.svg" : "/img/goldheart.png"}
                                        alt="작품 좋아요"
                                        className={styles.likeIcon}
                                        onClick={() => handleLikeArtworkButton(artwork.artworkId)}
                                        />
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
                    <input name="title" value={message.title} onChange={editMessage}></input>
                    <br/>
                    <div>내용 </div>
                    <br/>
                    <textarea name="content" value={message.content} onChange={editMessage}></textarea>
                    <div className={styles.buttonDiv}>
                        <button className={styles.sendbutton} onClick={sendMessage}>쪽지보내기</button>
                    </div>
                </div>
            </div>
            
        }

        </>
    )
}

export default ArtistDetail;