import { useState } from 'react';
import {Col,Button,FormGroup,Input,Table, Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import styles from '../../css/shop/SaleList.module.css';

const options = [
    { value: "iron", name: "아이언"},
    { value: "silver", name: "실버"},
    { value: "gold", name: "골드"},
    { value: "platinum", name: "플레티넘"},
    { value: "diamond", name: "다이아몬드"},
    { value: "master", name: "마스터"},
    { value: "grandmaster", name: "그랜드마스터"},
    { value: "challenger", name: "챌린저"},
]

const SaleList = () => {
    
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };
    
    const selectList = ["전체보기","그림","조소","공예"];
    const [Selected, setSelected] = useState("전체보기");
    


    return(
        <>
            <h2 className={styles.titlename}>판매리스트</h2>
            <div className={styles.bar}></div>
            <div className={styles.listposition}>
                <div>
                    <select onChange={handleSelect} value={Selected} className={styles.listcategory}>
                        {selectList.map((item)=>(
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select className={styles.listtype}>
                        {options.map((option)=>(
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <select className={styles.listtype}>
                        {options.map((option)=>(
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className={styles.artistsearch}>
                       <input/>&nbsp;<button>검색</button>
                    </div>
                <>    
                    <select className={styles.listsearch}>
                        {options.map((option)=>(
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </>
            </div>

            <div className={styles.bar2}></div>

            <div className={styles.saleList}>
                <div className={styles.artworks}>
                    <div className={styles.arkworktle}>
                        <img className={styles.arkworkimg} src="./logo192.png"></img>
                    </div>
                    <div className={styles.artworkcontentslist}>
                        <span className={styles.artworkcontent}>그림이름</span><br/>
                        <span className={styles.artworkcontent}>작가</span><br/>
                        <span className={styles.artworkcontent}>가격</span> 
                    </div>
                </div>
                <div className={styles.artworks}>
                    <div className={styles.arkworktle}>
                        <img className={styles.arkworkimg} src="./logo192.png"></img>
                    </div>
                    <div className={styles.artworkcontentslist}>
                        <span className={styles.artworkcontent}>그림이름</span><br/>
                        <span className={styles.artworkcontent}>작가</span><br/>
                        <span className={styles.artworkcontent}>가격</span> 
                    </div>
                </div>
                <div className={styles.artworks}>
                    <div className={styles.arkworktle}>
                        <img className={styles.arkworkimg} src="./logo192.png"></img>
                    </div>
                    <div className={styles.artworkcontentslist}>
                        <span className={styles.artworkcontent}>그림이름</span><br/>
                        <span className={styles.artworkcontent}>작가</span><br/>
                        <span className={styles.artworkcontent}>가격</span> 
                    </div>
                </div>
                <div className={styles.artworks}>
                    <div className={styles.arkworktle}>
                        <img className={styles.arkworkimg} src="./logo192.png"></img>
                    </div>
                    <div className={styles.artworkcontentslist}>
                        <span className={styles.artworkcontent}>그림이름</span><br/>
                        <span className={styles.artworkconten}>작가</span><br/>
                        <span className={styles.artworkcontent}>가격</span> 
                    </div>
                </div>
                <div className={styles.artworks}>
                    <div className={styles.arkworktle}>
                        <img className={styles.arkworkimg} src="./img/Test.jpg"></img>
                    </div>
                    <div className={styles.artworkcontentslist}>
                        <span className={styles.artworkcontent}>그림이름</span><br/>
                        <span className={styles.artworkcontent}>작가</span><br/>
                        <span className={styles.artworkcontent}>가격</span> 
                    </div>
                </div>
                <div className={styles.artworks}>
                    <div className={styles.arkworktle}>
                        <img className={styles.arkworkimg} src="./logo192.png"></img>
                    </div>
                    <div className={styles.artworkcontentslist}>
                        <span className={styles.artworkcontent}>그림이름 :</span>
                        <span className={styles.artworkcontent}>너무하기싫은프로젝트</span><br/>
                        <span className={styles.artworkcontent}>작가이름 : </span>
                        <span className={styles.artworkcontent}>불안이</span><br/>
                        <span className={styles.artworkcontent}>가격 : </span> 
                        <span className={styles.artworkcontent}>1,800,000 </span> 
                    </div>
                </div>
            </div>
            <div className={styles.seemore}>
                <img className={styles.seemore} src="./img/seemore.png"></img>
            </div>                    


        </>
    )
}
export default SaleList;