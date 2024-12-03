import React, { useState,useEffect } from 'react';
import styles from '../../css/shop/ArtSaleList.module.css';
import Header from "../Header";
import { useNavigate } from 'react-router';
import { url } from "../../config";
import axios from 'axios';
import { userAtom } from '../../atoms';
import { useAtomValue } from 'jotai';

const SaleList = () => {
    const user = useAtomValue(userAtom);
    const [searchKeyword, setSearchKeyword] = useState(""); //검색어
    const [category, setCategory] = useState([]); // 카테고리 리스트 가져오기
    const [types, setTypes] = useState([]); // 타입 리스트 가져오기
    const [themes, setThemes] = useState([]); // 주제 리스트 가져오기

    const [categoryId, setCategoryId] = useState(""); //카테고리 id 
    const [categoryName, setCategoryName] = useState(""); //카테고리 name
    const [typeId, setTypesId] = useState("");  // 타입 이름 넣어야함
    const [subjectId, setSubjectId] = useState(""); // 서브젝트 이름넣어야함
    const [saleStatus, setSaleStatus] = useState(""); // 판매상태
  

    const [artworks, setArtworks] = useState([]); // 백엔드에서 가져온 데이터를 저장
    const [visibleCount, setVisibleCount] = useState(8); // 표시할 데이터 수
    const navigate = useNavigate(); 
    
    const goDetailNavigation = (artworkId) => {  //디테일 이동
        navigate(`/shop/saleDetail/${artworkId}`);
    }

      // 더보기 버튼 클릭 시
    const loadMore = () => setVisibleCount((prev) => prev + 8);

    useEffect(() => {

        const queryParams = new URLSearchParams({
            ...(categoryName && {categoryName: categoryName}),
            ...(subjectId && {subjectId : subjectId}),
            ...(typeId && {typeId : typeId}),
            ...(searchKeyword && {searchKeyword : searchKeyword}),
            ...(saleStatus && {saleStatus : saleStatus}),
            page: 0,
            size: visibleCount,
        }).toString();
        
        const page = 0;
        
        const listUrl = `${url}/shop/saleList?${queryParams}`
        axios.get(listUrl)
            .then(res =>{
              
               
                if(res.data == 0){
                    setArtworks([]);

                }else{
                    setArtworks(res.data);
     
                }
            })
            .catch(err=>{
                alert("상세페이지 가져오지 못하였습니다.", err);
    
            });
            
    }, [categoryName, typeId, subjectId, searchKeyword, saleStatus, visibleCount]); // 모든 필터값 변경시마다 호출




    // 카테고리 가져오기
    useEffect(() => {
        axios.get(`${url}/shop/artworkAdd`)
            .then(res => {
             
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
        if (e.target.value === "A"){
            setCategoryName("");
        }else{
            setCategoryName(e.target.selectedOptions[0].text);
        }
        setTypes([]);  // 타입 초기화
        setThemes([]);  // 주제 초기화
 
    };
    const handleTypeChange = (e) => {
 
        setTypesId(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubjectId(e.target.value);
    };

    const handleSearchKeyword = (e) =>{
        setSearchKeyword(e.target.value);

    }
    const handleSaleStatus =(e) =>{
        if (e.target.value === "ALL"){
            setSaleStatus("");
        }else{
            setSaleStatus(e.target.value);
        }
    }


    
    //관리자 작품 블랙리스트 체크박스
    const handleCheckboxChange = (artworkId, isChecked) => {
        axios.post(`${url}/updateArtworkStatus`,{
            artworkId,
            isSuspicious : isChecked //의심체크 여부 
        })
        .then(res=>{
            console.log(res.data);
            if (res.status === 200) {
                setArtworks((prevArtworks) =>
                    prevArtworks.map((artwork) =>
                        artwork.artworkId === artworkId
                            ? { ...artwork, adminCheck: isChecked }
                            : artwork
                    )
                );
            };
        })
        .catch(err=>{
            console.error("아트워크 상태 업데이트 실패:", err);
            alert("작품 상태를 업데이트하는 중 오류가 발생했습니다.");
        })
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
                            value={categoryId}
                            onChange={handleCategoryChange}
                            className={styles.filter}
                            id='categoryId'
                            name='categoryId'>
                        <option value="A" >전체보기</option>
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

                            <option value="">전체보기</option>
                            {types.map((typeItem) => (
                                <option key={typeItem.typeName} value={typeItem.typeName}>
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
                            <option value="">전체보기</option>
                            {themes.map((subjectItem) => (
                                <option key={subjectItem.subjectName} value={subjectItem.subjectName}>
                                    {subjectItem.subjectName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.searchGroup} >
                        <input
                            type="text"
                            placeholder="검색"
                            value={searchKeyword}
                            onChange={handleSearchKeyword}
                            className={styles.searchInput}
                        />
                       
                        <button className={styles.searchButton} >
                            <img src='/img/search.png' />
                            

                        </button>
                    </div>

                    <select className={styles.filter} onChange={handleSaleStatus}>
                        <option value="ALL">전체보기</option>
                        <option value="AVAILABLE" >판매 작품</option>
                        <option value="SOLD_OUT">판매된  작품</option>
                    </select>
                </div>


                <div className={styles.grid}>
                    {artworks.map((item) => (
                        <>
                        <div className={styles.card} key={item.artworkId}>
                            <div className={styles.imageWrapper} onClick={()=> goDetailNavigation(item.artworkId)}>
                                <img src={item.imageUrl} alt={item.title} className={styles.image}/>
                            </div>
                            <div>
                                <div className={styles.info}>
                                    <p className={styles.title}>{item.title}</p>
                                    <p className={styles.artistName}>{item.artistName}</p>
                                    <p className={styles.price}>{item.price}</p>
                                    <p className={styles.category}>{item.subjectName}&nbsp;&nbsp;{item.typeName}</p>
                                </div>
                            {
                                user.role === 'ADMIN' && (
                                    <label>
                                    <input
                                        type="checkbox"
                                        checked={item.adminCheck}
                                        onChange={(e) => handleCheckboxChange(item.artworkId, e.target.checked)}
                                        />
                                        의심작품 선택
                                    </label>   
                                )
                            }
                            </div>
                        </div>
                        
                        </>
                    ))}
                </div>
            </div>
            <div className={styles.seemore} onClick={loadMore}>
                <button>
                    <img className={styles.seemore} src="/img/seemore.png"/>
                </button>
            </div>  

        </>
    )
        ;
};

export default SaleList;
