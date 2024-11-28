import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/gallery/Gallery.module.css";
import Header from "../Header";

import { Gallery as GridGallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Type과 Category의 옵션 매핑
const OPTIONS = {
  그림: {
    type: ["유화", "수채화", "아크릴화", "수묵화", "채색화", "판화", "기타"],
    subject: [
      "풍경화",
      "인물화",
      "정물화",
      "크로키",
      "추상화",
      "초상화",
      "기타",
    ],
  },
  조소: {
    type: [
      "석조",
      "목조",
      "아조",
      "점토상",
      "석고상",
      "청동상",
      "테라코타",
      "기타",
    ],
    subject: ["마스크", "흉상", "반신상", "전신상", "토르소", "등신상", "기타"],
  },
  공예: {
    type: ["석공예", "목공예", "유리공예", "도자공예", "기타"],
    subject: ["기타"],
  },
};

// Dropdown 컴포넌트
const Dropdown = ({ label, options, onChange,selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // 드롭다운 외부 클릭 시 닫기
    }
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option === "전체" ? null : option); // 전체 선택 시 null 전달
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.btn} ${styles.dropdownBtn}`}
        onClick={toggleDropdown}
      >
        {label}: {selectedValue || "전체"}
        </button>
      {isOpen && (
         <div className={styles.dropdownMenu}>
           <div
            className={styles.dropdownItem}
            onClick={() => handleOptionClick("전체")}
          >
            전체
          </div>
         {options.map((option, index) => (
           <div
             key={index}
             className={styles.dropdownItem}
             onClick={() => handleOptionClick(option)}
           >
             {option}
           </div>
         ))}
       </div>
     )}
   </div>
 );
};

// Gallery 컴포넌트
const Gallery = () => {
  const [viewMode, setViewMode] = useState("list"); // 기본 모드는 리스트
  const [artworks, setArtworks] = useState([]); // 백엔드에서 가져온 데이터를 저장
  const [visibleCount, setVisibleCount] = useState(8); // 표시할 데이터 수  
  const [filters, setFilters] = useState({
    subject: "",
    type: "",
    category: "",
  }); // 필터 상태

  const [search, setSearch] = useState(""); // 검색어 상태
  const [lightboxIndex, setLightboxIndex] = useState(-1); // Lightbox 상태
  
  const navigate = useNavigate();

  
  // Type과 Category 옵션 상태
  const [typeOptions, setTypeOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);


  // 카테고리 변경 시 Subject와 Type 업데이트
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
      subject: "",
      type: "",
    }));
    if (category) {
      setSubjectOptions(OPTIONS[category].subject);
      setTypeOptions(OPTIONS[category].type);
    } else {
      setSubjectOptions([]);
      setTypeOptions([]);
    }
  };

// 필터 변경 핸들러
const handleFilterChange = (key, value) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    [key]: value,
  }));
};


  // 백엔드 API에서 데이터 가져오기
  useEffect(() => {
    const fetchArtworks = async () => {
      try {

        const queryParams = new URLSearchParams({
          ...(filters.category && { category: filters.category }),
          ...(filters.subject && { subject: filters.subject }),
          ...(filters.type && { type: filters.type }),
          ...(search && { search }),
          page: 0,
          size: visibleCount,
        }).toString();

        const response = await fetch(
          `http://localhost:8080/api/artworks?${queryParams}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setArtworks(data); // 데이터가 배열인 경우 바로 설정
        } else if (data.content) {
          setArtworks(data.content); // content 키에서 배열 추출
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      }
};


    fetchArtworks();
  }, [filters, search, visibleCount]); // 필터, 검색어, visibleCount 변경 시 데이터 가져오기

  // 검색 입력 필드 핸들러
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // 검색어 상태 업데이트
  };


  // 더보기 버튼 클릭 시
  const loadMore = () => setVisibleCount((prev) => prev + 8);

  // 카드 클릭 핸들러
  const handleCardClick = (id) => {
    navigate(`/gallery/gallerydetail/${id}`);
  };

  // 데이터 로드
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const queryParams = new URLSearchParams({
          ...(filters.category && { category: filters.category }),
          ...(filters.subject && { subject: filters.subject }),
          ...(filters.type && { type: filters.type }),
          ...(search && { search }),
          page: 0,
          size: visibleCount,
        }).toString();

        const response = await fetch(
          `http://localhost:8080/api/artworks?${queryParams}`
        );
        const data = await response.json();
        setArtworks(data.content || data || []);
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      }
    };

    fetchArtworks();
  }, [filters, search, visibleCount]);

  // 갤러리 모드 이미지 데이터 변환
  const galleryImages = artworks.map((artwork) => ({
  src: artwork.imageUrl,
  thumbnail: artwork.imageUrl,
  thumbnailWidth: 320,
  thumbnailHeight: 213,
  caption: artwork.title,
  }));

  console.log("Gallery Images:", galleryImages);
  console.log("GridGallery Data:", galleryImages);
  console.log("Rendering GridGallery:", viewMode === "gallery");


  const lightboxSlides = artworks.map((artwork) => ({
  src: artwork.imageUrl,
  width: 1600,
  height: 1200,
  }));

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>온라인 갤러리</h1>
            <div className={styles.viewButtons}>
              <button
                className={`${styles.btn} ${
                  viewMode === "gallery" ? styles.btnActive : ""
                }`}
                onClick={() => setViewMode("gallery")}
              >
                갤러리로 보기
              </button>
              <button
                className={`${styles.btn} ${
                  viewMode === "list" ? styles.btnActive : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                리스트로 보기
              </button>
            </div>
          </div>
          <hr className={styles.separator} />
        </header>

        <div className={styles.filters}>
          <div className={styles.filters}>
          <Dropdown
            label="카테고리"
            options={Object.keys(OPTIONS)}
            onChange={handleCategoryChange}
            selectedValue={filters.category}
          />
          <Dropdown
            label="종류"
            options={typeOptions}
            onChange={(value) => handleFilterChange("type", value)}
            selectedValue={filters.type}
          />
          <Dropdown
            label="주제"
            options={subjectOptions}
            onChange={(value) => handleFilterChange("subject", value)}
            selectedValue={filters.subject}
          />
          
        </div>
          <div className={styles.search}>
            <input
             type="text"
             value={search}
             onChange={handleSearchChange}
             placeholder="작가 및 작품 검색"
             className={styles.searchInput}
            />
            <button className={styles.searchBtn}>🔍</button>
          </div>
        </div>

        {/* 갤러리 모드 */}
        {viewMode === "gallery" && (
          <div className={styles.galleryView}>
            <GridGallery
              images={galleryImages}
              onClick={(index) => {
                console.log("Image Clicked at Index:", index);
                setLightboxIndex(index);
              }}
              enableImageSelection={false}
            />
            <Lightbox
              slides={lightboxSlides}
              open={lightboxIndex >= 0}
              index={lightboxIndex}
              close={() => setLightboxIndex(-1)}
            />
          </div>
        )}

        {viewMode === "list" && (
          <div className={styles.listgalleryGrid}>
            {Array.isArray(artworks) && artworks.map((artwork) => (
              <div
                className={styles.card}
                key={artwork.artworkId}
                onClick={() => handleCardClick(artwork.artworkId)}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className={styles.cardImage}
                />
                <h2 className={styles.cardTitle}>{artwork.title}</h2>
                {/* <p className={styles.cardDescription}>{artwork.description}</p>
                <p className={styles.cardPrice}>{`₩${artwork.price.toLocaleString()}`}</p>
                <p className={styles.cardArtist}>아티스트: {artwork.artist.name}</p> */}
                <p className={styles.cardCategory}>카테고리: {artwork.category.categoryName}</p>
                {/* <p className={styles.cardLikes}>좋아요: {artwork.likeCount}</p>
                <p className={styles.cardSaleStatus}>판매 상태: {artwork.saleStatus}</p> */}
              </div>
            ))}
            {artworks.length >= visibleCount && (
              <div className={styles.loadMore}>
                <button className={styles.btn} onClick={loadMore}>
                  더보기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
