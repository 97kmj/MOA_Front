import React from "react";
import Masonry from "react-masonry-css";
import "../../css/funding/MasonryGallery.css";

const MasonryGallery = ({ images }) => {
    const breakpointColumnsObj = {
        default: 3, // 기본 브라우저 크기에서 3열로 표시
        1100: 3,    // 1100px 이하 화면에서는 3열
        700: 2,     // 700px 이하 화면에서는 2열
        500: 1      // 500px 이하 화면에서는 1열
    };

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {images.map((src, index) => (
                    <div className="masonry-item" key={index}>
                        <img  src={`${process.env.PUBLIC_URL}/img/funding/` + src}  alt={`Gallery Image ${index + 1}`} />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default MasonryGallery;
