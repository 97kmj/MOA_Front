import React from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/gallery/GalleryDetail.module.css";

function GalleryDetail() {
  const { id } = useParams(); // URL에서 id 가져오기

  // 임시 데이터
  const data = {
    title: `작품 설명 ${id}`,
    artist: `작가 ${id}`,
    type: `타입 ${id}`,
    subject: `주제 ${id}`,
    size: `크기 ${id}`,
    image: `https://via.placeholder.com/300x200?text=작품+${id}`,
    description: `이 작품은 ${id}번 작품에 대한 설명입니다.`,
  };

  return (
    <div className={styles.galleryDetailContainer}>
      <h1 className={styles.pageTitle}>GalleryDetail</h1>
      <hr className={styles.titleSeparator} />
      <div className={styles.galleryDisplayArea}>
        <div className={styles.smallImageArea}>
          <img src={data.image} alt={data.title} className={styles.smallImage} />
          <div className={styles.imageDetails}>
            <h2 className={styles.imageTitle}>{data.title}</h2>
            <p><strong>Artist:</strong> {data.artist}</p>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Subject:</strong> {data.subject}</p>
            <p><strong>Size:</strong> {data.size}</p>
            <button className={styles.likeButton}>♥ 좋아요</button>
          </div>
        </div>
        <hr className={styles.imageSeparator} />
        <div className={styles.largeImageArea}>
          <img src={data.image} alt="큰 작품 이미지" className={styles.largeImage} />
        </div>
        <div className={styles.artDescription}>
          <h3>작품 소개</h3>
          <div className={styles.descriptionBox}>
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryDetail;
