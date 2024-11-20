import React, { useState } from 'react';
import styles from '../../css/shop/SaleOrder.module.css';
import Header from '../Header';

const SaleOrder = () => {
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
                            src={`${process.env.PUBLIC_URL}/img/funding/image5.png`}
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
                                    <span className={styles.icon}>👤</span>
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
                                    <span className={styles.icon}>📞</span>
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
                                    <span className={styles.icon}>📧</span>
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
                                    <span className={styles.icon}>📍</span>
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
                        <div className={styles.artworkDetails}>
                            <h3 className={styles.titleName}>{artworkDetails.title}</h3>
                            <p>
                                <span className={styles.title}>ARTIST</span>
                                <span className={styles.content}>{artworkDetails.artist}</span>
                            </p>
                            <p>
                                <span className={styles.title}>SIZE</span>
                                <span className={styles.content}>{artworkDetails.size}</span>
                            </p>
                            <p>
                                <span className={styles.title}>PRICE</span>
                                <span className={styles.content}>{artworkDetails.price.toLocaleString()}원</span> 
                            </p>
                            <p>
                                <span className={styles.title}>STOCK</span>
                                <span className={styles.content}>{artworkDetails.stock}개</span>
                            </p>
                            <p>
                                <span className={styles.title}>Option</span>
                                <span className={styles.content}>{artworkDetails.option}</span>
                            </p>
                        </div>
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
    );
};

export default SaleOrder;
