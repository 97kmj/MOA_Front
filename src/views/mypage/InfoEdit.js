import React, { useEffect, useState } from 'react';
import styles from '../../css/mypage/InfoEdit.module.css';
import Header from "../Header";
import SideNav from "./SideNav"; // SideNav 컴포넌트 추가
import { useAtomValue } from "jotai";
import { tokenAtom } from "../../atoms";
const InfoEdit = () => {

  const [userData, setUserData] = useState({
    name: '',
    username: '',
    phone: '',
    postcode: '',
    address: '',
    detailAddress: '',
    extraAddress: '',
    email: '',
    role: '',
  });

  const [editMode, setEditMode] = useState({
    name: false,
    password: false,
    phone: false,
    address: false,
    email: false,
  });
  const token = useAtomValue(tokenAtom); // Jotai로 토큰 가져오기

  useEffect(() => {
    // Fetch user data from the server
    fetch('http://localhost:8080/api/mypage/userinfoedit', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if needed
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

// Daum Postcode API handler
const handleAddressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let addr = ""; // 주소 변수
      let extraAddr = ""; // 참고항목 변수

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName && data.apartment === "Y") {
          extraAddr += (extraAddr !== "" ? ", " + data.buildingName : data.buildingName);
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      setUserData((prevData) => ({
        ...prevData,
        postcode: data.zonecode,
        address: addr,
        extraAddress: extraAddr,
      }));

      document.getElementById("detailAddress").focus();
    },
  }).open();
};


  const handleEditClick = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field], // Toggle edit mode for the specific field
    }));
  };

  const handleUpdate = (field) => {
    
    const addressFields = ['postcode', 'address', 'detailAddress', 'extraAddress'];
    // body 생성: 주소 필드인 경우 여러 필드를 포함, 그 외에는 단일 필드만 포함
    const body = field === 'address'
      ? addressFields.reduce((acc, key) => ({ ...acc, [key]: userData[key] }), { username: userData.username })
      : { [field]: userData[field], username: userData.username };
      console.log('Generated Body:', body); // 생성된 body 확인

    fetch(`http://localhost:8080/api/mypage/userinfoupdate`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // 필요한 데이터만 전송
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('업데이트에 실패했습니다.');
      }
      return response.json();
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${field}가 성공적으로 수정되었습니다.`);
        setEditMode((prev) => ({
          ...prev,
          [field]: false, // Exit edit mode after successful update
        }));
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };


  
  return (
    <div>
      <Header />
      <div className={styles.layout}>
        <div className={styles.sideNav}>
          <SideNav />
        </div>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>회원정보 수정</h1>
          <div className={styles.container}>
            <div className={styles.imageSection}>
              <div className={styles.imagePlaceholder}>이미지사진</div>
              <span className={styles.role}>[{userData.role || '일반회원'}]</span>
              {/* DB의 유저 role에 따라 일반회원/바뀌어야함 */}
            </div>
            <div className={styles.infoSection}>
              <div className={styles.row}>
                <span className={styles.label}>이름</span>
                <span className={`${styles.value} ${styles.adjustedValue}`}>{userData.name}</span>
                {/* DB에서 name 가져와야함 */}
              </div>
              
              <div className={styles.row}>
                <span className={styles.label}>아이디</span>
                <span className={`${styles.value} ${styles.adjustedValue}`}>{userData.username}</span>
                {/* DB에서 username(=id) 가져와야함 */}
              </div>
              <div className={styles.row}>
                <span className={styles.label}>비밀번호</span>
                {editMode.password ? (
                  <input
                    type="password"
                    className={styles.value}
                    value={userData.password || ''}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                ) : (
                  <span className={styles.value}>****************</span>
                )}
                <button
                  className={styles.editButton}
                  onClick={() =>
                    editMode.password ? handleUpdate('password') : handleEditClick('password')
                  }
                >
                  {editMode.password ? '확인' : '수정하기'}
                </button>
              
                {/* 암호화 되어있는 password이기 때문에 즉시 update */}
              </div>
              <div className={styles.row}>
                <span className={styles.label}>휴대폰 번호</span>
                {editMode.phone ? (
                  <input
                    type="text"
                    className={styles.value}
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                ) : (
                  <span className={styles.value}>{userData.phone}</span>
                )}
                <button
                  className={styles.editButton}
                  onClick={() =>
                    editMode.phone ? handleUpdate('phone') : handleEditClick('phone')
                  }
                >
                  {editMode.phone ? '확인' : '수정하기'}
                </button>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>주소</span>
                {editMode.address ? (
                  <div className={styles.address}>
                    <div className={styles.inputGroup}>
                      <input
                        type="text"
                        id="postcode"
                        value={userData.postcode}
                        onChange={(e) => setUserData({ ...userData, postcode: e.target.value })}
                        placeholder="우편번호"
                      />
                      <button type="button" onClick={handleAddressSearch}>
                        찾기
                      </button>
                    </div>
                    <input
                      type="text"
                      id="address"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      placeholder="주소"
                    />
                    <input
                      type="text"
                      id="detailAddress"
                      value={userData.detailAddress}
                      onChange={(e) =>
                        setUserData({ ...userData, detailAddress: e.target.value })
                      }
                      placeholder="상세주소"
                    />
                    <input
                      type="text"
                      id="extraAddress"
                      value={userData.extraAddress}
                      onChange={(e) =>
                        setUserData({ ...userData, extraAddress: e.target.value })
                      }
                      placeholder="참고항목"
                    />
                  </div>
                ) : (
                  <div className={styles.address}>
                    <span>{userData.postcode}</span>
                    <span>{userData.address}</span>
                    <span>{userData.detailAddress}</span>
                    <span>{userData.extraAddress}</span>
                  </div>
                )}
                <button
                  className={styles.editButton}
                  onClick={() =>
                    editMode.address
                      ? handleUpdate('address') // "확인" 버튼 클릭 시 업데이트 호출
                      : setEditMode((prev) => ({ ...prev, address: !prev.address })) // "수정하기" 버튼 클릭 시 모드 변경
                  }
                >
                  {editMode.address ? "확인" : "수정하기"}
                </button>

              </div>
              <div className={styles.row}>
                <span className={styles.label}>이메일</span>
                {editMode.email ? (
                  <input
                    type="text"
                    className={styles.value}
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                ) : (
                  <span className={styles.value}>{userData.email}</span>
                )}
                <button
                  className={styles.editButton}
                  onClick={() =>
                    editMode.email ? handleUpdate('email') : handleEditClick('email')
                  }
                >
                  {editMode.email ? '확인' : '수정하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoEdit;
