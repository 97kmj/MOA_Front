import React, { useState } from 'react';
import styles from '../../css/shop/SaleList.module.css';

const RecommendFrame = () => {
  // State to keep track of the selected frame index
  const [selectedFrame, setSelectedFrame] = useState(0);
  
  // List of frame images
  const frameImages = [
    '/img/액자1.png',
    '/img/액자2.png',

  ];


  const frameClasses=[
    styles.frameArtwork1,
    styles.frameArtwork2,

  ];


  // Function to handle left button click (move left)
  const handleLeftClick = () => {
    setSelectedFrame(prev => (prev === 0 ? frameImages.length - 1 : prev - 1));
  };

  // Function to handle right button click (move right)
  const handleRightClick = () => {
    setSelectedFrame(prev => (prev === frameImages.length - 1 ? 0 : prev + 1));
  };




  return (
    <div className={styles.container}>
      <h3 className={styles.titlename}>추천프레임</h3>
      <div className={styles.bar}></div>
      <div className={styles.recommendFrame}>
        {/* Left move button */}
        <div className={styles.frameMoveButtonSetting}>
          <img
            src='/img/LEFT.PNG'
            className={styles.frameMoveButton}
            onClick={handleLeftClick}
            alt="Move Left"
          />
        </div>

        {/* Image frame selection */}
        <div className={styles.recommendFrametile}>
          <img
            src='/img/sample1.webp'
            className={frameClasses[selectedFrame]}
            alt="Artwork"
          />
          {/* { <img
            src={frameImages[selectedFrame]}
            className={styles.frameImgchoice}
            alt="Selected Frame"
          /> } */}
          
        </div>

        <div className={styles.frameMoveButtonSetting}>
          <img
            src='/img/RIGHT.PNG'
            className={styles.frameMoveButton}
            onClick={handleRightClick}
            alt="Move Right"
          />
        </div>
      </div>


      <div className={styles.FrameSlideView}>
        {frameImages.map((imgSrc, index) => (
          <div key={index}>
            <img
              src={imgSrc}
              className={styles.frameImgSetting}
              alt={`Frame ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendFrame;