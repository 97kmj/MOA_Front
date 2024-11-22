import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/gallery/Gallery.module.css";
import Header from "../Header";

const Dropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // 드롭다운 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={`${styles.btn} ${styles.dropdownBtn}`} onClick={toggleDropdown}>
        {label}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <label key={index} className={styles.dropdownItem}>
              <input type="checkbox" className={styles.dropdownCheckbox} /> {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const [viewMode, setViewMode] = useState("gallery");
  const [visibleCount, setVisibleCount] = useState(8); // 리스트 모드에서 더보기로 로드할 개수
  const [currentIndex, setCurrentIndex] = useState(0); // 갤러리 모드에서 중심 이미지 인덱스
  const [slideDirection, setSlideDirection] = useState(""); // 슬라이드 방향 (left/right)
  const navigate = useNavigate();

  const data = Array.from({ length: 40 }).map((_, index) => ({
    id: index + 1,
    title: `작품 제목 ${index + 1}`,
    image: `https://via.placeholder.com/300x200?text=작품+${index + 1}`,
  }));

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  const handlePrev = () => {
    setSlideDirection("left"); // 왼쪽 이동
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }, 300); // 애니메이션 시간과 동기화
  };

  const handleNext = () => {
    setSlideDirection("right"); // 오른쪽 이동
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 300); // 애니메이션 시간과 동기화
  };

  const visibleItems = (() => {
    // 현재 인덱스를 기준으로 5개의 데이터를 계산
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(data[(currentIndex + i) % data.length]);
    }
    return items;
  })();

  const handleCardClick = (id) => {
  navigate(`/gallery/gallerydetail/${id}`);
};

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>나만의 갤러리</h1>
            <div className={styles.viewButtons}>
              <button
                className={`${styles.btn} ${viewMode === "gallery" ? styles.btnActive : ""}`}
                onClick={() => setViewMode("gallery")}
              >
                갤러리로 보기
              </button>
              <button
                className={`${styles.btn} ${viewMode === "list" ? styles.btnActive : ""}`}
                onClick={() => setViewMode("list")}
              >
                리스트로 보기
              </button>
            </div>
          </div>
          <hr className={styles.separator} />
        </header>

        <div className={styles.filters}>
          <div className={styles.filterButtons}>
            <Dropdown label="주제" options={["주제 1", "주제 2", "주제 3"]} />
            <Dropdown label="종류" options={["종류 1", "종류 2", "종류 3"]} />
            <Dropdown label="타입" options={["타입 1", "타입 2", "타입 3"]} />
          </div>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="검색"
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
                  key={item.id}
                  className={`${styles.galleryItem} ${
                    index === 2 ? styles.centerItem : ""
                  }`}
                >
                  <img
                    src={item.image}
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
            {data.slice(0, visibleCount).map((item) => (
              <div
                className={styles.card}
                key={item.id}
                onClick={() => handleCardClick(item.id)}
              >
                <img src={item.image} alt={item.title} className={styles.cardImage} />
                <h2 className={styles.cardTitle}>{item.title}</h2>
              </div>
            ))}
            {visibleCount < data.length && (
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
