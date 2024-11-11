import styles from './SaleList.css';
import { Table, Label, Button , Input} from 'reactstrap';
import { useState } from 'react';

const framePrices = {
    none: 0,
    basic: 100000,
    premium: 200000
};

const framename={
    none: "프레임 없음",
    basic: "기본 프레임",
    premium: "고급 프레임"
}


const SaleDetail = () => {
    const [selectedFrame, setSelectedFrame] = useState('basic');
    const basePrice = 18000000000;

    const totalPrice = basePrice + framePrices[selectedFrame];

    return (
        <>
            <h2 className={styles.titlename}>판매 > 판매상세</h2>
            <div className={styles.bar}></div>
            <div className={styles.detailTop}>
                <div className={styles.detailTopLeft}>
                    <img src='Test.jpg' alt="Artwork Image" className={styles.detailTopLeftImg}/>
                </div>
                <div className={styles.detailTopRight}>
                    <div className={styles.detailTopRightArtworkName}>
                        <b>골드런</b>
                    </div>
                    <div className={styles.detailTopRightArtworkName, styles.colorGold}>
                        <b>{new Intl.NumberFormat().format(basePrice)}</b>
                    </div>
                    <br />

                    <Table borderless className={styles.detailTopRightTable}>
                        <tbody className={styles.detailtitlearray}>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>ARTIST</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>SIZE</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>TYPE</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>SUBJECT</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>STOCK</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray, styles.colorGold}>
                                <td><Label>OPTION</Label></td>
                            </tr>
                        </tbody>
                        <tbody className={styles.detailtitlearray}>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>피카소</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>1000x1200000</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>그림</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>수채화</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArray}>
                                <td><Label>수묵화</Label></td>
                            </tr>
                            <tr className={styles.detailTopRightArrayFrame}>
                                {/* <td className='detailtitlearraFrame align-center colorGold'>기본 프레임 +100000</td> &nbsp;&nbsp;&nbsp;
                                <td className='align-center colorGold'><Button>추천프레임</Button></td> */}
                                <Input
                                    className={styles.detailtitlearraFrame, styles.align-center ,styles.colorGold}
                                    type="select"
                                    value={selectedFrame}
                                    onChange={(e) => setSelectedFrame(e.target.value)}>
                                
                                    <option value="none">선택없음 +0</option>
                                    <option value="basic">기본 프레임 +100000</option>
                                    <option value="premium">고급 프레임 +200000</option>
                                </Input> &nbsp;&nbsp;&nbsp;
                                <td className={styles.align-center, styles.colorGold}><Button>추천프레임</Button></td>

                            </tr>
                        </tbody>
                    </Table>
                    
                </div>
            
            </div>
            <div className={styles.topmiddle}>
                <div className={styles.leftgoldheart}>
                    <img src={styles.goldheart.png}/>
                </div>
                <Table className={styles.totalprice}>
                    <tbody className={totalpricetbody}>
                        <tr className={styles.totalpricetbody}>
                            <td className={styles.totalpriceleft}><Label>골드런나아가라폭포의 한숨</Label></td>
                        </tr>
                        <tr>
                            <td className={styles.totalpriceleft}> {framename[selectedFrame]} </td>&nbsp;&nbsp;&nbsp;
                        </tr>
                        <br/>
                        <tr>
                            <td className={styles.totalpriceright} >총 금액 </td>&nbsp;&nbsp;&nbsp;
                        </tr>
                    </tbody>
                    <tbody className={styles.totalpricetbody}>
                    <tr className={styles.totalpricetbody}>
                            <td className={styles.totalpriceleft}>{new Intl.NumberFormat().format(basePrice)}</td>
                        </tr>
                        <tr>
                            <td className={styles.totalpriceleft}>+{new Intl.NumberFormat().format(framePrices[selectedFrame])}</td>
                        </tr>
                        <br></br>
                        <tr>
                            <td className={totalpriceright}>{new Intl.NumberFormat().format(totalPrice)}</td> &nbsp;&nbsp;&nbsp;
                        </tr>
                    </tbody>     
                </Table>
            </div>
            <div className={styles.bar2}></div>
            <br/>
            <div className={styles.detailmiddle}>
                <img src='TEST.jpg' className={styles.detailmiddleimg}/>
            </div>

            <div className={styles.artworkInfo}>
                <Table className={styles.artworkInfoTable}>
                    <tbody>
                        <tr >
                            <td className={styles.artworkInfotitle ,styles.colorGold}>Art’s Description</td>
                            <td className={styles.artworkInfotitleNone}></td>
                            <td className={styles.artworkInfotitleNone}></td>
                        </tr>
                        <tr>
                            <td colSpan="3" className={styles.artworkInfocontent}>투우하는 사람들과 관객 </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className={styles.artworkInfo}>
                <Table className={styles.artworkInfoTable}>
                    <tbody>
                        <tr >
                            <td className={styles.artworkInfotitle, styles.colorGold}>Artist’s Information</td>
                            <td className={styles.artworkInfotitleNone}></td>
                            <td className={styles.artworkInfotitleNone}></td>
                        </tr>
                        <tr>
                            <td colSpan="3" className={styles.artworkInfocontent}>개인전(Solo Exhibition)
                                    2023.11 / 빛나는 여정 (project space GAZE, 서울) 2022.10 / 희망의 파동 (갤러리 minnim, 서울) 2021.09 / 자유의 날개 (project space GAZE, 서울) 2021.06 / 빛과 함께한 여행 (사운즈 한남_일호식, 서울) 2021.05 / 꿈의 조각들 (갤러리 초연, 서울) 2021.01 / 희망의 비상 (갤러리 다온, 서울) 2020.09 / 동심의 불꽃 (갤러리 빈칸, 서울)


                                    그룹전(Group Exhibition)
                                    2023.12 / 미래를 향한 도약 (project space GAZE, 서울) 2023.09 / 시간의 여운 (project space GAZE, 서울) 2023.07 / 연속의 기쁨 (갤러리 모스, 서울) 2022.04 / 전달된 빛 (라메르갤러리, 서울) 2022.02 / 따뜻한 기억 (오솔갤러리, 인천) 2021.12 / 새로운 시작 (착한갤러리, 서울) 2021.11 / 심연 속의 빛 (젊은인사, 서울) 2021.10 / 사색의 기쁨 (마루아트센터, 서울) 2019.03 / 빛과 공간 (갤러리 아지트, 서울) 2017.09 / 환상의 순간 (용산 CGV, 서울) 2016.01 / 꿈을 향한 발걸음 (갤러리 이마주, 서울) 2015.12 / 순수한 열정 (갤러리 자인제노, 서울)

                                    아트 페어(Art Fair)
                                    2023.08 / 기쁨의 나눔 (트레비어, 울산) 2022.03 / 빛나는 수집 (더현대서울, 여의도) 2020.07 / 희망의 아시아프2020 (홍익대학교 현대미술관, 서울) </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default SaleDetail;