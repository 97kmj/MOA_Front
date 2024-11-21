import Header from '../Header';
import styles from '../../css/shop/ShoppingCartOrder.module.css';
import { Table, Button } from 'reactstrap';
import { useState } from 'react';


const ShoppingCartOrder = () =>{
    const [cartItems, setCartItems] = useState([
        
        {
          id: 1,
          image: 'https://via.placeholder.com/150',
          title: '바다와 산과 구름',
          artist: '김민수',
          category: '풍경',
          subject: '자연',
          price: 30000, // 기본 상품 가격
          shipping: 3000, // 배송비
          artworkquantity: 6,  // 작품당 수량, 여기서는 "1개의 작품"에 6개씩 묶여 있다고 가정
          quantity: 5,  // 장바구니에 담긴 수량
          options: [
            { optionId: 'option1', option: '옵션1', contents: ['기본 액자'], optionPrice: 5000, quantity: 1 },
            { optionId: 'option2', option: '옵션2', contents: ['고급 액자1'], optionPrice: 3000, quantity: 2 },
            { optionId: 'option3', option: '옵션3', contents: ['고급 액자2'], optionPrice: 15000, quantity: 3 }
          ],
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/150',
          title: '꽃과 나무',
          artist: '박지훈',
          category: '식물',
          subject: '자연',
          price: 50000, // 기본 상품 가격
          shipping: 3000, // 배송비
          artworkquantity: 1,  // 상품 당 1개 작품
          quantity: 3,  // 장바구니에 담긴 수량
          options: [
            { optionId: 'option1', option: '옵션1', contents: ['고급액자2'], optionPrice: 4000, quantity: 1 },
          ],
        },
        // 추가 상품들...
      ]);



      const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
    });

    const [useMemberInfo, setUseMemberInfo] = useState(false);

    const [artworkDetails] = useState({
        title: '투우',
        price: 2200000,
        artist: '피카소',
        size: '72.7 X 90.9CM',
        stock: 1,
        option: '기본 프레임 +100,000₩',
        optionPrice: 100000,
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
            name: '회원 이름',
            contact: '010-1234-5678',
            email: 'member@example.com',
            address: '서울특별시 강남구',
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
        return artworkDetails.price + artworkDetails.optionPrice;
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
                        <th>옵션</th>
                        <th>상품금액</th>
                        <th>배송비</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                        <tr key={item.id}>

                            {/* 두 번째 열: 이미지 */}
                            <td>
                            <img src={item.image} alt={item.title} width="100" height="100" />
                            </td>
                            {/* 세 번째 열: 상품 정보 */}
                            <td>
                            <div><strong>{item.title}</strong></div> {/* 상품 제목 */}
                            <div>작가: {item.artist} | 카테고리: {item.category} | 주제: {item.subject}</div>
                            </td>
                            {/* 옵션 정보 */}
                            <td>
                            {/* 옵션 첫 번째 항목: 상품 제목, 가격, 수량 */}
                            <div>
                                <strong>{item.title}</strong> &nbsp; {item.price.toLocaleString()}원  &nbsp;
                                수량: {item.quantity}개
                            </div>

                            {/* 옵션 항목들 */}
                            {item.options.map((option) => (
                                <div key={option.optionId}>
                                &nbsp; {option.contents.join(', ')}  &nbsp;
                                <strong>{option.optionPrice.toLocaleString()}원</strong> &nbsp; 
                                수량: {option.quantity}개
                                </div>
                            ))}
                            </td>
                            {/* 네 번째 열: 상품 금액 */}
                            <td>
                            <div><strong>{(item.price * item.quantity + item.options.reduce((sum, option) => sum + (option.optionPrice * option.quantity), 0)).toLocaleString()}원</strong></div>
                            
                            </td>
                            {/* 다섯 번째 열: 배송비 */}
                            <td>
                            <div>{(item.shipping * item.quantity).toLocaleString()}원</div>
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
                            <p>
                                {artworkDetails.title}{' '}
                                {artworkDetails.price.toLocaleString()}₩
                            </p>
                            <p>{artworkDetails.option}</p>
                            <p className={styles.total}>
                                총 금액: {calculateTotalPrice().toLocaleString()}₩
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