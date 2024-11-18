import React, { useEffect } from "react";
import styles from "../../css/funding/Gallery.module.css";

const Gallery = () => {
    useEffect(() => {
        const panels = Array.from(document.querySelectorAll(`.${styles.panel}`));

        // 패널들의 위치를 동적으로 업데이트하는 함수
        const updatePanelPositions = () => {
            const totalPanels = panels.length;
            const midIndex = Math.floor(totalPanels / 2); // 중앙 패널의 인덱스 계산

            panels.forEach((panel, index) => {
                const offset = index - midIndex; // 중앙에서의 상대적 위치
                const translateXValue = offset * 300; // 패널 간의 간격을 300px로 설정
                const rotateYValue = offset * -25; // 중앙에서 벗어날수록 회전 각도 증가
                const scaleValue = index === midIndex ? 1.1 : 1; // 중앙 패널만 확대

                panel.style.transform = `translateX(${translateXValue}px) rotateY(${rotateYValue}deg) scale(${scaleValue})`;
            });
        };

        // 패널 클릭 이벤트 설정
        panels.forEach((panel) => {
            panel.addEventListener("click", () => {
                const clickedPanelIndex = panels.indexOf(panel); // 클릭된 패널의 인덱스 찾기
                const midIndex = Math.floor(panels.length / 2);

                // 클릭된 패널이 중앙에 있지 않다면, 중앙 패널과 자리 교체
                if (clickedPanelIndex !== midIndex) {
                    const clickedPanel = panels.splice(clickedPanelIndex, 1)[0]; // 클릭된 패널을 배열에서 제거
                    panels.splice(midIndex, 0, clickedPanel); // 중앙에 클릭된 패널을 삽입
                }

                // 패널 위치 업데이트
                updatePanelPositions();
            });
        });

        // 다음 버튼 클릭 시
        const handleNext = () => {
            const firstPanel = panels.shift();
            panels.push(firstPanel);
            updatePanelPositions();
        };

        // 이전 버튼 클릭 시
        const handlePrev = () => {
            const lastPanel = panels.pop();
            panels.unshift(lastPanel);
            updatePanelPositions();
        };

        // 페이지 로드 시 초기 패널 위치 설정
        updatePanelPositions();

        // 버튼 클릭 이벤트 연결
        const nextButton = document.getElementById("nextBtn");
        const prevButton = document.getElementById("prevBtn");

        nextButton.addEventListener("click", handleNext);
        prevButton.addEventListener("click", handlePrev);

        return () => {
            // 컴포넌트 언마운트 시 이벤트 제거
            nextButton.removeEventListener("click", handleNext);
            prevButton.removeEventListener("click", handlePrev);
        };
    }, []);

    return (
        <div className={styles.gallery}>
            <div className={styles.panel} id="panel1">
                <img src="/img/funding/image1.jpeg" alt="Image 1" />
                <p>작품 설명 1</p>
            </div>
            <div className={styles.panel} id="panel2">
                <img src="/img/funding/image2.jpeg" alt="Image 2" />
                <p>작품 설명 2</p>
            </div>
            <div className={styles.panel} id="panel3">
                <img src="/img/funding/image3.png" alt="Image 3" />
                <p>작품 설명 3</p>
            </div>
            <div className={styles.panel} id="panel4">
                <img src="/img/funding/image4.png" alt="Image 4" />
                <p>작품 설명 4</p>
            </div>
            <div className={styles.panel} id="panel5">
                <img src="/img/funding/image5.png" alt="Image 5" />
                <p>작품 설명 5</p>
            </div>

            <div className={styles.controls}>
                <button className={styles.controlButton} id="prevBtn">
                    〈
                </button>
                <button className={styles.controlButton} id="nextBtn">
                    〉
                </button>
            </div>
        </div>
    );
};

export default Gallery;
