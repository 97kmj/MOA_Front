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
    const [saleFrameInfo,setSaleFrameInfo] = useState([]);




    useEffect(()=>{
        const getSalePayment = async () =>{
            if (!user.username) {
                console.log("username is not ready yet");
                return;
            }
            try{
                const res = await axios.post(`${url}/shop/orderData`, {artworkId : artworkId, username:user.username, frameId: frameId || null})
                
                const { artworkList, userList, frameList } = res.data;

                setOrderData(artworkList);  // artworkList 정보 설정
                setSaleFrameInfo(frameList);
                console.log("frameInfo", frameList);
                console.log(res.data)
                setUserInfo({
                    name: userList.name,
                    contact: userList.phone,
                    email: userList.email,
                    address: `${userList.address} ${userList.detailAddress} ${userList.extraAddress}`,
                });
    
            }catch(error){
                console.error("판매데이터 가져오기 실패",error);
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
        // saleFrameInfo가 존재하고, 배열이 비어있지 않다면
        return +orderData.price + (saleFrameInfo && saleFrameInfo.length > 0 ? saleFrameInfo[0].framePrice : 0);
    };
    
    const loadIMP = () => {
        if (typeof window.IMP === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://code.iamport.kr/imp.min.js'; // Iamport 결제 시스템 스크립트
            script.onload = () => {
                console.log("IMP 스크립트가 로드되었습니다.");
                initiatePayment();  // 스크립트 로드 완료 후 결제 초기화
            };
            script.onerror = () => {
                console.error("IMP 스크립트 로드 실패");
            };
            document.head.appendChild(script);  // 스크립트 DOM에 추가
        } else {
            initiatePayment();  // 이미 로드된 경우 결제 초기화
        }
    };


    // 결제 

    //결제
    const initiatePayment = () => {

        const { IMP } = window;
        if(!IMP){
            console.error("IMP객체가 존재하지 않음");
            return;
        }
        IMP.init('imp55612646');  // 가맹점 식별코드
        console.log("결제 시작");

        // IMP 객체를 사용하여 결제을 요청
        const paymentData = {
            pg: "html5_inicis", // PG사 (예: html5_inicis)
            pay_method: "card", // 결제 방식
            merchant_uid: `order_${new Date().getTime()}`, // 주문 고유 ID
            name: orderData.title, // 상품명
            amount: calculateTotalPrice(), // 결제 금액  calculateTotalPrice()
            buyer_name: buyerInfo.name, // 구매자 이름
            buyer_email: buyerInfo.email, // 구매자 이메일
            buyer_tel: buyerInfo.contact, // 구매자 연락처
            buyer_addr: buyerInfo.address, // 구매자 주소
        };
        //결제
        IMP.request_pay(paymentData, (response) => {
            if (response.success) {
                // 결제 성공 시 서버로 결제 정보를 전달하여 처리
                console.log("결제 성공:", response);

                const merchant_uid = response.imp_uid; //주문번호
                const imp_uid = response.imp_uid; //고유번호
                
                //백엔드 검증
                // PriceCheck(imp_uid, merchant_uid);

                // //DB 저장
                // PriceSubmit(response.imp_uid);

                // axios.post(`${url}/shop/payment`, paymentData)
                // .then(res => {
                //     console.log("결제 완료 처리", res.data);
                //     alert("결제가 완료되었습니다.");
                // })
                // .catch(err => {
                //     console.error("결제 완료 처리 실패", err);
                //     alert("결제에 실패했습니다.");
                // });
            } else {
                alert(`결제 실패: ${response.error_msg}`);
            }
        });
    };
    useEffect(() => {
        loadIMP();  // 컴포넌트가 마운트될 때 IMP 스크립트 로드
    }, []);
    
    const PriceCheck = async (imp_uid, merchant_uid) => {
        try {
            const response = await axios.post(`${url}/shop/verify` + imp_uid);
            PriceSubmit(merchant_uid);
        }catch(error){
            console.error("결제검증실패",error);
        }
    };

    const PriceSubmit = async (merchant_uid) =>{
        try {
            const response = await axios.post(`${url}/shop/order`,{
                PriceCertify: merchant_uid.toString(),
                user: user.username,
                artworkId : artworkId,
                // userEmail: userEmail,
                totalPrice: calculateTotalPrice(),
            });
            console.log(response.data);
        } catch(err){
            console.error('결제 테이블 저장 실패', err);
        }
    };



   // if (typeof window.IMP === "undefined") {
    //     loadIMP(); 
    //     console.error("IMP 객체가 로드되지 않았습니다.");
    //     return;
    // }

    // const loadIMP = () => {
    //     if (typeof window.IMP === "undefined") {
    //         const script = document.createElement('script');
    //         script.src = 'https://code.iamport.kr/imp.min.js'; // 결제 시스템 스크립트
    //         script.onload = () => {
    //             console.log("IMP 스크립트가 로드되었습니다.");
    //         };
    //         script.onerror = () => {
    //             console.error("IMP 스크립트 로드 실패");
    //         };
    //         document.head.appendChild(script);
    //     }
    // };
    
    // useEffect(() => {
    //     loadIMP(); 
    // }, []);



    


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
                                {
                                    saleFrameInfo?.length > 0 ? 
                                    <span className={styles.content}>{saleFrameInfo[0].frameType} {saleFrameInfo[0].framePrice}</span>
                                    :
                                    <span className={styles.content}>없음</span>
                                }
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
                        <button className={styles.payButton} onClick={initiatePayment}>
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
