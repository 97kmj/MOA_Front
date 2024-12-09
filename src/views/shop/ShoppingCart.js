import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import styles from '../../css/shop/ShoppingCart.module.css';  // 스타일 추가
import Header from '../Header';
import axios from 'axios'
import { url } from "../../config";
import { userAtom,tokenAtom } from '../../atoms';
import { useAtomValue,useAtom } from 'jotai';
import { useNavigate } from 'react-router';

const ShoppingCart = () => {
  const user = useAtomValue(userAtom);
  const [token,setToken] = useAtom(tokenAtom);
  const [cartItems,setCartItems] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    user && axios.get(`${url}/cart?username=${user.username}`,{headers:{Authorization:token}})
    .then(res=>{
      if(res.headers.authorization!==null && res.headers.authorization!==undefined) { //갱신받은 토큰이 있을 시
        setToken(res.headers.authorization);
      }
      console.log(res.data)
      setCartItems(res.data);
    })
    .catch(err=>{
      console.log(err);
    })

  },[])
 
  const [selectedItems, setSelectedItems] = useState([]); //선택된 카트id리스트
  const [selectAll, setSelectAll] = useState(false);

  // 상품 선택/해제
  const handleSelectItem = (cartId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(cartId)) {
        return prevSelectedItems.filter((id) => id !== cartId);
      } else {
        return [...prevSelectedItems, cartId];
      }
    });
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); // 전체 해제
    } else {
      setSelectedItems(cartItems.map(item => item.cartId)); // 전체 선택
    }
    setSelectAll(!selectAll);
  };

  // 선택된 항목 삭제
  const handleDeleteSelected = () => {
    axios.patch(`${url}/deleteCart`,selectedItems, {
      headers : {
        Authorization : token,
        "Content-Type": "application/json",
      }
    })
    .then(res=> {
      if(res.headers.authorization!==null && res.headers.authorization!==undefined) { //갱신받은 토큰이 있을 시
        setToken(res.headers.authorization);
      }
      setCartItems((prevItems) => {
        return prevItems.filter((item) => !selectedItems.includes(item.cartId)); // 선택된 항목 삭제
      });
      setSelectedItems([]); // 삭제 후 선택된 항목 초기화
      setSelectAll(false); // 전체 선택 상태 초기화
    })
    .catch(err=> {
      console.error(err);
    })
  };

  // 옵션 삭제
  const handleDeleteOption = (itemId, cartItemId) => {
    axios.patch(`${url}/deleteCartItem/${cartItemId}`,{},{headers:{Authorization:token}})
    .then(res=> {
      if(res.headers.authorization!==null && res.headers.authorization!==undefined) { //갱신받은 토큰이 있을 시
        setToken(res.headers.authorization);
      }
      setCartItems(prevItems => {
        return prevItems
          .map(cartItem => {
            if (cartItem.cartId === itemId) {
              const newItemList = cartItem.itemList?.filter(option => option.cartItemId !== cartItemId);
              if (!newItemList || newItemList.length === 0) {
                return null; // 빈 카트는 삭제
              }
              return { ...cartItem, itemList: newItemList };
            }
            return cartItem;
          })
          .filter(Boolean); // null 값 제거
      });
    })
    .catch(err=> {
      console.log(err);
    })
    
  };


  // 선택된 상품들의 총 합과 배송비 계산
  const calculateTotal = () => {
    let totalPrice = 0;
    let totalShipping = 0;
    
    cartItems.forEach((item) => {
      if (selectedItems.includes(item.cartId)) {
        // 기본 상품 가격에 옵션 가격 더하기
        let itemTotalPrice = 0;
        item.itemList.forEach(option => {
          itemTotalPrice += option.framePrice + option.price; // 옵션 가격 더하기
        });
        
        totalPrice += itemTotalPrice;
        totalShipping += item.itemList.length * 10000; // 배송비는 수량 * 10000만큼
      }
    });

    
    const totalAmount = totalPrice+ totalShipping;

    return {
      totalPrice,
      totalShipping,
      totalAmount
    };
  };

  const { totalPrice, totalShipping, totalAmount } = calculateTotal();

  //카트에서 선택한 상품 주문하기 
  const handleOrder = () => {
    const selectedCartItem = cartItems.filter((item) => selectedItems.includes(item.cartId))
    const totalPriceData = calculateTotal();

    navigate(`/shop/shoppingCartOrder`, {
      state : {
      cartItems : selectedCartItem, 
      totalData : totalPriceData
      }
    })
  }

  return (
    <>
      <Header/>
      <div className={styles.container}>
        
        <h3 className={styles.titlename}>장바구니</h3>
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
          <Button 
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
              <th>수량</th>
              <th>옵션</th>
              <th>금액</th>
              <th>배송비</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.cartId}>
                {/* 첫 번째 열: 상품 선택 체크박스 */}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.cartId)}
                    onChange={() => handleSelectItem(item.cartId)} // 상품 선택/해제
                  />
                </td>
                {/* 두 번째 열: 이미지 */}
                <td className={styles.imageColumn}>
                  <img src={item.imageUrl} alt={item.artworkTitle}/>
                </td>
                {/* 세 번째 열: 상품 정보 */}
                <td className={styles.imageColumn}>
                  <div><strong>{item.artworkTitle}</strong></div> {/* 상품 제목 */}
                  <br/>
                  <div>{item.itemList?.length > 0 ?(item.itemList[0].price).toLocaleString() : 0}원</div>
                </td>
                <td className>
                  <div>{item.itemList.length}개</div>
                </td>
                {/* 옵션 정보 */}
                <td className={styles.optionAlign}>
                  {/* 옵션 항목들 */}
                  {item.itemList.map((option, index) => (
                      <div className={styles.optionItem}>
                        <span
                          className={styles.optionContent}
                        >
                          {option.frameOptionName || '선택안함'}
                        </span>
                        <span className={styles.optionContent}>
                          <strong >+{option.framePrice.toLocaleString()}원</strong>
                        </span>
                        <Button
                          color="danger"
                          className={styles.cartListButton}
                          onClick={() => handleDeleteOption(item.cartId, option.cartItemId)}
                          style={{height: '25px', paddingTop: '2px' }}
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                </td>
                {/* 네 번째 열: 상품 금액 */}
                <td  className={styles.titleColumn}>
                  <div><strong>{item.itemList?.length > 0 ? 
                  (item.itemList[0].price * item.itemList.length + item.itemList.reduce((sum, option) => sum + (option.framePrice), 0)).toLocaleString()
                  : 0}원</strong></div>
                </td>
                {/* 다섯 번째 열: 배송비 */}
                <td  className={styles.titleColumn}>
                  <div>{(item.itemList.length * 10000).toLocaleString()}원</div>
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
                onClick={handleOrder}
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
