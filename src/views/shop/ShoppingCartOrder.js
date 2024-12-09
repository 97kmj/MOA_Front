import Header from '../Header';
import styles from '../../css/shop/ShoppingCartOrder.module.css';
import { Table, Button } from 'reactstrap';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { url } from '../../config';
import { userAtom,tokenAtom } from '../../atoms';
import { useAtomValue,useAtom } from 'jotai';
import { useLocation } from 'react-router';
const ShoppingCartOrder = () =>{
    const location = useLocation();
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

    const requestPayment = async () => {

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


        if (!window.IMP) {
            alert("아임포트가 아직 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.");
            return;
        }

        // 백엔드에 전달할 데이터
        const requestData = {
            totalAmount: totalData.totalAmount,
            paymentType: "", // 이 값은 결제 성공 후 업데이트됨
            username:user.username,
            cartItemList : cartItems,
            address: buyerInfo.address,
            phoneNumber: buyerInfo.contact || user.phone,
            name: buyerInfo.name || user.name,
        };

        try {
            // Step 1: 결제 사전 검증
            const prepareResponse = await axios.post(`${url}/cartOrder/prepare`, {

                    ...requestData,
                }, {
                    headers: {
                        Authorization: token
                    },
                }
            );

            if (prepareResponse.status === 200) {
                console.log("사전 검증 성공:", prepareResponse.data);

                // Step 2: 결제 요청
                const {IMP} = window;
                IMP.init('imp55612646'); // 가맹점 식별코드

                const paymentData = {
                    pg: "html5_inicis", // PG사 선택
                    pay_method: "CARD", // 결제수단
                    merchant_uid: `order_${new Date().getTime()}`, // 주문번호
                    name: "작품 결제", // 결제명
                    amount: totalData.totalAmount, // 결제 금액
                    buyer_email: user.email,
                    buyer_name: user.name,
                    buyer_tel: user.phone,
                    buyer_addr: buyerInfo.address || user.address,
                };

                IMP.request_pay(paymentData, async (rsp) => {
                    if (rsp.success) {
                        console.log("결제 성공:", rsp);
                        // Step 3: 백엔드 DB에 결제 정보 저장
                        try {
                            const response = await axios.post(`${url}/cartOrder/complete`, requestData,
                                {
                                    headers: {Authorization: token}
                                });

                            if (response.status === 200) {
                                alert("결제가 성공적으로 완료되었습니다!");
                            } else {
                                alert("결제는 성공했으나 서버 검증 중 오류가 발생했습니다.");
                                console.error("백엔드 검증 실패:", response.data);
                            }
                        } catch (error) {
                            console.error("백엔드 검증 요청 중 오류:", error);
                            alert("결제 검증 중 문제가 발생했습니다.");
                        }
                    } else {
                        // 결제 실패 처리
                        alert(`결제 요청에 실패했습니다. 에러 메시지: ${rsp.error_msg}`);
                        console.error("결제 실패:", rsp);
                    }
                });
            } else {
                alert("사전 등록에 실패했습니다. 다시 시도해주세요.");
                console.error("사전 등록 실패:", prepareResponse);
            }
        } catch (error) {
            if (error.response) {
                // 서버에서 반환한 오류를 기반으로 적절한 메시지 표시
                const {error: errorCode, message} = error.response.data;
                alert(`알 수 없는 오류: ${message}`);
                
            } else {
                // 네트워크 오류 등 일반적인 오류 처리
                console.error("사전 등록 요청 중 오류:", error);
                alert("결제 사전등록 중 문제가 발생했습니다.");
            }
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
                        <button className={styles.payButton}>결제하기</button>
                    </div>
                </div>
            </div> 

        </>
    )
}
export default ShoppingCartOrder;