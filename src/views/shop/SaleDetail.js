import styles from '../../css/shop/SaleDetail.module.css';
import { Table, Label, Input} from 'reactstrap';
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


// import { useEffect, useState } from 'react';

// // Inside your component
// const [artworkData, setArtworkData] = useState(null);

// useEffect(() => {
//   const fetchArtworkData = async () => {
//     try {
//       const response = await fetch('/api/artwork/1'); // Adjust the URL as needed
//       const data = await response.json();
//       setArtworkData(data);
//     } catch (error) {
//       console.error('Error fetching artwork data:', error);
//     }
//   };

//   fetchArtworkData();
// }, []);



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

    const artworkData = [
        { artworkId: 1, title: "투우", id: 3 ,artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: "/img/logo192.png",
            width:1800, height:1800, type:"수채화",subject:"수묵화", stock:"1",artistNote:"아침해가 떴다"},

    ];


    const [selectedFrame, setSelectedFrame] = useState('basic');
    const basePrice = artworkData.price;

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
                            <b>별이 빛나는 밤</b>
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
                                        <div className={styles.buttonDarkStyle} onClick={()=> goShoppingCart(artworkData.artworkId)}><b>ADD TO CART</b></div>
                                    </td>
                                    <td>
                                        <div className={styles.buttonDarkStyle2} onClick={()=> goOrder(artworkData.artworkId)}><b>결제하기</b></div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody className={styles.detailtitlearray}>
                              
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData.artist}</Label></td> 
                                    <td className={styles.artistMoveButton} onClick={()=> goArtist(artworkData.id)}>작가상세</td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData.width}X{artworkData.height}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData.type}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData.subject}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{new Intl.NumberFormat().format(basePrice)}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{artworkData.stock}</Label></td>
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
                                    <td className={styles.alignCenter}><div className={styles.frameButton}
                                    onClick={()=>goDecommendFrame(artworkData.artworkId)}>추천프레임</div></td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>
                
                </div>

            
                <div className={styles.topmiddle}>
                    <div className={styles.leftgoldheart}>
                        <img src={artworkData.image}/>
                    </div>
                    <Table className={styles.totalprice}>
                        <tbody className={styles.totalpricetbody}>
                            <tr>
                                <td className={styles.totalpriceleft}><Label>{artworkData.title}</Label></td>
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
                    <img src={artworkData.image} className={styles.detailmiddleimg}/>
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
        </>
    );
}

export default SaleDetail;