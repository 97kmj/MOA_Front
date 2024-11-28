import styles from '../../css/shop/SaleDetail.module.css';
import { Table, Label, Input} from 'reactstrap';
import { useEffect, useState } from 'react';
import Header from "../Header";
import { useNavigate, useParams } from 'react-router';
import { url } from "../../config";

const framePrices = {
    none: 0,
    basic: 100000,
    premium: 200000
};

const framename={
    none: "프레임 없음",
    basic: "기본 프레임",
    premium: "고급 프레임"
}

const SaleDetail = () => {
    
    const navigate = useNavigate();
    const {artworkId} = useParams(); // URL에서 id 가져오기
    const [saleDetail, setSaleDetail] = useState(null); //작품 데이터 저장
    
    const [modalOpen,setModalOpen] = useState(false);
    const [selectedFrame, setSelectedFrame] = useState('basic');
    const [selectedFrameButton, setSelectedFrameButton] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const [isLiked, setIsLiked] = useState(false);
    // 좋아요 처리 

    const handleLikeButtonClick = () => {
        
        // axios.get(`${url}/shop/LikeCount`)
        // .then(res=>{
        //     setIsLiked(res.data);
        // })
        // .catch(error => {

        // })

        setIsLiked((prev) => !prev); // 좋아요 상태 토글

      };
    
    //작품 데이터 가져오기
    useEffect(() =>{
        const getSaleDetail = async () => {
            try{
                const response = await fetch(`${url}/api/artworks/${artworkId}`)
                const artworkData = await response.json(); 
                setSaleDetail(artworkData);
                console.log(saleDetail);
                setIsLoading(false); // 로딩 완료
            } catch(error){
                console.error("Failed to fetch artwork:", error);
                alert("판매 정보를 불러오는데 실패했습니다.");
                setIsLoading(false); // 로딩 완료
            }
        };
        getSaleDetail();
    }, [artworkId]);
    
    if (!saleDetail) {
        return <div>Loading...</div>; // You can customize this loading state as needed
    }

    const goShoppingCart = (artworkId) =>{
        navigate(`/shop/shoppingCart/${artworkId}`)
    }

    const goOrder = (artworkId) => {
        navigate(`/shop/SaleOrder/${artworkId}`)
    }
    const goArtist = (artistId) => {
        navigate(`/artistDetail/${artistId}`)
    }

    // 모달 추천프레임
     
    const showModal = () => {
        
        setModalOpen(true);
    }
    const closeModal = () => {
        
        setModalOpen(false);
    }

    // 추천프레임
    // State to keep track of the selected frame index
    
    // List of frame images
    const frameImages = ['/img/frame1.png','/img/frame2.png'];


    const frameClasses=[styles.frameArtwork1, styles.frameArtwork2];


    // Function to handle left button click (move left)
    const handleLeftClick = () => {
        setSelectedFrameButton(prev => (prev === 0 ? frameImages.length - 1 : prev - 1));
    };

    // Function to handle right button click (move right)
    const handleRightClick = () => {
        setSelectedFrameButton(prev => (prev === frameImages.length - 1 ? 0 : prev + 1));
    };




    const basePrice = saleDetail?.price || 0;

    const totalPrice = basePrice + framePrices[selectedFrame];



    return (
        <>
            <Header/>
            <div className={styles.container}>
                <p className={styles.titlename}><b>판매상세</b></p>
                <div className={styles.bar}></div>
                <div className={styles.detailTop}>
                    <div className={styles.detailTopLeft}>
                        <img src={saleDetail.imageUrl} alt="Artwork Image" className={styles.detailTopLeftImg}/>
                    </div>
                    <div className={styles.detailTopRight}>
                        <div className={styles.detailTopRightArtworkName}>
                            <b>{saleDetail.title}</b>
                        </div>
                        <br />
                        <Table borderless className={styles.detailTopRightTable}>
                            <tbody className={styles.detailtitlearrayLeft}>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label><b>ARTIST</b></Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label><b>SIZE</b></Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label><b>TYPE</b></Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label><b>SUBJECT</b></Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label><b>PRICE</b></Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label><b>STOCK</b></Label></td>
                                </tr>
                                <tr className={styles.detailTopRightOption}>
                                    <td><Label><b>OPTION</b></Label></td>
                                    
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.buttonDarkStyle} onClick={()=> goShoppingCart(saleDetail.artworkId)}><b>ADD TO CART</b></div>
                                    </td>
                                    <td>
                                        <div className={styles.buttonDarkStyle2} onClick={()=> goOrder(saleDetail.artworkId)}><b>결제하기</b></div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody className={styles.detailtitlearray}>
                              
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.artist?.name || 'Unknown Artist'}</Label></td> 
                                    <td className={styles.artistMoveButton} onClick={()=> goArtist(saleDetail.artist.username)}>작가상세</td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.width}X{saleDetail.height}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.type.typeName}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.subject.subjectName}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{new Intl.NumberFormat().format(basePrice)}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.stock}</Label></td>
                                </tr>
                                <tr>
                                    <Input
                                        className={styles.detailtitlearraFrame}
                                        type="select"
                                        value={selectedFrame}
                                        onChange={(e) => setSelectedFrame(e.target.value)}>
                                    
                                        <option value="none">선택없음 +0</option>
                                        <option value="basic">기본 프레임 +100000</option>
                                        <option value="premium">고급 프레임 +200000</option>
                                    </Input> &nbsp;&nbsp;&nbsp;
                                    <td className={styles.alignCenter}>
                                        <button className={styles.frameButton} onClick={showModal}>추천프레임</button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>
                
                </div>

            
                <div className={styles.topmiddle}>
                    <div className={styles.leftgoldheart} onClick={handleLikeButtonClick}>
                        <div className={styles.likedposition}>
                            <img
                                src={isLiked ? "/img/heart.svg" : "/img/goldheart.png"}
                                alt="좋아요"
                                className={styles.likeIcon}
                           
                            />
                            <div className={styles.likedcount}>
                                {saleDetail.likeCount}
                            </div>
                        </div>
                    </div>
                    <Table className={styles.totalprice}>
                        <tbody className={styles.totalpricetbody}>
                            <tr>
                                <td className={styles.totalpriceleft}><Label>{saleDetail.title}</Label></td>
                            </tr>
                            <tr>
                                <td className={styles.totalpriceleft}> {framename[selectedFrame]} </td>
                            </tr>
                            <tr>
                                <td className={styles.totalpriceright} >총 금액 </td>
                            </tr>
                        </tbody>
                        <tbody className={styles.totalpricetbody2}>
                            <tr>
                                <td className={styles.totalpriceleft2}>{new Intl.NumberFormat().format(basePrice)}</td>
                            </tr>
                            <tr>
                                <td className={styles.totalpriceleft2}>+{new Intl.NumberFormat().format(framePrices[selectedFrame])}</td>
                            </tr>
                            <tr>
                                <td className={styles.totalpriceright2}>{new Intl.NumberFormat().format(totalPrice)}</td> &nbsp;&nbsp;&nbsp;
                            </tr>
                        </tbody>     
                    </Table>
                </div>
                <br/>
                <br/>
                <div className={styles.bar}></div>
 
                <br/>
                <div className={styles.detailmiddle}>
                    <img src={saleDetail.imageUrl} className={styles.detailmiddleimg}/>
                </div>

                <div className={styles.artworkInfo}>
                    <Table className={styles.artworkInfoTable}>
                        <tbody>
                            <tr >
                                <td className={styles.artworkInfotitle}>Art’s Description</td>
                                <td className={styles.artworkInfotitleNone}></td>
                                <td className={styles.artworkInfotitleNone}></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className={styles.artworkInfocontent}>{saleDetail.description} </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className={styles.artworkInfo2}>
                    <Table className={styles.artworkInfoTable}>
                        <tbody>
                            <tr >
                                <td className={styles.artworkInfotitle}>Anprtist’s Information</td>
                                <td className={styles.artworkInfotitleNone}></td>
                                <td className={styles.artworkInfotitleNone}></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className={styles.artworkInfocontent}>
                                    { saleDetail.artist.artistNote}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

            </div>
            {
            modalOpen && (
            <div className={styles.modalBackground}>
                <div className={styles.modalposition}>
                    <div className={styles.modalpositionTop}>
                        <h3 className>추천프레임</h3>
                        <button onClick={closeModal}><img src='https://img.icons8.com/?size=15&id=71200&format=png&color=B39C49'/></button>
                    </div>
                    <div className={styles.framebar}/>
                       <div className={styles.modalpositionMiddle}>
                            <div className={styles.frameMoveButtonSetting}>
                                <img
                                src='/img/LEFT.PNG'
                                className={styles.frameMoveButton}
                                onClick={handleLeftClick}
                                alt="Move Left"
                                />
                            </div>
                
                        {/* Image frame selection */}
                            <div className={styles.recommendFrametile}>
                                <img
                                src={saleDetail.imageUrl} 
                                className={frameClasses[selectedFrameButton]}
                                alt="Artwork"
                                />
                            </div>
            
                            <div className={styles.frameMoveButtonSetting}>
                                <img
                                src='/img/RIGHT.PNG'
                                className={styles.frameMoveButton}
                                onClick={handleRightClick}
                                alt="Move Right"
                                />
                            </div>
                        </div>

                        <div className={styles.framebar}/>

                        <div className={styles.FrameSlideView}>
                            {frameImages.map((imgSrc, index) => (
                                <div key={index}>
                                <img
                                    src={imgSrc}
                                    className={styles.frameImgSetting}
                                    alt={`Frame ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>


                </div>

        )}

        </>
    );
}

export default SaleDetail;