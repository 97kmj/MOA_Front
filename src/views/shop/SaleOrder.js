import React, { useState, useEffect } from 'react';
import styles from '../../css/shop/SaleOrder.module.css';
import Header from '../Header';
import { Modal } from 'reactstrap';
import { useAtomValue, useAtom } from 'jotai/react';
import { tokenAtom, userAtom } from "../../atoms";
import { url } from "../../config";
import axios from 'axios';
import { useParams } from 'react-router';

const SaleOrder = () => {
    const{artworkId} = useParams();
    const[orderData, setOrderData] = useState(); 
    const user = useAtomValue(userAtom);
    const [useMemberInfo, setUseMemberInfo] = useState(false);


    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
    });


    useEffect(()=>{
        const getSalePayment = async () =>{
            if (!user.username) {
                // user.username이 비어 있으면 리턴하여 요청을 지연
                console.log("username is not ready yet");
                return;
            }
            try{
                const res = await axios.get(`${url}/shop/orderData?artworkId=${artworkId}&username=${user.username}`)
                .then(res=>{
                    let artworkData = res.data.artworkList;
                    let userInfo = res.data.userList ;
                    console.log(res.data);
                    setOrderData(artworkData);
                    setUseMemberInfo(userInfo);
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



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUseMemberInfo = () => {
        setBuyerInfo({
            name: useMemberInfo.name,
            contact: useMemberInfo.phone,
            email: useMemberInfo.email,
            address: useMemberInfo.address ,
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
        return orderData.price + orderData.optionPrice;
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
                        <img
                            // src={orderData.imageUrl }
                            alt="Artwork"
                            className={styles.artworkImage}
                        />
                        <div className={styles.buyerInfo}>
                            <h3>구매자 정보</h3>
                            <div className={styles.infoButtons}>
                                <button
                                    className={`${styles.memberButton} ${
                                        useMemberInfo ? styles.activeButton : ''
                                    }`}
                                    onClick={handleUseMemberInfo}
                                >
                                    회원 배송지
                                </button>
                                <button
                                    className={`${styles.inputButton} ${
                                        !useMemberInfo ? styles.activeButton : ''
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
                    {/* <div className={styles.rightSection}>
                        <div className={styles.artworkDetails}>
                            <h3 className={styles.titleName}>{orderData.title}</h3>
                            <p>
                                <span className={styles.title}>ARTIST</span>
                                <span className={styles.content}>{orderData.artist}</span>
                            </p>
                            <p>
                                <span className={styles.title}>SIZE</span>
                                <span className={styles.content}>{orderData.size}</span>
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
                        <button className={styles.payButton}>결제하기</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default SaleOrder;
