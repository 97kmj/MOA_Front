import React, { useState } from "react";
import styles from "../../css/gallery/gallery.module.css";

// Dropdown 컴포넌트
const Dropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.dropdown}>
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
  const [viewMode, setViewMode] = useState("list"); // 초기 뷰 모드: 리스트
  const [visibleCount, setVisibleCount] = useState(8); // 표시할 카드 수

  // 데이터 배열
  const data = Array.from({ length: 40 }).map((_, index) => ({
    id: index + 1,
    title: `작품 설명 ${index + 1}`,
    image: `https://via.placeholder.com/300x200?text=작품+${index + 1}`, // 샘플 이미지
  }));

  const loadMore = () => setVisibleCount(visibleCount + 8); // 더보기 버튼 클릭 시 8개 추가

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>GALLERY</h1>
        <hr className={styles.separator} />
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

      {viewMode === "list" ? (
        <div className={styles.galleryGrid}>
          {data.slice(0, visibleCount).map((item) => (
            <div className={styles.card} key={item.id}>
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
      ) : (
        <div className={styles.galleryView}>
          {data.map((item, index) => (
            <div
              className={styles.galleryCard}
              key={item.id}
              style={{
                transform: `rotateY(${index * 15}deg) translateZ(300px)`,
              }}
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
      )}
    </div>
  );
};

export default Gallery;
