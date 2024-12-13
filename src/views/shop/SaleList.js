import React, { useState,useEffect } from 'react';
import styles from '../../css/shop/ArtSaleList.module.css';
import Header from "../Header";
import { useNavigate } from 'react-router';
import { url } from "../../config";
import axios from 'axios';
import { tokenAtom, userAtom } from '../../atoms';
import { useAtomValue, useSetAtom,useAtom } from 'jotai';


const SaleList = () => {
    const user = useAtomValue(userAtom);
    const [token,setToken] = useAtom(tokenAtom);
    const [category, setCategory] = useState([]); // 카테고리 리스트 가져오기
    const [types, setTypes] = useState([]); // 타입 리스트 가져오기
    const [themes, setThemes] = useState([]); // 주제 리스트 가져오기

    const [fillters, setFillters] = useState({categoryId:'', typeId:'',subjectId:'', saleStatus:'', searchKeyword:'' })
    const [artworks, setArtworks] = useState([]); // 백엔드에서 가져온 데이터를 저장
    const [more, setMore] = useState(true);
    const [page, setPage] = useState(1);

    const [visibleCount, setVisibleCount] = useState(8); // 표시할 데이터 수
    const navigate = useNavigate(); 
    
    const goDetailNavigation = (artworkId) => {  //디테일 이동
        navigate(`/shop/saleDetail/${artworkId}`);
    }

      // 더보기 버튼 클릭 시
    const loadMore = () => {
        fetchArtworks(page, fillters);
    }

    const fetchArtworks = (pPage, pFillters) => {
        setMore(true);
        const queryParams = new URLSearchParams({
            ...(pFillters.categoryId && {categoryId: pFillters.categoryId}),
            ...(pFillters.subjectId && {subjectId : pFillters.subjectId}),
            ...(pFillters.typeId && {typeId : pFillters.typeId}),
            ...(pFillters.searchKeyword && {searchKeyword : pFillters.searchKeyword}),
            ...(pFillters.saleStatus && {saleStatus : pFillters.saleStatus}),
            page: pPage-1,
            size: 8,
        }).toString();

        axios.get(`${url}/shop/saleList?${queryParams}`)
            .then(res =>{
                console.log(res)
                if(pPage===1) {
                    setArtworks([...res.data.artworks]);
                  } else {
                    setArtworks([...artworks, ...res.data.artworks])
                  }
                if(pPage>=res.data.allPage) {
                    setMore(false);
                }
                setPage(pPage+1);
            })
            .catch(err=>{
                console.log(err);    
            });
    }
 
    // 카테고리 가져오기
    useEffect(() => {
        axios.get(`${url}/shop/artworkAdd`)
            .then(res => {
                setCategory(res.data);  
            })
            .catch(error => {
                console.error("카테고리 불러오기 오류", error);
            });
        fetchArtworks(1, fillters);
    },[]);

    // 타입하고 주제 가져오기
    useEffect(() => {
        if (fillters.categoryId) {
            axios.post(`${url}/shop/artworkAdd/type/${fillters.categoryId}`)
                .then(res => {
                    setTypes(res.data); // API에서 가져온 타입 데이터 저장
                })
                .catch(error => {
                    console.error("타입 데이터 불러오기 오류", error);
                });

            axios.post(`${url}/shop/artworkAdd/subject/${fillters.categoryId}`)
                .then(res => {
                    setThemes(res.data); // API에서 가져온 주제 데이터 저장
                })
                .catch(error => {
                    console.error("주제 데이터 불러오기 오류", error);
                });
        }
    }, [fillters.categoryId]);

    const handleCategoryChange = (e) => {
        const changeFillters = {...fillters, [e.target.name]:e.target.value,typeId:'', subjectId:''};
        setFillters(changeFillters)
        setTypes([]);
        setThemes([]);
        fetchArtworks(1, changeFillters);
    }

    const handleFillterChange = (e) => {
        const changeFillters = {...fillters, [e.target.name]:e.target.value};
        setFillters(changeFillters)
        fetchArtworks(1, changeFillters);

    };
    
    //관리자 작품 블랙리스트 체크박스
    const handleCheckboxChange = (artworkId, isChecked) => {
        axios.post(`${url}/updateArtworkStatus`,{
            artworkId,
            isSuspicious : isChecked //의심체크 여부 
        },{
            headers: {
                Authorization : token
            }
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
                        <div className={styles.customSelect}>
                            <select
                                value={fillters.categoryId}
                                onChange={handleCategoryChange}
                                id='categoryId'
                                name='categoryId'>
                            <option value="" > 카테고리 : 전체</option>
                            {category.map((categoryItem) => (
                                <option key={categoryItem.categoryId} value={categoryItem.categoryId}>
                                   카테고리 : {categoryItem.categoryName}
                                </option>
                            ))}
                            </select>

                        </div>
                        <div className={styles.customSelect}>
                            <select className={styles.filter}
                                value={fillters.typeId}
                                onChange={handleFillterChange}
                                id='typeId'
                                name='typeId'
                                >

                                <option value="">종류 : 전체</option>
                                {types.map((typeItem) => (
                                    <option key={typeItem.typeId} value={typeItem.typeId}>
                                        종류 : {typeItem.typeName} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.customSelect}>
                            <select className={styles.filter}
                                value={fillters.subjectId}
                                onChange={handleFillterChange}
                                id='subjectId'
                                name='subjectId'>
                                <option value="">주제 : 전체</option>
                                {themes.map((subjectItem) => (
                                    <option key={subjectItem.subjectId} value={subjectItem.subjectId}>
                                        주제 : {subjectItem.subjectName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.searchGroup} >
                        <input
                            type="text"
                            placeholder="작가 검색"
                            value={fillters.searchKeyword}
                            name="searchKeyword"
                            onChange={handleFillterChange}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.customSelect}>
                        <select className={styles.filter} onChange={handleFillterChange} name="saleStatus">
                            <option value="">전체</option>
                            <option value="AVAILABLE" >판매중</option>
                            <option value="SOLD_OUT">판매완료</option>
                        </select>
                    </div>
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
                                    <div className={styles.title}>{item.title}</div>
                                    <p className={styles.artistName}>{item.artistName}</p>
                                    <p className={styles.price}>{item.price.toLocaleString()}원</p>
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
            {more && (
                <div className={styles.seemore} onClick={loadMore}>
                    <button>
                        <img className={styles.seemore} src="/img/seemore.png"/>
                    </button>
                </div>  
            )}
        </>
    )
        ;
};

export default SaleList;
