import styles from '../../css/shop/SaleDetail.module.css';
import { Table, Label, Input, Modal} from 'reactstrap';
import { useState } from 'react';
import Header from "../Header";
import { useNavigate } from 'react-router';




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

    const goDecommendFrame = (artworkId) =>{
        navigate(`/shop/recommendFrame/${artworkId}`);
    }

    const goShoppingCart = (artworkId) =>{
        navigate(`/shop/shoppingCart/${artworkId}`)
    }

    const goOrder = (artworkId) => {
        navigate(`/shop/SaleOrder/${artworkId}`)
    }
    const goArtist = (id) => {
        navigate(`/artistDetail/${id}`)
    }

    // 모달 추천프레임
     
    const [modalOpen,setModalOpen] = useState(false);
    const showModal = () => {
        
        setModalOpen(true);
    }
    const closeModal = () => {
        
        setModalOpen(false);
    }

    // 추천프레임
    // State to keep track of the selected frame index
    const [selectedFrameButton, setSelectedFrameButton] = useState(0);
    
    // List of frame images
    const frameImages = [
        '/img/frame1.png',
        '/img/frame2.png',
    ];


    const frameClasses=[
        styles.frameArtwork1,
        styles.frameArtwork2,
    ];


    // Function to handle left button click (move left)
    const handleLeftClick = () => {
        setSelectedFrameButton(prev => (prev === 0 ? frameImages.length - 1 : prev - 1));
    };

    // Function to handle right button click (move right)
    const handleRightClick = () => {
        setSelectedFrameButton(prev => (prev === frameImages.length - 1 ? 0 : prev + 1));
    };





    const artworkData = [
        { artworkId: 1, title: "투우", id: 3 ,artist: "피카소", price: 2200000,  description: "풍경화 수채화", image: "/img/logo192.png",
            width:1800, height:1800, type:"수채화",subject:"수묵화", stock:"1",artistNote:"아침해가 떴다"},

    ];


    const [selectedFrame, setSelectedFrame] = useState('basic');
    const basePrice = artworkData[0].price;

    const totalPrice = basePrice + framePrices[selectedFrame];



    return (
        <>
            <Header/>
            <div className={styles.container}>
                {artworkData && (
                <>
                <p className={styles.titlename}><b>판매상세</b></p>
                <div className={styles.bar}></div>
                <div className={styles.detailTop}>
                    <div className={styles.detailTopLeft}>
                        <img src='/img/sample1.webp' alt="Artwork Image" className={styles.detailTopLeftImg}/>
                    </div>
                    <div className={styles.detailTopRight}>
                        <div className={styles.detailTopRightArtworkName}>
                            <b>{artworkData[0].title}</b>
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
                                        <div className={styles.buttonDarkStyle} onClick={()=> goShoppingCart(artworkData[0].artworkId)}><b>ADD TO CART</b></div>
                                    </td>
                                    <td>
                                        <div className={styles.buttonDarkStyle2} onClick={()=> goOrder(artworkData[0].artworkId)}><b>결제하기</b></div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody className={styles.detailtitlearray}>
                              
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData[0].artist}</Label></td> 
                                    <td className={styles.artistMoveButton} onClick={()=> goArtist(artworkData[0].id)}>작가상세</td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData[0].width}X{artworkData[0].height}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData[0].type}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData[0].subject}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{new Intl.NumberFormat().format(basePrice)}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData[0].stock}</Label></td>
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
                    <div className={styles.leftgoldheart}>
                        <img src='/img/goldheart.png'/>
                    </div>
                    <Table className={styles.totalprice}>
                        <tbody className={styles.totalpricetbody}>
                            <tr>
                                <td className={styles.totalpriceleft}><Label>{artworkData[0].title}</Label></td>
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
                                <td className={styles.totalpriceleft2}>{new Intl.NumberFormat().format(artworkData[0].price)}</td>
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
                    <img src='/img/sample1.webp' className={styles.detailmiddleimg}/>
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
                                <td colSpan="3" className={styles.artworkInfocontent}>{artworkData.description} </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className={styles.artworkInfo2}>
                    <Table className={styles.artworkInfoTable}>
                        <tbody>
                            <tr >
                                <td className={styles.artworkInfotitle}>Artist’s Information</td>
                                <td className={styles.artworkInfotitleNone}></td>
                                <td className={styles.artworkInfotitleNone}></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className={styles.artworkInfocontent}>
                                    {artworkData.artistNote}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                </>
            )}
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
                                src='/img/sample1.webp'
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