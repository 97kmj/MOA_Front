import styles from '../../css/user/Main.module.css';
import Header from '../Header';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../config';

const Main = () => {
    const navigate = useNavigate();
    const [mainArtwork, setMainArtwork] = useState({});
    const [artworkList, setArtworkList] = useState([]);
    const [fundingList, setFundingList] = useState([]);

    useEffect(()=> {
        axios.get(`${url}/main`)
            .then(res => {
                console.log(res.data);
                const artworks = res.data.artworkList
                setMainArtwork(artworks.shift());
                setArtworkList(artworks);
                setFundingList(res.data.fundingList);
            })
            .catch(err=> {
                console.log(err);
            })
    },[])

    const toDetail =(saleStatus,artworkId) => {
        if(saleStatus==='NOT_SALE') {
            navigate(`/gallery/galleryDetail/${artworkId}`);
        } else {
            navigate(`/shop/saleDetail/${artworkId}`);
        }
    }

    const toFundingDetail = (fundingId) => {
        navigate(`/fundings/${fundingId}`)
    }

    return(
        <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.bannerleft} style={{fontSize:"50px",fontWeight:"bold"}}>
                    <span className={styles.white}>우리 모두의 예술</span><br/>
                    <span className={`${styles.gold} ${styles.italic}`}>MOA</span>
                </div>
                <div className={`${styles.bannerright} ${styles.white}`} style={{fontSize:"16px",fontWeight:"semibold"}}>
                    <span>모아에서 다양한 작품을 감상하고 소장하세요.</span><br/>
                    <span>펀딩으로 신진작가의 성장을 함께 지원하세요.</span>
                </div>
            </div>
            <h3>작품</h3>          
            <hr className={styles.bar}></hr>
            <br/>
            <div className = {styles.mainartwork}>
                    <img className={styles.mainArtImg} src={mainArtwork?.imageUrl} id={mainArtwork?.artworkId} onClick={()=>toDetail(mainArtwork?.saleStatus,mainArtwork?.artworkId)}/>

            </div><br/>


            <div className={styles.artworkbox}>
                {
                    artworkList.length > 0 && (
                        artworkList.map((artwork)=> 
                            <div className={styles.artwork}>
                            <img className={styles.artImg} src={artwork.imageUrl} id={artwork.artworkId} onClick={()=>toDetail(artwork.saleStatus,artwork.artworkId)}/>
                        </div>        
                        )
                    )
                }
            </div>
            <div className={styles.buttonDiv}>
                <button className={styles.goldbutton} onClick={()=>navigate("/gallery/gallery")}>Gallery</button>
                <button className={styles.goldbutton} onClick={()=>navigate("/shop/saleList")}>Shop</button>
            </div><br/>

            <h3>진행중인 펀딩</h3>
            <hr className={styles.bar}></hr>

            <br/>
            <div className={styles.fundingBox}>
                {
                    fundingList.length > 0 && (
                        fundingList.map(funding => {
                            const goalRatio = Math.round(funding.currentAmount / funding.goalAmount * 100); 
                            const endDate = new Date(funding.endDate);
                            const today = new Date();
                            const diffDate = Math.round((endDate.getTime() - today.getTime())/ (1000 * 60 * 60 * 24))

                            return(
                                <article>
                                <div className={styles.fundingImg}>
                                    <img id={funding.fundingId} src={funding.fundingMainImageUrl} onClick={()=>toFundingDetail(funding.fundingId)} alt=''/>
                                </div>
                                <div className={styles.fundingInfo}>        
                                    <div className={styles.fundingUsername}>{funding.fundingUserName}</div>
                                    <div className={styles.fundingTitle}>{funding.title}</div>
                                    <div className={styles.fundingAmount}><span className={styles.gold}>{goalRatio}% 달성</span>&nbsp;&nbsp;&nbsp;{funding.currentAmount.toLocaleString()}원<span style={{float:"right"}}>{diffDate}일 남음</span></div>
                                    <div className={styles.progressbar}>
                                        <span style={{width:`${goalRatio}%`}}></span>
                                    </div>
                                </div>
                            </article>
                            )
                        })
                    )
                }                
            </div>
            <div className={styles.buttonDiv}>
                <button className={styles.goldbutton} onClick={()=>navigate("/fundings")}>전체보기</button>
            </div><br/>
                
        </div>
                        
        </>            

        
    );
}

export default Main;