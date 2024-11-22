import styles from '../../css/shop/ArtworkAdd.module.css';
import { Checkbox } from '../../views/shop/Checkbox';
import { React, useState, useEffect, useRef } from 'react'
import Header from '../Header';
import axios from 'axios';
import { Navigate } from 'react-router';

const Artwork = () => {
    const [category, setCategory] = useState([]);
    const [types, setTypes] = useState([]);
    const [themes, setThemes] = useState([]);
    const [imgPath, setImgPath] = useState(null);
    const [canvas, setCanvas] = useState([]);
    const [saleStatus, setSaleStatus] = useState(false);
    const [isCanvasAvailable, setIsCanvasAvailable] = useState(true);

    const [artwork, setArtwork] = useState({
        adminCheck: '', canvasType: '', description: '', height: '', imageUrl: '',
        isStandaedcanvas: '', lenth: '', price: '', stock: '', saleStatus: 'AVAILABLE',
        termsAccepted: '', title: '', width: '', canvasId: '', categoryId: '', subjectId: '', typeId: '', artwork: 'user1'
    });

    useEffect(() => {
        axios.get('http://localhost:8080/shop/artworkAdd')
            .then(res => {
                console.log(res.data);
                setCategory(res.data);  
            })
            .catch(error => {
                console.error("카테고리 불러오기 오류", error);
            });

        axios.get(`http://localhost:8080/shop/artworkAdd/canvas`)
            .then(canvas =>{
                console.log(canvas.data);
                setCanvas(canvas.data);

            })
            .catch(error=>{
                console.error("캔버스 불러오기 오류", error);
            });
        
    }, 

    []);

    useEffect(() => {
        if (artwork.categoryId) {
            axios.post(`http://localhost:8080/shop/artworkAdd/type/${artwork.categoryId}`)
                .then(res => {
                    setTypes(res.data); // API에서 가져온 타입 데이터 저장
                })
                .catch(error => {
                    console.error("타입 데이터 불러오기 오류", error);
                });

            axios.post(`http://localhost:8080/shop/artworkAdd/subject/${artwork.categoryId}`)
                .then(res => {
                    setThemes(res.data); // API에서 가져온 주제 데이터 저장
                })
                .catch(error => {
                    console.error("주제 데이터 불러오기 오류", error);
                });
        }
    }, [artwork.categoryId]);




    const handleCategoryChange = (e) => {
        setArtwork(prev => ({
            ...prev,
            categoryId: e.target.value,
            typeId: '',  // 타입과 주제 초기화
            subjectId: ''
        }));
    };
    const handleCanvasChange = (e) => {
        setArtwork(prev => ({
            ...prev,
            canvasId: e.target.value,

        }));
    };
    const handleTypeChange = (e) => {
        setArtwork(prev => ({
            ...prev,
            typeId: e.target.value
        }));
    };

    const handleSubjectChange = (e) => {
        setArtwork(prev => ({
            ...prev,
            subjectId: e.target.value
        }));
    };


    const handleImagePreview = (e) => {
        setImgPath(e.target.files[0]);
    };

    const handleCanvasAvailabilityChange = (e) =>{
        const value = e.target.value === "예";
        setIsCanvasAvailable(value);
        setArtwork(perv =>({
            ...perv,
            isStandaedcanvas: value ? "예" : "아니요"
        }));
    };


    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(artwork).forEach((key) => {
            formData.append(key, artwork[key]);
        });

        if (imgPath) {
            formData.append('imageUrl', imgPath);
        }

        axios.post('http://localhost:8080/shop/artworkAdd', formData)
            .then(res => {
                console.log(res.data);
                Navigate(`/shop/artworkDetail/${res.data}`);
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data);
            });
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h3>작품 등록</h3>
                <hr className={styles.bar}></hr>
                <div className={styles.TermsofUseInfo}>
                    <div><b>약관안내</b></div>
                    <div><b>판매금의 10%는 플랫폼의 수수료 입니다.</b> </div>
                    <div className={styles.TermsofUseInfoCheckbox} id='adminCheck' name='adminCheck'><Checkbox>&nbsp;개인정보 제 3자 제공 동의</Checkbox></div>
                    <div className={styles.TermsofUseInfoCheckbox} id='termsAccepted' name='termsAccepted'><Checkbox>&nbsp;판매 정책 동의</Checkbox></div>
                </div>
                <div className={styles.middleartwork}>
                    <div className={styles.artworkRegistDetail}>
                        <table>
                            <tr>
                                <td className={styles.artworkInfotdTitle}>작품명</td>
                                <td colSpan={3}>
                                    <input className={styles.artworkInfocontent} id='title' name='title' />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.artworkInfotdTitle}>카테고리</td>
                                <td>
                                    <div className={styles.customSelect}>
                                        <select
                                            value={artwork.categoryId}
                                            onChange={handleCategoryChange}
                                            id="categoryId"
                                            name="categoryId"
                                        >
                                            <option value="">카테고리 선택</option>
                                            {category.map((categoryItem) => (
                                                <option key={categoryItem.categoryId} value={categoryItem.categoryId}>
                                                    {categoryItem.categoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.artworkInfotdTitle}>타입</td>
                                <td>
                                    <div className={styles.customSelect}>
                                        <select
                                            value={artwork.typeId}
                                            onChange={handleTypeChange}
                                            disabled={!artwork.categoryId}>
                                            <option value="">타입 선택</option>
                                            {types.length > 0 && types.map((typeItem) => (
                                                <option key={typeItem.typeId} value={typeItem.typeId}>
                                                    {typeItem.typeName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                            <td className={styles.artworkInfotdTitle}>주제</td>
                            <td>
                                <div className={styles.customSelect}>
                                    <select
                                            value={artwork.subjectId}
                                            onChange={handleSubjectChange}
                                            disabled={!artwork.categoryId}>
                                                <option value="">주제 선택</option>
                                                {themes.length > 0 && themes.map((subjectItem) => (
                                                    <option key={subjectItem.subjectId} value={subjectItem.subjectId}>
                                                        {subjectItem.subjectName}
                                                </option>
                                         ))}
                                    </select>
                                </div>
                            </td>
                        </tr>                       
                        <tr><td className={styles.artworkInfotdTitle}>국제캔버스 여부</td>
                            <td colSpan={3}>
                                <div className={styles.canvasRadio}>
                                    <input
                                            type="radio"
                                            id="isStandaedcanvas"
                                            name="canvasAvailable"
                                            value="예"
                                            checked={isCanvasAvailable === true}
                                            onChange={()=> setIsCanvasAvailable(true)}
                                            />
                                        <label htmlFor="isStandaedcanvas">&nbsp;예</label>
                                    </div>
                                    <div className={styles.canvasRadio}>
                                    <input
                                            type="radio"
                                            id="isStandaedcanvas"
                                            name="canvasAvailable"
                                        value="아니요"
                                        checked={isCanvasAvailable === false}
                                        onChange={()=> setIsCanvasAvailable(false)}
                                        />
                                    <label htmlFor="isStandaedcanvas">&nbsp;아니요</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.artworkInfotdTitle}>캔버스 타입</td>
                                <td>
                                <div className={styles.customSelect}>
                                    <select disabled={!isCanvasAvailable} id='canvasType' name='canvasType' >
                                        <option value="F" >F</option>
                                        <option value="P" >P</option>
                                        <option value="M" >M</option>
                                        <option value="S" >S</option>
                                    </select>
                                </div>
                                </td>
                                <td className={styles.artworkInfotdTitle}>캔버스 호수</td>
                                <td>
                                <div className={styles.customSelect}>
                                    <select disabled={!isCanvasAvailable} 
                                        id='canvasId' 
                                        name='canvasId'
                                        value={artwork.canvasType}
                                        onChange={handleCanvasChange}>
                                            <option value="">호수선택</option>
                                            {canvas.map((canvasItem)=>(
                                                <option key={canvasItem.canvasId} value={canvasItem.canvasId}>
                                                    {canvasItem.canvasNum}
                                                </option>
                                            ))}  
                                    </select>
                                </div>
                                </td>
                            </tr>
                            <tr><td className={styles.artworkInfotdTitle}>가로</td>
                            <td><input className={styles.artworkInfocontent} disabled={isCanvasAvailable} id='width' name='width'/></td>
                            <td className={styles.artworkInfotdTitle}>세로</td>
                            <td><input className={styles.artworkInfocontent} disabled={isCanvasAvailable} id='lenth' name='lenth'/></td>
                            </tr>
                            <tr><td className={styles.artworkInfotdTitle}>높이</td>
                            <td><input className={styles.artworkInfocontent} disabled={isCanvasAvailable} id='height' name='height'/></td>
                            <td></td><td></td>
                            </tr>  
                            <tr><td className={styles.artworkInfotdTitle} >판매 여부</td>
                            <td>
                                <div className={styles.customSelect}>
                                <select id='sale_status' name='saleStatus'>
                                    <option value="예" name="canvasAvailable" >예</option>
                                    <option value="아니오" name="canvasAvailable">아니요</option>                                                            
                                </select>
                                </div>
                            </td>
                          
                            </tr>  
                            <tr>
                                <td className={styles.artworkInfotdTitle}>판매 금액</td>
                                <td><input className={styles.artworkInfocontent} disabled={saleStatus} id='price' name='price'/></td>
                                <td className={styles.artworkInfotdTitle}>수량</td>
                                <td><input className={styles.artworkInfocontent} disabled={saleStatus} id='stock' name='stock'/></td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.artworktitle}>
                        <h3>작품등록</h3>

                        <div className={styles.imgInputBox}>
                            <input
                                id="imageUrl"
                                type="file"
                                onChange={handleImagePreview}
                                className={styles.hiddenFileInput}
                            />
                            <label htmlFor="imageUrl" className={styles.fileInputLabel}>
                                {imgPath ? (
                                    <img
                                        src={URL.createObjectURL(imgPath)}
                                        alt="작품 이미지 미리보기"
                                        className={styles.previewImage}
                                    />
                                ) : (
                                    <div className={styles.plusIcon}>+</div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.artworkInfoBox}>
                    <h4>작품 설명</h4>
                    <textarea className={styles.artworkInfoInput} id='description' name='description' />
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={submit}>등록하기</button>
                </div>
            </div>
        </>
    );
};

export default Artwork;