import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/gallery/GalleryDetail.module.css";
import Header from "../Header";

function GalleryDetail() {
  const { id } = useParams(); // URL에서 id 가져오기
  const [data, setData] = useState(null); // 작품 데이터를 저장
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  // 좋아요 버튼 클릭 핸들러
  const handleLikeButtonClick = () => {
    setIsLiked((prev) => !prev); // 좋아요 상태 토글
  };

  // 작품 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/artworks/${id}`);
        const artworkData = await response.json();
        setData(artworkData); // 데이터 저장
        setIsLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Failed to fetch artwork:", error);
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchData();
  }, [id]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.galleryDetailContainer}>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  // 데이터가 없는 경우 처리
  if (!data) {
    return (
      <>
        <Header />
        <div className={styles.galleryDetailContainer}>
          <p>작품 데이터를 가져오는 데 실패했습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.galleryDetailContainer}>
        <h1 className={styles.pageTitle}>갤러리 상세</h1>
        <hr className={styles.titleSeparator} />
        <div className={styles.galleryDisplayArea}>
          <div className={styles.smallImageArea}>
            <img src={data.imageUrl} alt={data.title} className={styles.smallImage} />
            <div className={styles.imageDetails}>
              <h2 className={styles.imageTitle}>{data.title}</h2>
              <p><strong>Artist:</strong> {data.artist.name}</p>
              <p><strong>Subject:</strong> {data.subject.subjectName}</p>
              <p><strong>Type:</strong> {data.type.typeName}</p>
              <p><strong>Size:</strong> {data.width} x {data.height} cm</p>
              {/* 좋아요 버튼 */}
              <button className={styles.likeButton} onClick={handleLikeButtonClick}>
                <img
                  src={isLiked ? "/img/heart.svg" : "/img/goldheart.png"}
                  alt="좋아요"
                  className={styles.likeIcon}
                />
              </button>
            </div>
          </div>
          <hr className={styles.imageSeparator} />
          <div className={styles.largeImageArea}>
            <img src={data.imageUrl} alt="큰 작품 이미지" className={styles.largeImage} />
          </div>
          <div className={styles.artDescription}>
            <h3>작품 소개</h3>
            <div className={styles.descriptionBox}>
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryDetail;
