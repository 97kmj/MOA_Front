import React from "react";
import styles from "../../css/gallery/gallerydetail.module.css";

function GalleryDetail() {
  const defaultImage =
    "https://via.placeholder.com/150"; // 기본 이미지 URL

  return (
    <div className={styles.galleryDetailContainer}>
      <h1 className={styles.pageTitle}>GalleryDetail</h1>
      <div className={styles.galleryDisplayArea}>
        <div className={styles.smallImageArea}>
          <img src={defaultImage} alt="작품 이미지" className={styles.smallImage} />
          <div className={styles.imageDetails}>
            <h2 className={styles.imageTitle}>Title</h2>
            <p><strong>Artist:</strong> 작가명</p>
            <p><strong>Type:</strong> 타입</p>
            <p><strong>Subject:</strong> 주제</p>
            <p><strong>Size:</strong> 크기</p>
            <button className={styles.likeButton}>♥ 좋아요</button>
          </div>
        </div>
        <div className={styles.largeImageArea}>
          <img src={defaultImage} alt="큰 작품 이미지" className={styles.largeImage} />
        </div>
        <div className={styles.artDescription}>
          <h3>작품 소개</h3>
          <div className={styles.descriptionBox}>
            작품 소개 내용이 여기에 들어갑니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryDetail;
