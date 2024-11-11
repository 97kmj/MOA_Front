import styles from '../../css/shop/SaleList.module.css';
import { Checkbox } from '../../views/shop/Checkbox';
import React, { useState, useEffect } from 'react'



const Artwork = () => {

    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [theme, setTheme] = useState('');
    const [canvasAvailable, setCanvasAvailable] = useState(''); // S "국제 캔버스 여부" 
    // const [canvasType,setCanvasType] = useState('F');

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
                setCanvasAvailable(value);
                break;
            
            default:
                break;
        }
    };



    const getTypeOptions = () => {
        switch (category) {
            case '그림':
                return ['1', '2', '3'];
            case '조소':
                return ['4', '5', '6'];
            case '공예':
                return ['7', '8', '9'];
            default:
                return [];
        }
    };
    const getThemeOptions = () => {
        switch (category) {
            case '그림':
                return ['1-1', '1-2', '1-3'];
            case '조소':
                return ['4-1', '4-2', '4-3'];
            case '공예':
                return ['없음'];
            default:
                return [];
        }
    };

    // const canvasTypeOption = () =>[
    //     {value: "01", canvasName: "F"} ,
    //     {value: "02", canvasName: "P"} ,
    //     {value: "03", canvasName: "M"} ,
    // ];

    // const clickcanvas =(e)=>{
    //     setCanvasType(e.target.value);
    // }


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
            canvasAvailable
        };
        console.log(formData);  // Submit formData, or send it to your server
    };

    return(
        <>
            <h2 className={styles.titlename}>작품 등록</h2>
            <div className={styles.bar}></div>
            <div className={styles.TermsofUseInfo}>
                <div><b>약관안내</b></div>
                <div><b>판매금의 수수료 50%는 플랫폼의 수수료 입니다.</b> </div>
                <div className={styles.TermsofUseInfoCheckbox}><Checkbox>&nbsp;개인정보 제 3자 제공 동의</Checkbox></div>
                <div className={styles.TermsofUseInfoCheckbox}><Checkbox>&nbsp;판매 정책 동의</Checkbox></div>
            </div>
            <div className={styles.middleartwork} >
                <div className={styles.artworkAddInfo}>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}>작품명</div>
                        <div className={styles.artworkInfocontent}>골드런1234667889</div>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}>카테고리</div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">카테고리 선택</option>
                            <option value="그림">그림</option>
                            <option value="조소">조소</option>
                            <option value="공예">공예</option>
                        </select>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}>타입</div>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disabled={!category}
                        >
                            <option value="">타입 선택</option>
                            {getTypeOptions().map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}>주제</div>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            disabled={!category}
                        >
                            <option value="">주제 선택</option>
                            {getThemeOptions().map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}>국제 캔버스 여부</div>
                        <div className={styles.artworkmiddle}>
                        <input
                                type="radio"
                                id="canvasYes"
                                name="canvasAvailable"
                                value="예"
                                checked={canvasAvailable === '예'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="canvasYes">&nbsp; 예</label>
                        </div>
                        <div className={styles.artworkmiddle}>
                        <input
                                type="radio"
                                id="canvasNo"
                                name="canvasAvailable"
                                value="아니요"
                                checked={canvasAvailable === '아니요'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="canvasNo">&nbsp; 아니요</label>
                        </div>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}> 캔버스 타입</div>
                        <select>
                               
                            <option value="01" >F</option>
                            <option value="02" >S</option>
                            <option value="03" >M</option>  
                                                         
                        </select>
                        <div className={styles.arworkInfotdTitle}>캔버스 호수</div>
                        <select>
                               
                               <option value="01" >1호</option>
                               <option value="02" >2호</option>
                               <option value="03" >3호</option>  
                                                            
                           </select>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}> 가로</div>
                        <div className={styles.artworkmiddle}>골드런1234667889</div>
                        <div className={styles.arworkInfotdTitle}>세로</div>
                        <div className={styles.artworkmiddle}>골드런1234667889</div>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}> 높이</div>
                        <div className={styles.artworkmiddle}>골드런1234667889</div>
                    </div>
                    <div></div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}> 판매 여부</div>
                        <select>
                            <option value="01" >예</option>
                            <option value="02" >아니요</option>                                                            
                        </select>
                    </div>
                    <div className={styles.artworkname}>
                        <div className={styles.arworkInfotdTitle}> 판매 금액</div>
                        <div className={styles.artworkmiddle}>골드런1234667889</div>
                        <div className={styles.arworkInfotdTitle}>수량</div>
                        <div className={styles.artworkmiddle}>골드런1234667889</div>
                    </div>
                </div>
                <div> 이거맞음?</div>
                <div>
                    <div>대표이미지</div>
                    <div className={styles.artworkimg}></div>
                    <div>사진추가</div>
                    <div className={styles.artworkimg}></div>
                </div>
            </div>
            <div>
                <button type="submit">등록하기</button>
            </div>
        </>
    )
    
} 
export default Artwork;