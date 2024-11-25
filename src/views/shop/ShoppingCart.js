import { useState } from 'react';
import { Table, Button } from 'reactstrap';
import styles from '../../css/shop/ShoppingCart.module.css';  // 스타일 추가
import Header from '../Header';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: '바다와 산과 구름 알라딘의 밥의 동해',
      artist: '김민수',
      category: '풍경',
      subject: '자연',
      price: 30000, // 기본 상품 가격
      shipping: 3000, // 배송비
      artworkquantity: 6,  // 작품당 수량, 여기서는 "1개의 작품"에 6개씩 묶여 있다고 가정
      quantity: 5,  // 장바구니에 담긴 수량
      options: [
        { optionId: 'option1', option: '옵션1', contents: ['기본 액자'], optionPrice: 5000, quantity: 1 },
        { optionId: 'option2', option: '옵션2', contents: ['고급 액자'], optionPrice: 30000000, quantity: 2 },
        { optionId: 'option3', option: '옵션3', contents: ['고급 액자'], optionPrice: 15000, quantity: 3 }
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
        { optionId: 'option1', option: '옵션1', contents: ['고급액자'], optionPrice: 4000, quantity: 1 },
      ],
    },
    // 추가 상품들...
  ]);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // 상품 선택/해제
  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); // 전체 해제
    } else {
      setSelectedItems(cartItems.map(item => item.id)); // 전체 선택
    }
    setSelectAll(!selectAll);
  };

  // 선택된 항목 삭제
  const handleDeleteSelected = () => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => !selectedItems.includes(item.id)); // 선택된 항목 삭제
    });
    setSelectedItems([]); // 삭제 후 선택된 항목 초기화
    setSelectAll(false); // 전체 선택 상태 초기화
  };

  // 옵션 삭제
  const handleDeleteOption = (itemId, optionId) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            options: item.options.filter((option) => option.optionId !== optionId), // 해당 옵션 삭제
          };
        }
        return item;
      });
    });
  };

  // 선택된 상품들의 총 합과 배송비 계산
  const calculateTotal = () => {
    let totalPrice = 0;
    let totalShipping = 0;
    
    cartItems.forEach((item) => {
      if (selectedItems.includes(item.id)) {
        // 기본 상품 가격에 옵션 가격 더하기
        let itemTotalPrice = item.price * item.quantity;  // 가격은 수량만큼 계산
        item.options.forEach(option => {
          itemTotalPrice += option.optionPrice * option.quantity; // 옵션 가격 더하기
        });
        
        totalPrice += itemTotalPrice;
        totalShipping += item.shipping * item.quantity; // 배송비는 수량만큼
      }
    });

    
    const totalAmount = totalPrice + totalShipping;

    return {
      totalPrice,
      totalShipping,
      totalAmount
    };
  };

  const { totalPrice, totalShipping, totalAmount } = calculateTotal();

  // 특정 상품 주문 처리
  const handleOrderItem = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (item) {
      alert(`${item.title} 상품이 주문되었습니다!`);
    }
  };

  return (
    <>
      <Header/>
      <div className={styles.container}>
        
        <h2 className={styles.titlename}>장바구니</h2>
        <div className={styles.bar}></div>

        <div className={styles.topBar}>
          {/* 오른쪽 상단: 전체 선택 체크박스 */}
          <div className={styles.selectAllCheckbox}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="custom-checkbox-input"
            />
            <b>전체 선택</b>
          </div>

          {/* 왼쪽 상단: 선택 삭제 버튼 */}
          <Button className={styles.topButton}
            color="danger" 
            onClick={handleDeleteSelected} 
            className={styles.cartListTopButton}
            disabled={selectedItems.length === 0}
          >
            선택 삭제
          </Button>
        </div>

        <Table bordered className={styles.cartTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>선택</th>
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
                {/* 첫 번째 열: 상품 선택 체크박스 */}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)} // 상품 선택/해제
                  />
                </td>
                {/* 두 번째 열: 이미지 */}
                <td className={styles.titleColumn}>
                  <img src={item.image} alt={item.title}/>
                </td>
                {/* 세 번째 열: 상품 정보 */}
                <td className={styles.titleColumn}>
                  <div><strong>{item.title}</strong></div> {/* 상품 제목 */}
                  <div>작가: {item.artist}</div> 
                  <div> 카테고리: {item.category} | 주제: {item.subject}</div>
                </td>
                {/* 옵션 정보 */}
                <td className={styles.optionAlign}>
                  {/* 옵션 첫 번째 항목: 상품 제목, 가격, 수량 */}
                  <div>
                    <strong className={styles.itemTitle}>{item.title}</strong> &nbsp; 
                    <spam className={styles.optionPriceStyle}><strong>{item.price.toLocaleString()}원</strong></spam>
                    수량: {item.quantity}개 

                  </div>
                  {/* 옵션 항목들 */}
                  {item.options.map((option, index) => (
                      <div key={option.optionId} className={styles.optionItem}>
                        <span
                          className={styles.optionContent}
                        >
                          {option.contents.join(', ')}
                        </span>
                        <span className={styles.optionPriceStyle}>
                          <strong >{option.optionPrice.toLocaleString()}원</strong> &nbsp;
                        </span>
                        수량: {option.quantity}개
                        <Button
                          color="danger"
                          className={styles.cartListButton}
                          onClick={() => handleDeleteOption(item.id, option.optionId)}
                          style={{ marginLeft: '10px', marginTop: '10px', height: '25px', paddingTop: '2px' }}
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                </td>
                {/* 네 번째 열: 상품 금액 */}
                <td  className={styles.titleColumn}>
                  <div><strong>{(item.price * item.quantity + item.options.reduce((sum, option) => sum + (option.optionPrice * option.quantity), 0)).toLocaleString()}원</strong></div>
                  
                  {/* 주문하기 버튼 */}
                  <Button 
                    className={styles.cartListButton}
                    color="primary"
                    onClick={() => handleOrderItem(item.id)}
                  >
                    주문하기
                  </Button>
                </td>
                {/* 다섯 번째 열: 배송비 */}
                <td  className={styles.titleColumn}>
                  <div>{(item.shipping * item.quantity).toLocaleString()}원</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {/* 선택된 상품들의 총합과 배송비 */}
        <div className={styles.summarySection}>
          <div className={styles.pricetile}>
            <div className={styles.productPrice}>
              <div><strong>상품 총합</strong></div>
              <div>{totalPrice.toLocaleString()}원</div>
            </div>
            <div className={styles.priceMiddle}>+</div>
            <div className={styles.productPrice}>
              <div><strong>배송비</strong></div>
              <div>{totalShipping.toLocaleString()}원</div>
            </div>
            <div className={styles.priceMiddle}>=</div>

            <div className={styles.priceMiddletotalpricetitle}>
              <strong>총 주문금액</strong>
            </div>

            <div className={styles.priceMiddletotalprice}>
              <span>{totalAmount.toLocaleString()}원</span>
            </div>
            
            {/* 주문하기 버튼 */}
            <div className={styles.priceMiddlewidth}> 
              <Button 
                className={styles.priceMiddleButton}
                color="primary" 
                disabled={selectedItems.length === 0}
                onClick={() => alert('주문이 완료되었습니다!')}
              >
                주문하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
