import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import styles from "../../css/ShowGallery.module.css";



const ShowGallery = ({ images, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={styles.artworkViewContainer}>
            {onClose && (
                <button
                    className={styles.galleryButtonCloseButton}
                    onClick={onClose}
                >
                    닫기
                </button>
            )}
            <LayoutGroup>
                <div className={styles.gallery}>
                    {images.map((image, index) => {
                        const position = index - currentIndex;

                        if (position < -4 || position > 4) {
                            return null; // 좌우로 4개만 표시
                        }

                        return (
                            <motion.div
                                key={image}
                                className={styles.card}
                                layout
                                animate={{
                                    zIndex: position === 0 ? 10 : 1,
                                    scale: position === 0 ? 1.2 : 1,
                                    x: position * 25,
                                    rotateY: position * -10,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img src={image} alt={`Artwork ${index}`} />
                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
            <div className={styles.controls}>
                <button
                    className={styles.navButton}
                    onClick={() => {
                        if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1); // 이전 버튼
                        }
                    }}
                >
                    &#8249;
                </button>
                <button
                    className={styles.navButton}
                    onClick={() => {
                        if (currentIndex < images.length - 1) {
                            setCurrentIndex(currentIndex + 1); // 다음 버튼
                        }
                    }}
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default ShowGallery;