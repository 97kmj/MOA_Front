import styles from '../../css/shop/ArtworkAdd.module.css';
import { Checkbox } from '../../views/shop/Checkbox';
import React, { useState, useEffect, useRef } from 'react'
import Header from '../Header';
// import {url} from '../config';
import axios from 'axios';
import { Navigate } from 'react-router';



const Artwork = () => {

    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [theme, setTheme] = useState('');
    const [imgPath, setImgPath] = useState(null);
    const [isCanvasAvailable, setIsCanvasAvailable] = useState(false);
    const [saleStatus, setSaleStatus] = useState(false);


    const [artwork, setArtwork] = useState({adminCheck:'',canvasType:'',description:'',height:'',imageUrl:'',
        isStandaedcanvas:'', lenth:'', price:'', stock:'', saleStatus:'AVAILABLE',termsAccepted:'',title:'',
        width:'', canvasId:'', categoryId:'',subjectId:'',typeId:'',artwotk:'user1'
    });
    

    const submit = (e) => {
        const formData = new FormData();
        formData.append("adminCheck",artwork.adminCheck);
        formData.append("canvasType",artwork.canvasType);
        formData.append("description",artwork.description);
        formData.append("height",artwork.height);
        formData.append("imageUrl",artwork.imageUrl);
        formData.append("isStandaedcanvas",artwork.isStandaedcanvas);
        formData.append("lenth",artwork.lenth);
        formData.append("price",artwork.price);
        formData.append("stock",artwork.stock);
        formData.append("saleStatus",artwork.saleStatus);
        formData.append("termsAccepted",artwork.termsAccepted);
        formData.append("title",artwork.title);
        formData.append("width",artwork.width);
        formData.append("canvasId",artwork.canvasId);
        formData.append("categoryId",artwork.categoryId);
        formData.append("subjectId",artwork.subjectId);
        formData.append("typeId",artwork.typeId);
        formData.append("artiseId",artwork.id);
        

        axios.post(`http://localhost:8080/shop/artworkAdd`, formData)
            .then(res=>{
                console.log(res.data);
                Navigate(`/shop/artworkDetail/${res.data}`)
            })
            .catch(err=>{
                console.log(err);
                alert(err.response.data);
            })

    }


        
    const imgRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'category':
                setCategory(value);
                break;
            case 'type':
                setType(value);
                break;
            case 'theme':
                setTheme(value);
                break;
            case 'canvasAvailable':
                
                setIsCanvasAvailable(value === '예'); 
                break;
            case 'saleStatus':
                setSaleStatus(value === '예');
                break;
            default:
                break;
        }
    };


    const getTypeOptions = () => {
        switch (category) {
            case '그림':
                return ['전체보기','유화', '수체화', '아크릴화','수묵화','채석화','판화','기타'];
            case '조소':
                return ['전체보기', '석조', '목조', '아조', '점토상', '석고상', '청동상','테라코타','기타'];
            case '공예':
                return ['전체보기', '석공예', '목공예', '유리공예', '도자기예','기타'];
            default:
                return [];
        }
    };

    const getThemeOptions = () => {
        switch (category) {
            case '그림':
                return ['전체보기','풍경화', '인물', '정물화', '크로키', '추상화', '초상화', '기타'];
            case '조소':
                return ['전체보기','마스크', '흉상', '반신상', '전신상', '토르소', '등신상', '기타'];
            case '공예':
                return ['-'];
            default:
                return [];
        }
    };




    useEffect(() => {
        setType('');  // 카테고리 변경 시 타입 초기화
        setTheme(''); // 카테고리 변경 시 주제 초기화
    }, [category]);


  

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            category,
            type,
            theme,
            isCanvasAvailable
        };
        console.log(formData); 
    };

    const handleImagePreview = (e) => {

        setImgPath(e.target.files[0]);
    
    };
    
    return(
        <>
            <Header/>
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
                            <tr><td  className={styles.artworkInfotdTitle}>작품명</td><td colSpan={3}><input className={styles.artworkInfocontent } id='title' name='title'></input></td></tr>
                            <tr><td  className={styles.artworkInfotdTitle}>카테고리</td><td><div className={styles.customSelect}>
                                    <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}  id='categoryId' name='categoryId'>
                                    <option value="">카테고리 선택</option>
                                    <option value="그림">그림</option>
                                    <option value="조소">조소</option>
                                    <option value="공예">공예</option>
                                </select>
                                </div></td><td></td><td></td></tr>
                            <tr><td className={styles.artworkInfotdTitle}>타입</td><td><div className={styles.customSelect}>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    disabled={!category}>
                                    <option value="">타입 선택</option>
                                    {getTypeOptions().map((option, index) => (
                                        <option key={index} value={option} id='typeId' name='typeId'>{option}</option>
                                    ))}
                                </select>
                                </div></td>
                                <td className={styles.artworkInfotdTitle}>주제</td><td><div className={styles.customSelect}>
                                    <select value={theme} onChange={(e) => setTheme(e.target.value)} disabled={!category}>
                                        <option value="">주제 선택</option>
                                        {getThemeOptions().map((option, index) => (
                                            <option key={index} value={option} id='subjectId' name='subjectId'>{option}</option>
                                        ))}
                                    </select>
                                </div></td>
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
                                            onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                    <select disabled={!isCanvasAvailable} id='canvasId' name='canvasId'>
                                        <option value="1" >1호</option>
                                        <option value="2" >2호</option>
                                        <option value="3" >3호</option>
                                        <option value="4" >4호</option>
                                        <option value="5" >5호</option>
                                        <option value="6" >6호</option>
                                        <option value="8" >8호</option>
                                        <option value="10" >10호</option>
                                        <option value="12" >12호</option>
                                        <option value="15" >15호</option>
                                        <option value="20" >20호</option>
                                        <option value="25" >25호</option>
                                        <option value="30" >30호</option>
                                        <option value="40" >40호</option>
                                        <option value="50" >50호</option>
                                        <option value="60" >60호</option>
                                        <option value="80" >80호</option>
                                        <option value="100" >100호</option>
                                        <option value="120" >120호</option>
                                        <option value="150" >150호</option>
                                        <option value="200" >200호</option>
                                        <option value="300" >300호</option>
                                        <option value="500" >500호</option>
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
                    <textarea className={styles.artworkInfoInput} id='description' name='description'/>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={submit}>등록하기</button>
                    
                </div>


            
            </div>
        </>
    )
} 
export default Artwork;
