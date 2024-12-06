import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../../atoms";
import { Link } from 'react-router-dom';
import styles from "../../css/gallery/GalleryDetail.module.css";
import Header from "../Header";

function GalleryDetail() {
  const { id } = useParams(); // URL에서 id 가져오기
  const [data, setData] = useState(null); // 작품 데이터를 저장
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
 
  // const tokenData = JSON.parse(useAtomValue(tokenAtom));
  // const token = tokenData.access_token; 
  const token = useAtomValue(tokenAtom); // tokenAtom 값을 그대로 사용

  
  //좋아요버튼
  const handleLikeButtonClick = async () => {
    console.log("Token in handleLikeButtonClick:", token); // 디버깅용
    if (!token) {
      alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/like/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // 토큰 직접 사용
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        const errorJson = JSON.parse(errorText);
        alert(errorJson.message || "좋아요 처리 중 문제가 발생했습니다.");
        return;
      }
  
      const result = await response.json();
      setIsLiked(result.isLiked);
      console.log("Like toggled:", result.isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  

  // 작품 데이터 및 좋아요 상태 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch artwork details
        const artworkResponse = await fetch(`http://localhost:8080/api/artworks/${id}`, {
          headers: token ? { Authorization: token } : {}, // 비로그인 상태에서도 요청 가능
        });
        if (!artworkResponse.ok) throw new Error("Failed to fetch artwork data");
        const artworkData = await artworkResponse.json();
        setData(artworkData);
  
        // Fetch like status if token is available
        if (token) {
          const likeResponse = await fetch(`http://localhost:8080/api/like/${id}`, {
            headers: { Authorization: token },
          });
          if (likeResponse.ok) {
            const likeData = await likeResponse.json();
            setIsLiked(likeData.isLiked);
        } else {
            setIsLiked(false); // 비로그인 상태로 기본값 설정
        }
        
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id, token]);
  

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
              <p>
              <strong>ARTIST</strong>{' '}
              <Link to={`/artistDetail/${data.artist.id}`}>{data.artist.name}</Link>
              </p>              
              <p><strong>SIZE</strong> {data.width} x {data.height} cm</p>
              <p><strong>TYPE</strong> {data.type.typeName}</p>
              <p><strong>SUBJECT</strong> {data.subject.subjectName}</p>
              {/* 좋아요 버튼 */}
              <button className={styles.likeButton} onClick={handleLikeButtonClick} >
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
