import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../../atoms";
import styles from "../../css/gallery/Gallery.module.css";
import Header from "../Header";

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
const MyGallery = () => {
  const [viewMode, setViewMode] = useState("list"); // 기본 모드는 리스트
  const [artworks, setArtworks] = useState([]); // 백엔드에서 가져온 데이터를 저장  
  const [visibleCount, setVisibleCount] = useState(8); // 표시할 데이터 수
  const [currentIndex, setCurrentIndex] = useState(0); // 갤러리 모드에서 중심 이미지 인덱스
  const [slideDirection, setSlideDirection] = useState(""); // 갤러리 모드 슬라이드 방향
  
  const [filters, setFilters] = useState({
    subject: "",
    type: "",
    category: "",
  }); // 필터 상태
  const token = useAtomValue(tokenAtom); // JWT 토큰 가져오기

  const navigate = useNavigate();

  
  // Type과 Category 옵션 상태
  const [typeOptions, setTypeOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [search, setSearch] = useState(""); // 검색어 상태


// 검색 입력 필드 핸들러
const handleSearchChange = (event) => {
  setSearch(event.target.value); // 검색어 상태 업데이트
};
  // 백엔드 API에서 좋아요한 작품 데이터 가져오기
   useEffect(() => {
    const fetchLikedArtworks = async () => {
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
          `http://localhost:8080/api/like/artworks?${queryParams}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Failed to fetch liked artworks:", error);
      }
    };

    fetchLikedArtworks();
  }, [filters, search, visibleCount, token]);

  // 필터 변경 핸들러
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // 카테고리 변경 시 옵션 업데이트
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

  // 더보기 버튼 클릭 시
  const loadMore = () => setVisibleCount((prev) => prev + 8);

  // 카드 클릭 핸들러
  const handleCardClick = (id) => {
    navigate(`/gallery/gallerydetail/${id}`);
  };

  

  // 갤러리 모드: 이전 버튼
  const handlePrev = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
    }, 300);
  };

  // 갤러리 모드: 다음 버튼
  const handleNext = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
    }, 300);
  };

  // 갤러리 모드에서 보이는 아이템 계산
  const visibleItems = (() => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(artworks[(currentIndex + i) % artworks.length]);
    }
    return items;
  })();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>나만의 갤러리</h1>
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

        {viewMode === "gallery" && (
          <div className={styles.galleryView}>
            <button className={styles.arrowLeft} onClick={handlePrev}>
              ◀
            </button>
            <div className={`${styles.galleryItems} ${styles[slideDirection]}`}>
              {visibleItems.map((item, index) => (
                <div
                  key={item.artworkId}
                  className={`${styles.galleryItem} ${
                    index === 2 ? styles.centerItem : ""
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={styles.galleryImage}
                  />
                  <h2 className={styles.galleryTitle}>{item.title}</h2>
                </div>
              ))}
            </div>
            <button className={styles.arrowRight} onClick={handleNext}>
              ▶
            </button>
          </div>
        )}

        {viewMode === "list" && (
          <div className={styles.galleryGrid}>
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

export default MyGallery;
