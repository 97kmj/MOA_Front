import React, { useState, useEffect } from 'react';
import styles from '../../css/shop/SaleOrder.module.css';
import Header from '../Header';
import { useAtomValue, useAtom } from 'jotai/react';
import { tokenAtom, userAtom } from "../../atoms";
import { url } from "../../config";
import axios from 'axios';
import { useParams,useLocation } from 'react-router';


const SaleOrder = () => {
    const location = useLocation();
    const frameId = location.state?.frameId;

    const{artworkId} = useParams();
    const[orderData, setOrderData] = useState(); 
    const user = useAtomValue(userAtom);
    const [useMemberInfo, setUseMemberInfo] = useState(false);
    const [userInfo, setUserInfo] = useState();




    useEffect(()=>{
        const getSalePayment = async () =>{
            if (!user.username) {
                console.log("username is not ready yet");
                return;
            }
            try{
                console.log("frameId :")
                console.log(frameId)
                const res = await axios.post(`${url}/shop/orderData?artworkId=${artworkId}&username=${user.username}`, {frameId:frameId})
                .then(res=>{
                    const artworkData = res.data.artworkList;
                    const userInfo = res.data.userList;
                    console.log(res.data);
                    setOrderData(artworkData); // artworkList 정보 설정
                    setUserInfo({
                        name: userInfo.name,
                        contact: userInfo.phone,
                        email: userInfo.email,
                        address: userInfo.address + userInfo.detailAddress +userInfo.extraAddress ,
                    });
                })
                .catch(err => {
                    console.log(err);
                })
            }catch(error){
                console.error("판매데이터 가져오기 실패");
            }
        }
        getSalePayment();

    },[user.username,artworkId])

    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUseMemberInfo = () => {
        setBuyerInfo({
            name: userInfo.name, 
            contact: userInfo.contact,
            email: userInfo.email,
            address: userInfo.address,
        });
        setUseMemberInfo(true);
    };

    const handleDirectInput = () => {
        setBuyerInfo({
            name: '',
            contact: '',
            email: '',
            address: '',
        });
        setUseMemberInfo(false);
    };

    const calculateTotalPrice = () => {
        return parseInt(orderData.price) + orderData.optionPrice==null ? orderData.optionPrice : 0 ;
    };

    return (
        <>
            <Header />
            <div className={styles.saleOrder}>
                <p className={styles.title}>판매 결제</p>
                <hr className={styles.titleLine} />

                <div className={styles.content}>
                    {/* Left Section */}
                    <div className={styles.leftSection}>
                        {orderData?.imageUrl ? (
                            <img
                                src={orderData.imageUrl}
                                alt="Artwork"
                                className={styles.artworkImage}
                            />
                        ) : (
                            <div>이미지를 불러오는 중입니다...</div>
                        )}
                        <div className={styles.buyerInfo}>
                            <h3>구매자 정보</h3>
                            <div className={styles.infoButtons}>
                                <button
                                    className={`${styles.memberButton} ${
                                        useMemberInfo == true ? styles.activeButton : ''
                                    }`}
                                    onClick={handleUseMemberInfo}
                                >
                                    회원 배송지
                                </button>
                                <button
                                    className={`${styles.inputButton} ${
                                        !useMemberInfo != true ? styles.activeButton : ''
                                    }`}
                                    onClick={handleDirectInput}
                                >
                                    직접 입력
                                </button>
                            </div>
                            <section className={styles.buyerForm}>
                                <div className={styles.formRow}>
                                    <span className={styles.icon}>
                                        <img src='/img/User.png' className={styles.imgInfo}/>
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="이름"
                                        value={buyerInfo.name}
                                        onChange={handleInputChange}
                                        disabled={useMemberInfo}
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <span className={styles.icon}>
                                        <img src='/img/Phone.png' className={styles.imgInfo2} />
                                    </span>
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="연락처"
                                        value={buyerInfo.contact}
                                        onChange={handleInputChange}
                                        disabled={useMemberInfo}
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <span className={styles.icon}>
                                        <img src='/img/Letter.png' className={styles.imgInfo3} />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="이메일"
                                        value={buyerInfo.email}
                                        onChange={handleInputChange}
                                        disabled={useMemberInfo}
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <span className={styles.icon}>
                                        <img src='/img/City.png' className={styles.imgInfo2} />
                                    </span>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="배송지"
                                        value={buyerInfo.address}
                                        onChange={handleInputChange}
                                        disabled={useMemberInfo}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Section */}
                    {orderData ? (
                    <div className={styles.rightSection}>
                        <div className={styles.artworkDetails}>
                            <h3 className={styles.titleName}>{orderData.title}</h3>
                            <p>
                                <span className={styles.title}>ARTIST</span>
                                <span className={styles.content}>{orderData.artistName}</span>
                            </p>
                            <p>
                                <span className={styles.title}>SIZE</span>
                                <span className={styles.content}>{orderData.width} X {orderData.height
                                }</span>
                            </p>
                            <p>
                                <span className={styles.title}>PRICE</span>
                                <span className={styles.content}>{orderData.price.toLocaleString()}원</span> 
                            </p>
                            <p>
                                <span className={styles.title}>STOCK</span>
                                <span className={styles.content}>{orderData.stock}개</span>
                            </p>
                            <p>
                                <span className={styles.title}>Option</span>
                                <span className={styles.content}>{orderData.option}</span>
                            </p>
                        </div>
                        <div className={styles.summary}>
                            <p>
                                {orderData.title}{' '}
                                {orderData.price.toLocaleString()}₩
                            </p>
                            <p>{orderData.option}</p>
                            <p className={styles.total}>
                                총 금액: {calculateTotalPrice().toLocaleString()}₩
                            </p>
                        </div>
                        <button className={styles.payButton}>
                            결제하기
                        </button>
                    </div>
                     ) : (
                        <p>상품 정보를 불러오는 중입니다...</p> // orderData가 null일 경우 로딩 메시지
                    )}
                </div>
            </div>
        </>
    );
};

export default SaleOrder;
