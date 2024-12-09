import Header from '../Header';
import styles from '../../css/shop/ShoppingCartOrder.module.css';
import { Table, Button } from 'reactstrap';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { url } from '../../config';
import { userAtom,tokenAtom } from '../../atoms';
import { useAtomValue,useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router';
const ShoppingCartOrder = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const {cartItems, totalData} = location.state || {}
    useEffect(()=>{
        console.log(cartItems);
        console.log(totalData);
    },[location.state])

    const user = useAtomValue(userAtom);
    const [token,setToken] = useAtom(tokenAtom);

    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
    });

    const [useMemberInfo, setUseMemberInfo] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUseMemberInfo = () => {
        setBuyerInfo({
            name: user.name,
            contact: user.phone,
            email: user.email,
            address: user.address,
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

    //아임포트 api 
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/v1/iamport.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    //결제
    const initiatePayment = async () => {
        if (!user || !user.username) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (buyerInfo.name.trim() === "") {
            alert("이름을 입력해주세요.");
            return;
        }
        if (buyerInfo.contact.trim() === "") {
            alert("연락처를 입력해주세요.");
            return;
        }
        if (buyerInfo.address.trim() === "") {
            alert("주소를 입력해주세요.");
            return;
        }
        const { IMP } = window;
        if(!IMP){
            console.error("IMP객체가 존재하지 않음");
            return;
        }
        IMP.init('imp55612646');  // 가맹점 식별코드
        console.log("결제 시작");

        
        const paymentData = {
            pg: "html5_inicis", // PG사 (예: html5_inicis)
            pay_method: "card", // 결제 방식
            merchant_uid: `order_${new Date().getTime()}`, // 주문 고유 ID
            name: "작품 결제", // 상품명
            amount: 100, //totalData.totalAmount, // 결제 금액 
            buyer_name: buyerInfo.name, // 구매자 이름
            buyer_email: buyerInfo.email, // 구매자 이메일
            buyer_tel: buyerInfo.contact, // 구매자 연락처
            buyer_addr: buyerInfo.address, // 구매자 주소
        };


        const requestData = {
            name : cartItems[0].artworkTitle, // 상품명
            buyerName: buyerInfo.name, // 구매자 이름
            buyerEmail: buyerInfo.email, // 구매자 이메일
            amount: totalData.totalAmount, // 결제 금액  calculateTotalPrice()
            buyerTel: buyerInfo.contact, // 구매자 연락처
            buyerAddr: buyerInfo.address, // 구매자 주소
        }
        const saleDatas = cartItems.flatMap((item) =>
            item.itemList.map((listItem) => ({
              artworkId: listItem.saleId,
              frameOptionId: listItem.frameOptionId,
              price: listItem.price,
              frameprice: listItem.framePrice,
            }))
          );
    

        const goResult =()=>{
            navigate(`/shop/saleOrderResult`, { state: { requestData} });
            console.log("결제 완료창으로 가자", requestData);
        }
        
        try{
            const checkStock = await axios.post(`${url}/cartOrder/checkStock`,  saleDatas  ,{
                headers: {
                    Authorization: token,
                }
            });
                if(checkStock.status===200){
                    console.log("재고 확인 성공");
                    // 결제
                    IMP.request_pay(paymentData, async (response) => {
                        if (response.success) {
                            // 결제 성공 시 서버로 결제 정보를 전달하여 처리
                            console.log("결제 성공:", response);          
                    try{
                        const response = await axios.post(`${url}/cartOrder/payment`, {requestData, username:user.username, saleDatas},{
                            headers: {
                                Authorization: token,
                            }
                        });
                        if (response.status === 200) {
                            alert("결제가 성공적으로 완료되었습니다!");
                            goResult(requestData, user.username);
                            
                        } else {
                            alert("결제는 성공했으나 서버 검증 중 오류가 발생했습니다.");
                            console.error("백엔드 검증 실패:", response.data);
                        }
                    } catch (error){
                        console.error("백엔드 검증 요청 중 오류:", error);
                        alert("결제 검증 중 문제가 발생했습니다.");
                    }

                } else {
                    alert(`결제 실패: ${response.error_msg}`);
                }
            });
            } else {
                console.log("재고 확인 실패");
            }

        } catch(error){
 
            alert("옵션수량 및 그림 수량이 부족합니다.");
            console.log("재고 부족",error);
            
        }
    };
    
    

    return(
        <>
            <Header/> 
            <div className={styles.container}>
                <p><b>장바구니 결제</b></p>
                <div className={styles.bar}></div>
                <Table bordered className={styles.cartTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>이미지</th>
              <th>상품 정보</th>
              <th>수량</th>
              <th>옵션</th>
              <th>금액</th>
              <th>배송비</th>
            </tr>
          </thead>
          <tbody>
            { cartItems &&
            cartItems.map((item) => (
              <tr key={item.cartId}>
                
                {/* 첫 번째 열: 이미지 */}
                <td className={styles.imageColumn}>
                  <img src={item.imageUrl} alt={item.artworkTitle}/>
                </td>
                {/* 두 번째 열: 상품 정보 */}
                <td className={styles.imageColumn}>
                  <div><strong>{item.artworkTitle}</strong></div> {/* 상품 제목 */}
                  <br/>
                  <div>{item?.itemList?.length > 0 ?(item.itemList[0].price).toLocaleString() : 0}원</div>
                </td>
                {/* 세 번쨰 열 : 수량 */}
                <td className>
                  <div>{item.itemList?.length}개</div>
                </td>
                {/* 옵션 정보 */}
                <td className={styles.optionAlign}>
                  {/* 옵션 항목들 */}
                  {item.itemList?.map((option, index) => (
                      <div className={styles.optionItem}>
                        <span
                          className={styles.optionContent}
                        >
                          {option.frameOptionName || '선택안함'}
                        </span>
                        <span className={styles.optionContent}>
                          <strong >+{option.framePrice.toLocaleString()}원</strong>
                        </span>
                        
                      </div>
                    ))}
                </td>
                {/* 다섯 번째 열: 상품 금액 */}
                <td  className={styles.titleColumn}>
                  <div><strong>{item.itemList?.length > 0 ? 
                  (item.itemList[0].price * item.itemList?.length + item.itemList.reduce((sum, option) => sum + (option.framePrice), 0)).toLocaleString()
                  : 0}원</strong></div>
                </td>
                {/* 여섯 번째 열: 배송비 */}
                <td  className={styles.titleColumn}>
                  <div>{(item.itemList?.length * 10000).toLocaleString()}원</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
                <div className={styles.bar}/>
                <div className={styles.content}>
                    {/* Left Section */}
                    <div className={styles.leftSection}>
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
                    <div className={styles.rightSection}>
                        <div className={styles.summary}>
                            <p className={styles.total}>
                                상품 금액 : {totalData.totalPrice.toLocaleString()}원
                            </p>
                            <p className={styles.total}>
                                배송비 : {totalData.totalShipping.toLocaleString()}원
                            </p>
                            <br/>
                            <p className={styles.total}>
                                총 금액: {totalData.totalAmount.toLocaleString()}원
                            </p>
                        </div>
                        <button className={styles.payButton} onClick={initiatePayment}>결제하기</button>
                    </div>
                </div>
            </div> 

        </>
    )
}
export default ShoppingCartOrder;