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