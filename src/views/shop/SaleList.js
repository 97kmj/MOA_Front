import React, { useState,useEffect } from 'react';
import styles from '../../css/shop/ArtSaleList.module.css';
import Header from "../Header";
import { useNavigate } from 'react-router';
import { Button } from 'reactstrap';
import { url } from "../../config";
import axios from 'axios';

const SaleList = () => {
    
    const [searchKeyword, setSearchKeyword] = useState(""); //검색어
    const [category, setCategory] = useState([]); 
    const [categoryId, setCategoryId] = useState("");
    const [types, setTypes] = useState([]);
    const [typeId, setTypesId] = useState("");
    const [themes, setThemes] = useState([]);
    const [subjectId, setSubjectId] = useState("");
    const [artworks, setArtworks] = useState([]); // 백엔드에서 가져온 데이터를 저장
    const [visibleCount, setVisibleCount] = useState(8); // 표시할 데이터 수
    const navigate = useNavigate(); 
    
    const goDetailNavigation = (artworkId) => {  //디테일 이동
        navigate(`/shop/saleDetail/${artworkId}`);
    }

      // 더보기 버튼 클릭 시
    const loadMore = () => setVisibleCount((prev) => prev + 8);

    useEffect(()=> {
        const queryParams = new URLSearchParams({
            categoryId,
            typeId,
            subjectId,
            keyword: searchKeyword,
            page: 0,
            size: visibleCount,
        }).toString()
        const page =0;

        const listUrl = `${url}/shop/saleList?$category=${categoryId}&type=${typeId}&subject=${subjectId}&keyword=${searchKeyword}&page=${page}&size=${visibleCount}`;
        axios.get(listUrl)
            .then(res =>{
                console.log(res.data);

                if(res.data == 0){
                    // alert("찾으시는 검색조건이 없습니다.")
                }else{
                    setArtworks(res.data)
                }
            })
            .catch(err=>{
                alert("상세페이지 가져오지 못하였습니다.", err);
            });
            
    }, [categoryId, typeId, subjectId, searchKeyword, visibleCount])







    // 카테고리 가져오기
    useEffect(() => {
        axios.get(`${url}/shop/artworkAdd`)
            .then(res => {
                console.log(res.data);
                setCategory(res.data);  
            })
            .catch(error => {
                console.error("카테고리 불러오기 오류", error);
            });
    },[]);
    // 타입하고 주제 가져오기
    useEffect(() => {
        if (categoryId) {
            axios.post(`${url}/shop/artworkAdd/type/${categoryId}`)
                .then(res => {
                    setTypes(res.data); // API에서 가져온 타입 데이터 저장
                })
                .catch(error => {
                    console.error("타입 데이터 불러오기 오류", error);
                });

            axios.post(`${url}/shop/artworkAdd/subject/${categoryId}`)
                .then(res => {
                    setThemes(res.data); // API에서 가져온 주제 데이터 저장
                })
                .catch(error => {
                    console.error("주제 데이터 불러오기 오류", error);
                });
        }
    }, [categoryId]);

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        setTypes([]);  // 타입 초기화
        setThemes([]);  // 주제 초기화
        console.log(e.target.value)
    };
    const handleTypeChange = (e) => {
 
        setTypesId(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubjectId(e.target.value);
    };




    return (
        <>
        <Header/>
            <div className={styles.container}>
                <h3 >판매리스트</h3>
                <div className={styles.bar}></div>

                <div className={styles.filters}>
                    <div className={styles.selectGroup}>
                        <select
                            value={artworks.categoryId}
                            onChange={handleCategoryChange}
                            className={styles.filter}
                            id='categoryId'
                            name='categoryId'

                        >
                        <option value="">종류</option>
                        {category.map((categoryItem) => (
                            <option key={categoryItem.categoryId} value={categoryItem.categoryId}>
                                {categoryItem.categoryName}
                            </option>
                        ))}
                        </select>
                        <select className={styles.filter}
                            value={typeId}
                            onChange={handleTypeChange}
                            id='typeId'
                            name='typeId'
                            disabled={!categoryId}>
                            <option value="">타입 선택</option>
                            {types.length > 0 && types.map((typeItem) => (
                                <option key={typeItem.typeId} value={typeItem.typeId}>
                                    {typeItem.typeName}
                                </option>
                            ))}
                        </select>
                        <select className={styles.filter}
                            value={subjectId}
                            onChange={handleSubjectChange}
                            id='subjectId'
                            name='subjectId'
                            disabled={!categoryId}>
                            <option value="">주제 선택</option>
                            {themes.map((subjectItem) => (
                                <option key={subjectItem.subjectId} value={subjectItem.subjectId}>
                                    {subjectItem.subjectName}
                                </option>
                            ))}
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
                    {artworks.map((item) => (
                        <div className={styles.card} key={item.artworkId} onClick={()=> goDetailNavigation(item.artworkId)}>
                            <div className={styles.imageWrapper}>
                                <img src={item.imageUrl} alt={item.title} className={styles.image}/>
                            </div>
                            <div>
                                <div className={styles.info}>
                                    <p className={styles.title}>{item.title}</p>
                                    <p className={styles.artistName}>{item.artistName}</p>
                                    <p className={styles.price}>{item.price}</p>
                                    <p className={styles.category}>{item.subjectName}{item.typeName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.seemore} onClick={loadMore}>
                <button>
                    더보기
                    <img className={styles.seemore} src="/img/seemore.png"/>
                </button>
            </div>  

        </>
    )
        ;
};

export default SaleList;
