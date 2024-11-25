import React, { useState } from 'react';
import styles from '../../css/shop/ArtSaleList.module.css';
import Header from "../Header";
import { useNavigate } from 'react-router';
import { Button } from 'reactstrap';

const SaleList = () => {
    const [selectedCategory, setSelectedCategory] = useState("종류");
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    //디테일 이동
    const navigate = useNavigate();

    const goDetailNavigation = (artworkId) => {
        navigate(`/shop/saleDetail/${artworkId}`);
    }

    const saleData = [
        { artworkId: 1, title: "투우", artist: "피카소", price: "2,200,000₩",   description: "풍경화 수채화", image: "../logo192.png", },
        { artworkId: 3, title: "투우", artist: "피카소", price: "2,200,000₩",   description: "풍경화 수채화",image: `${process.env.PUBLIC_URL}/img/funding/image4.png` },
        { artworkId: 4, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image5.png` },
        { artworkId: 5, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image6.png` },
        { artworkId: 6, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image3.png` },
        { artworkId: 7, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image4.png` },
        { artworkId: 2, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: "../logo192.png", },
        { artworkId: 8, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image5.png` },
        { artworkId: 9, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image6.png` },
        { artworkId: 10, title: "투우", artist: "피카소", price: "2,200,000₩",  description: "풍경화 수채화", image: `${process.env.PUBLIC_URL}/img/funding/image3.png` },

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
                       
                        <button className={styles.searchButton}>
                            <img src='/img/search.png' />
                        </button>
                    </div>

                    <select className={styles.filter}>
                        <option>최신순</option>
                    </select>
                </div>


                <div className={styles.grid}>
                    {saleData.map((item) => (
                        <div className={styles.card} key={item.id} onClick={()=> goDetailNavigation()}>
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
            <div className={styles.seemore}>
                <button><img className={styles.seemore} src="/img/seemore.png"/></button>
            </div>  

        </>
    )
        ;
};

export default SaleList;
