import styles from '../../css/shop/SaleDetail.module.css';
import { Table, Label, Input} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useAtomValue, useAtom } from 'jotai/react';
import { tokenAtom, userAtom } from "../../atoms";
import Header from "../Header";
import { useNavigate, useParams } from 'react-router';
import { url } from "../../config";
import axios from 'axios';



const SaleDetail = () => {
    const navigate = useNavigate();
    const {artworkId} = useParams(); // URL에서 id 가져오기
    const [saleDetail, setSaleDetail] = useState(null); //작품 데이터 저장
    const user = useAtomValue(userAtom);
    const [token,setToken] = useAtom(tokenAtom);
    const [modalOpen,setModalOpen] = useState(false);
    const [selectedFrame, setSelectedFrame] = useState({framePrice:0, frameType:"프레임 없음"});
    const [selectedFrameButton, setSelectedFrameButton] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const [isLiked, setIsLiked] = useState(false);
    const [isCount, setIsCount] = useState(0);
    const [getFrame, setGetFrame] = useState([]);
    const [getCanvasId, setGetCanvasId] = useState();
    const [frameListId ,setFrameListId] = useState();

    const [saleItems, setSaleItems] = useState([
        { title: saleDetail?.title || "기본 작품", basePrice: saleDetail?.price || 0, framePrice: 0, selectedOption: "" }
    ]);



    useEffect(() => {
        if (saleDetail) {
            setSaleItems([
                {
                    title: saleDetail.title,
                    basePrice: saleDetail.price,
                    framePrice: 0,
                    selectedOption: ""
                }
            ]);
        }
    }, [saleDetail]);


    const addToCart = () => {
        const itemList = saleItems.map(item=> ({
            saleId : artworkId,
            price : item.basePrice,
            frameOptionId : item.selectedOption || null,
            framePrice : item.framePrice,
        }))
        axios.post(`${url}/addToCart`,{itemList, username:user.username},
            {headers:{Authorization:token}})
            .then(res=> {
                if(res.headers.authorization!==null && res.headers.authorization!==undefined) { //갱신받은 토큰이 있을 시
                    setToken(res.headers.authorization)
                }
                alert("장바구니에 상품이 등록되었습니다.")
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const addNewItem = () => {
        setSaleItems((prevItems) => [
            ...prevItems,
            {
                id: Date.now(), // 고유 ID 추가
                title: saleDetail?.title || "추가 작품",
                basePrice: basePrice,
                framePrice: 0,
                selectedOption: "",
            },
        ]);
    };

    const LastRemoveItem = () => {
        setSaleItems((prevItems) => prevItems.filter((item, index) => index !== prevItems.length - 1));
    }


    // 수량 감소 핸들러
    const removeSpecificItem = (id) => {
        setSaleItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    // 총합 계산 함수
    const calculateTotalPrice = () => {
        return saleItems.reduce(
            (total, item) => total + item.basePrice + (item.framePrice || 0),
            0
        );
    };


    const handleOptionChange = (index, selectedOption) => {
        setSaleItems((prevItems) => {
            const updatedItems = [...prevItems];
            const selectedFrame = getFrame.find(frame => frame.frameId === parseInt(selectedOption)) || { framePrice: 0, frameType: "선택없음" };

            updatedItems[index] = {
                ...updatedItems[index],
                selectedOption,
                framePrice: selectedFrame.framePrice || 0,
                selectedOptionName: selectedFrame.frameType || "선택없음",
            };


            console.log("updatedItems" , updatedItems);
            return updatedItems;
        });
    };



    // const handleOptionChange = (index, selectedOption) => {
    //     const updatedItems = [...saleItems];
    //     const framePrice = getFrame.find((f) => f.frameId === selectedOption)?.framePrice || 0;
    //     updatedItems[index].selectedOption = selectedOption;
    //     updatedItems[index].framePrice = framePrice;
    //     setSaleItems(updatedItems);
    // };



    //좋아요 처리 

    const handleLikeButtonClick = async() => {
        if (!user.username) {
          alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
          return;
        }
        try{
            const response = await axios.post(`${url}/shop/likeArtwork`, {artworkId:artworkId,username:user.username});
            setIsLiked(response.data)

            setIsCount(prevCount => response.data ? prevCount + 1 : prevCount - 1);



        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };


    //작품 데이터 가져오기
    useEffect(() =>{
        const getSaleDetail = async () => {
            try{
                const response = await fetch(`${url}/shop/artworkDetail/${artworkId}`)
                const artworkData = await response.json();
                setSaleDetail(artworkData);
                setIsCount(artworkData.likeCount);
                setGetCanvasId(artworkData.canvasId);
                console.log(artworkData)
                console.log("saleDetail.status:")
                console.log(artworkData.saleStatus)

            } catch(error){
                console.error("Failed to fetch artwork:", error);
                alert("판매 정보를 불러오는데 실패했습니다.");
            }
        };
        getSaleDetail();
        console.log(saleDetail)
    }, [artworkId]);

    useEffect(() =>{
        const getIsLikeArtwork = async () => {
            try{
                const likeResponse = await axios.post(`${url}/shop/isLikeArtwork/${artworkId}`, {username:user.username});
                    setIsLiked(likeResponse.data);

            } catch(error){
                console.error("Failed to fetch artwork:", error);
            }
        };
        console.log("username:"+user.username)
        if(user!==null && user.username!==null && user.username!=='') {
            getIsLikeArtwork();
        }

    }, [user]);

    useEffect(()=>{
        const getFrameList = async () => {
            try{
                const response = await axios.post(`${url}/shop/getFrame/${getCanvasId}`);
                setGetFrame([...response.data]);
            }catch(error){
                console.error("프레임 가져오기 실패:", error);
            }
        };
        if (getCanvasId) {
            getFrameList();
        }
    },[getCanvasId])



    //프레임
    const handleFrameChange = (e) => {


        const selFrame = getFrame.find(f=>+f.frameId===+e.target.value);
        if (selFrame != null){
            setSelectedFrame(selFrame);
            setFrameListId(e.target.value);
            console.log("데이터");
            console.log(frameListId);
        }else{
            setSelectedFrame({framePrice:0, frameType:"프레임 없음"});
            console.log("데이터2");
            setFrameListId("");
        }
    };



    if (!saleDetail) {
        return <div>Loading...</div>;
    }


    const goOrder = (artworkId) => {
        navigate(`/shop/SaleOrder/${artworkId}`, { state: { saleItems, frameId: frameListId } });

        console.log("saleItems order", saleItems);
    };

    const goArtist = (artistId) => {
        navigate('/artistDetail', {state : {artistId : artistId}})
    }




    // 모달 추천프레임

    const showModal = () => {

        setModalOpen(true);
    }
    const closeModal = () => {

        setModalOpen(false);
    }

    // 추천프레임

    const frameImages = ['/img/frame1.png','/img/frame2.png'];


    const frameClasses=[styles.frameArtwork1, styles.frameArtwork2];


    const handleLeftClick = () => {
        setSelectedFrameButton(prev => (prev === 0 ? frameImages.length - 1 : prev - 1));
    };

    const handleRightClick = () => {
        setSelectedFrameButton(prev => (prev === frameImages.length - 1 ? 0 : prev + 1));
    };

    const basePrice = saleDetail?.price || 0;

    const framePrice = (selectedFrame?.framePrice || 0);

    const totalPrice = basePrice + framePrice;    // + framePrices[selectedFrame];






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
                                {saleDetail.saleStatus === "AVAILABLE" && (
                                    <>
                                        {saleDetail.categoryId === 1 && (
                                            <tr className={styles.detailTopRightOption}>
                                                <td><Label><b>OPTION</b></Label></td>

                                            </tr>
                                        )}
                                        <tr>
                                            <td>
                                                <div className={styles.buttonDarkStyle} onClick={addToCart}><b>ADD TO CART</b></div>
                                            </td>
                                            <td>
                                                <div className={styles.buttonDarkStyle2} onClick={()=> goOrder(saleDetail.artworkId)}><b>결제하기</b></div>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                            <tbody className={styles.detailtitlearray}>

                                <tr className={styles.detailTopRightArray}>

                                    <td><Label>{saleDetail.artistName || 'Unknown Artist'}</Label></td>

                                    <td className={styles.artistMoveButton} onClick={()=> goArtist(saleDetail.artistId)}>작가상세</td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.width}X{saleDetail.height}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                   <td><Label>{saleDetail.typeName}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.subjectName}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{new Intl.NumberFormat().format(basePrice)}</Label></td>
                                </tr>
                                <tr className={styles.detailTopRightArray}>
                                    <td><Label>{saleDetail.stock}</Label></td>
                                </tr>
                                {saleDetail.saleStatus === "AVAILABLE" && (
                                    <>
                                    {saleDetail.categoryId === 1 && (
                                        <tr>
                                            <Input
                                                className={styles.detailtitlearraFrame}
                                                type="select"
                                                // value={selectedFrame}
                                                onChange={handleFrameChange}
                                            >
                                                <option value="">선택없음</option>
                                                {getFrame && getFrame.map((frame) => (
                                                    <option value={frame.frameId}>
                                                        {frame.frameType} + {frame.framePrice}
                                                    </option>
                                                ))}
                                            </Input> &nbsp;&nbsp;&nbsp;
                                            <td className={styles.alignCenter}>
                                                <button className={styles.frameButton} onClick={showModal}>추천프레임</button>
                                            </td>
                                        </tr>
                                    )}
                                    </>
                                )}
                            </tbody>
                        </Table>

                    </div>

                </div>


                <div className={styles.topmiddle}>
                    <div className={styles.leftgoldheart} >
                        <div className={styles.likedposition}>
                            <img
                                src={isLiked==true? "/img/heart.svg"  : "/img/goldheart.png"}
                                alt="좋아요"
                                className={styles.likeIcon}
                                onClick={handleLikeButtonClick}
                            />
                            <div className={styles.likedcount}
                            >

                                {isCount}

                            </div>
                        </div>
                    </div>
                    {/**/}

                    <Table className={styles.newTotalPrice}>
                        {saleDetail.saleStatus === "AVAILABLE" ? (
                            <>
                                <tbody className={styles.newTotalPriceBody}>
                                {/* 기본 작품 디테일 */}
                                <tr className={styles.newItemRow}>
                                    <td className={styles.newItemName}>
                                        <Label>{saleDetail.title}</Label>
                                    </td>
                                    <td className={styles.newItemOption}>
                                        <Input
                                            className={styles.newOptionSelect}
                                            type="select"
                                            onChange={(e) => handleOptionChange(0, e.target.value)}
                                            value={saleItems[0]?.selectedOption || ""}
                                        >
                                            <option value="">선택없음</option>
                                            {getFrame && getFrame.map((frame) => (
                                                <option value={frame.frameId} key={frame.frameId}>
                                                    {frame.frameType} + {frame.framePrice}
                                                </option>
                                            ))}
                                        </Input>
                                    </td>
                                    <td className={styles.newItemQuantity}>
                                        {/* 수량 버튼 */}
                                        <button className={styles.quantityButton} onClick={addNewItem}>+</button>
                                        {/*<button*/}
                                        {/*    className={styles.quantityButton}*/}
                                        {/*    onClick={() => removeSpecificItem(saleItems[0].id)}*/}
                                        {/*    disabled={saleItems.length <= 1} // 기본 항목은 제거하지 않음*/}
                                        {/*>*/}
                                        {/*    -*/}
                                        {/*</button>*/}
                                    </td>
                                </tr>
                                {/* 기본 작품 가격 정보 */}
                                <tr className={styles.newPriceRow}>
                                    <td className={styles.newItemPrice}>
                                        <Label>작품 가격</Label>
                                    </td>
                                    <td className={styles.newTotalPriceValue}>
                                        {new Intl.NumberFormat().format(basePrice)}원
                                    </td>
                                </tr>
                                <tr className={styles.newPriceRow}>
                                    <td className={styles.newItemPrice}>
                                        <Label>액자 가격</Label>
                                    </td>
                                    <td className={styles.newTotalPriceValue}>
                                        +{new Intl.NumberFormat().format(saleItems[0]?.framePrice || 0)}원
                                    </td>
                                </tr>
                                <tr className={styles.newPriceRow}>
                                    <td className={styles.newItemPrice}>
                                        <Label><b>총 금액</b></Label>
                                    </td>
                                    <td className={styles.newTotalPriceValue}>
                                        {new Intl.NumberFormat().format(basePrice + (saleItems[0]?.framePrice || 0))}원
                                    </td>
                                </tr>

                                {/* 수량 추가로 생성된 항목들 */}
                                {/* 수량 추가로 생성된 항목들 */}
                                {saleItems.slice(1).map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <tr className={styles.newItemRow}>
                                            <td className={styles.newItemName}>
                                                <Label>{item.title} +</Label>
                                            </td>
                                            <td className={styles.newItemOption}>
                                                <Input
                                                    className={styles.newOptionSelect}
                                                    type="select"
                                                    value={item.selectedOption || ""}
                                                    onChange={(e) => handleOptionChange(index + 1, e.target.value)}
                                                >
                                                    <option value="">선택없음</option>
                                                    {getFrame && getFrame.map((frame) => (
                                                        <option value={frame.frameId} key={frame.frameId}>
                                                            {frame.frameType} + {frame.framePrice}
                                                        </option>
                                                    ))}
                                                </Input>
                                            </td>
                                            <td className={styles.newItemQuantity}>
                                                {/* 개별 항목 제거 버튼 */}
                                                <button
                                                    className={styles.quantityButton}
                                                    onClick={() => removeSpecificItem(item.id)}
                                                >
                                                    -
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className={styles.newPriceRow}>
                                            <td className={styles.newItemPrice}>
                                                <Label>작품 가격</Label>
                                            </td>
                                            <td className={styles.newTotalPriceValue}>
                                                {new Intl.NumberFormat().format(item.basePrice)}원
                                            </td>
                                        </tr>
                                        <tr className={styles.newPriceRow}>
                                            <td className={styles.newItemPrice}>
                                                <Label>액자 가격</Label>
                                            </td>
                                            <td className={styles.newTotalPriceValue}>
                                                +{new Intl.NumberFormat().format(item.framePrice || 0)}원
                                            </td>
                                        </tr>
                                        <tr className={styles.newPriceRow}>
                                            <td className={styles.newItemPrice}>
                                                <Label><b>총 금액</b></Label>
                                            </td>
                                            <td className={styles.newTotalPriceValue}>
                                                {new Intl.NumberFormat().format(item.basePrice + (item.framePrice || 0))}원
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                                </tbody>

                                {/* 총합 계산 */}
                                <tfoot className={styles.newTotalFooter}>
                                <tr>
                                    <td className={styles.newFooterTitle}>
                                        <Label><b>전체 총 금액</b></Label>
                                    </td>
                                    <td className={styles.newFooterValue}>
                                        {new Intl.NumberFormat().format(calculateTotalPrice())}원
                                    </td>
                                </tr>
                                </tfoot>
                            </>
                        ) : (
                            <tbody className={styles.newSoldOut}>
                            <tr>
                                <td><b>SOLD_OUT</b></td>
                            </tr>
                            </tbody>
                        )}
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
                                <td className={styles.artworkInfotitle}>Artist’s Information</td>
                                <td className={styles.artworkInfotitleNone}></td>
                                <td className={styles.artworkInfotitleNone}></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className={styles.artworkInfocontent}>
                                    { saleDetail.artistNote}
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
                        <button onClick={closeModal} >
                            <img src='https://img.icons8.com/?size=15&id=71200&format=png&color=B39C49'/>
                        </button>
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