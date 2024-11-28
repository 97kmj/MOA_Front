import styles from '../../css/shop/ArtworkAdd.module.css';
import { Checkbox } from '../../views/shop/Checkbox';
import { React, useState, useEffect, useRef } from 'react'
import Header from '../Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokenAtom, userAtom } from '../../atoms';
import { useAtomValue, useAtom } from 'jotai/react';
import { url } from "../../config";





const Artwork = () => {
    const token = useAtomValue(tokenAtom);
    // const [user,setUser] = useAtom(userAtom);
    const user = useAtomValue(userAtom);
    const [category, setCategory] = useState([]);
    const [types, setTypes] = useState([]);
    const [themes, setThemes] = useState([]);
    const [imgPath, setImgPath] = useState(null);
    const [canvas, setCanvas] = useState([]);
    const [saleStatus, setSaleStatus] = useState(true);
    const [isCanvasAvailable, setIsCanvasAvailable] = useState(true);

    const [artwork, setArtwork] = useState({
        canvasType: 'A', description: '', height: '',
        isStandaedcanvas: '', length: '', price: '', stock: '', saleStatus: '',
        termsAccepted: '', title: '', width: '', canvasId: 0, categoryId: 0, subjectId: 0, typeId: 0, artistId: user.userName
    });

    const navigate = useNavigate();
    
    const edit = (e) => {
        console.log(e.target.value)
        setArtwork({...artwork, [e.target.name]:e.target.value});
    }

    useEffect(() => {
        axios.get(`${url}/shop/artworkAdd`)
            .then(res => {
                
                setCategory(res.data);  
            })
            .catch(error => {
                console.error("카테고리 불러오기 오류", error);
            });


        
    },[]);

    useEffect(() => {
        if (artwork.categoryId) {
            axios.post(`${url}/shop/artworkAdd/type/${artwork.categoryId}`)
                .then(res => {
                    setTypes(res.data); // API에서 가져온 타입 데이터 저장
                })
                .catch(error => {
                    console.error("타입 데이터 불러오기 오류", error);
                });

            axios.post(`${url}/shop/artworkAdd/subject/${artwork.categoryId}`)
                .then(res => {
                    setThemes(res.data); // API에서 가져온 주제 데이터 저장
                })
                .catch(error => {
                    console.error("주제 데이터 불러오기 오류", error);
                });
        }
        if(artwork.canvasType){
            axios.get(`${url}/shop/artworkAdd/canvas/${artwork.canvasType}`)
            .then(canvas =>{
                setCanvas(canvas.data);
            })
            .catch(error=>{
                console.error("캔버스 불러오기 오류", error);
                setCanvas([]);
            });
        }

        
    }, [artwork.categoryId, artwork.canvasType]);


    const handleCategoryChange = (e) => {
        setArtwork(prev => ({
            ...prev,
            categoryId: e.target.value,
            typeId: '',  // 타입과 주제 초기화
            subjectId: ''
        }));
        console.log(e.target.value)
    };
    const handleCanvasChange = (e) => {
        
        const selectCanvas = canvas.find(item => item.canvasId === Number(e.target.value));
        console.log(selectCanvas);
        setArtwork(prev => ({
            ...prev,
            canvasId: selectCanvas.canvasId,
            height: selectCanvas.height,
            width : selectCanvas.width
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
        const value = e.target.value === "ture";
        setIsCanvasAvailable(value);
        if(!value){
            setArtwork(perv =>({
                ...perv,
                canvasType: 'A',  
                canvasId: '',   
                width: '',       
                length: '',      
                height: '',      
            }));
        }else{
            setArtwork(prev => ({
                ...prev,
                width: '',       
                length: '',      
                height: ''       
            }));
        }
    };


    const handleSaleStatusChange  = (e) =>{
        const value = e.target.value === "예";
        setSaleStatus(value);
        setArtwork(prev =>({
            ...prev,
            saleStatus: value ? "true" : "false",
            price : value ? prev.price : '',
            stock : value ? prev.price : '',
        }))
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtwork(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('artworkDto', new Blob([JSON.stringify({
        canvasType:artwork.canvasType !== "A" ? artwork.canvasType : "NONE" ,
        description:artwork.description,
        height:artwork.height,
        isStandardCanvas: artwork.isStandaedcanvas,
        length:artwork.length,
        price:artwork.price,
        saleStatus: saleStatus === true ? "AVAILABLE" : "NOT_SALE",
        stock:artwork.stock,
        termsAccepted:artwork.termsAccepted,
        title:artwork.title,
        width:artwork.width,
        canvasId:artwork.canvasId,
        categoryId:artwork.categoryId,
        subjectId:artwork.subjectId,
        typeId:artwork.typeId,
        artistId:user.username,

        })], { type: "application/json" }));
        formData.append('artworkImage',imgPath);

        axios.post(`${url}/shop/artworkAdd`, formData, {
            headers: {
                Authorization: token,
                "Content-Type":"multipart/form-data",
            }
        })
            .then(res => {
                
                console.log(res.data);
                navigate(`/shop/saleDetail/${res.data}`);
            })
            .catch(err => {
                console.log(err);
                alert("Error:"+err.response?.data || "Unknown error");
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
                                <td className={styles.artworkInfotdTitle} >작품명</td>
                                <td colSpan={3}>
                                    <input className={styles.artworkInfocontent} id='title' name='title' onChange={edit}/>
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
                                                <option key={categoryItem.categoryId} value={categoryItem.categoryId}  >
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
                                            id='typeId'
                                            name='typeId'
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
                                            id='subjectId'
                                            name='subjectId'
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
                                            value="ture"
                                            checked={isCanvasAvailable === true}
                                            onChange={handleCanvasAvailabilityChange}
                                            />
                                        <label htmlFor="isStandaedcanvas">&nbsp;예</label>
                                    </div>
                                    <div className={styles.canvasRadio}>
                                    <input
                                        type="radio"
                                        id="isStandaedcanvas"
                                        name="canvasAvailable"
                                        value="false"
                                        checked={isCanvasAvailable === false}
                                        onChange={handleCanvasAvailabilityChange}
                                        />
                                    <label htmlFor="isStandaedcanvas">&nbsp;아니요</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.artworkInfotdTitle}>캔버스 타입</td>
                                <td>
                                <div className={styles.customSelect}>
                                    <select disabled={!isCanvasAvailable} id='canvasType' name='canvasType' onChange={edit} value={artwork.canvasType}>
                                        <option value="A" disabled selected>선택해주세요</option>
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
                                        
                                        onChange={handleCanvasChange}>
                                            <option value="">호수선택</option>
                                            {canvas.map((canvasItem)=>(
                                                <option key={canvasItem.canvasId} value={canvasItem.canvasId} >
                                                    {canvasItem.canvasNum}
                                                </option>
                                            ))}  
                                    </select>
                                </div>
                                </td>
                            </tr>
                            <tr><td className={styles.artworkInfotdTitle}>가로</td>
                            <td><input className={styles.artworkInfocontent} checked={isCanvasAvailable === false}disabled={isCanvasAvailable} id='width' name='width' onChange={edit} value={artwork.width}/></td>
                            <td className={styles.artworkInfotdTitle}>세로</td>
                            <td><input className={styles.artworkInfocontent} disabled={isCanvasAvailable} id='height' name='height' onChange={edit} value={artwork.height}/></td>
                            </tr>
                            <tr><td className={styles.artworkInfotdTitle}>높이</td>
                            <td><input className={styles.artworkInfocontent} disabled={isCanvasAvailable} id='length' name='length' onChange={edit}/></td>
                            <td></td><td></td>
                            </tr>  
                            <tr><td className={styles.artworkInfotdTitle} >판매 여부</td>
                            <td>
                                <div className={styles.customSelect}>
                                <select id='sale_status' name='saleStatus' onChange={handleSaleStatusChange}>
                                    <option value='true' name="saleStatus"  >예</option>
                                    <option value="false" name="saleStatus" >아니요</option>                                                            
                                </select>
                                </div>
                            </td>
                          
                            </tr>  
                            <tr>
                                <td className={styles.artworkInfotdTitle}>판매 금액</td>
                                <td>
                                    <input className={styles.artworkInfocontent} disabled={!saleStatus} value={artwork.price} id='price' name='price' onChange={handleInputChange}/>
                                </td>
                                <td className={styles.artworkInfotdTitle}>수량</td>
                                <td><input className={styles.artworkInfocontent} disabled={!saleStatus} value={artwork.stock}  id='stock' name='stock' onChange={handleInputChange}/></td>
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
                    <textarea className={styles.artworkInfoInput} id='description' name='description' onChange={edit} />
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={submit}>등록하기</button>
                </div>
            </div>
        </>
    );
};

export default Artwork;