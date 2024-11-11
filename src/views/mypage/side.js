import React from 'react';
import './side.css';

const SideNav = () => {
  return (
    <div className="snb_area">
      <h2 className="snb_main_title">마이 페이지</h2>
      <nav className="snb">
        <div className="snb_list">
          <strong className="snb_title">
            <svg className="cart_icon" xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="#5f6368">
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
            조회
          </strong>
          <ul className="snb_menu">
            <li className="menu_item"><a href="/supportFundings" className="menu_link">후원한 펀딩 조회</a></li>
            <li className="menu_item"><a href="/myFundings" className="menu_link">올린 펀딩 조회</a></li>
            <li className="menu_item"><a href="/salesPosts" className="menu_link">판매글 조회</a></li>
          </ul>
        </div>

        <div className="snb_list">
          <strong className="snb_title">
            <svg className="cart_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM513-160l286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Zm220 160Z" />
            </svg>
            목록
          </strong>
          <ul className="snb_menu">
            <li className="menu_item"><a href="/purchaseList" className="menu_link">구매목록</a></li>
            <li className="menu_item"><a href="/cartList" className="menu_link">장바구니 목록</a></li>
            <li className="menu_item"><a href="/myWorksList" className="menu_link">등록작품 목록</a></li>
          </ul>
        </div>

        <div className="snb_list">
          <strong className="snb_title">
            <svg className="cart_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            내 정보
          </strong>
          <ul className="snb_menu">
            <li className="menu_item"><a href="/editInfo" className="menu_link">내 정보수정</a></li>
            <li className="menu_item"><a href="/applyArtist" className="menu_link">작가 등록신청</a></li>
            <li className="menu_item"><a href="/editArtistInfo" className="menu_link">작가 정보수정</a></li>
            <li className="menu_item"><a href="/messages" className="menu_link">쪽지함</a></li>
            <li className="menu_item"><a href="/myGallery" className="menu_link">나만의 갤러리</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;