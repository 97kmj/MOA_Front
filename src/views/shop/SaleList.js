import React, { useState } from 'react';
import styles from '../../css/shop/SaleList.module.css';
import Header from "../Header";

const SaleList = () => {
    const [selectedCategory, setSelectedCategory] = useState("종류");
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const saleData = [
        { id: 1, title: "투우", artist: "피카소", price: "2,200,000₩",   description: "풍경화 수채화", image: "../logo192.png", },
        { id: 3, title: "투우", artist: "피카소", price: "2,200,000₩",   description: "풍경화 수채화",image: `${process.env.PUBLIC_URL}/img/funding/image4.png` },
        { id: 4, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image5.png` },
        { id: 5, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image6.png` },
        { id: 6, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image3.png` },
        { id: 7, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image4.png` },
        { id: 2, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: "../logo192.png", },
        { id: 8, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image5.png` },
        { id: 9, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image6.png` },
        { id: 10, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image3.png` },

    ];

    return (
        <>
        <Header/>
            <div className={styles.container}>
                <h3 >판매리스트</h3>
                <div className={styles.bar}></div>

                <div className={styles.filters}>
                    <div className={styles.selectGroup}>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className={styles.filter}
                        >
                            <option>종류</option>
                        </select>
                        <select className={styles.filter}>
                            <option>타입</option>
                        </select>
                        <select className={styles.filter}>
                            <option>주제</option>
                        </select>
                    </div>
                    <div className={styles.searchGroup}>
                        <input
                            type="text"
                            placeholder="검색"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>🔍</button>
                    </div>

                    <select className={styles.filter}>
                        <option>최신순</option>
                    </select>
                </div>


                <div className={styles.grid}>
                    {saleData.map((item) => (
                        <div className={styles.card} key={item.id}>
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.title} className={styles.image}/>
                            </div>
                            <div>
                                <div className={styles.info}>
                                    <p className={styles.title}>{item.title}</p>
                                    <p className={styles.artist}>{item.artist}</p>
                                    <p className={styles.price}>{item.price}</p>
                                    <p className={styles.category}>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
        ;
};

export default SaleList;
