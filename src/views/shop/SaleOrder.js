import styles from '../../css/shop/SaleList.css';
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
                            <tr className={styles.detailTopRightArray ,styles.colorGold}>
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
                            <tr className={styles.detailTopRightArray}>
                                 <td className={styles.colorGold}>기본 프레임 +100000</td> 
                            </tr>
                        </tbody>
                    </Table>
                </div>
            
            </div>
              <div>
                <div className={styles.userInfo}>

                    <div>구매자 정보</div>&nbsp;
                    <div className={styles.userInfoButton}>
                        <Button className={styles.userInfoButtonstyle}>회원 배송지</Button>
                    </div>
                    <div><Button>직접 입력</Button></div>
                </div>
                <br/>
                    <Table className={styles.deltailorder}> 
                        <tbody className={styles.deltailorderLefr}>
                            <tr>
                                <img src='User.png' className={styles.imgInfo}/><td className={styles.deltailorderLefrtitle}> 이름 :</td>
                                <td colSpan="2" className={styles.deltailorderLefrcontent}>수목원</td>
                            </tr>
                            <tr>
                                <img src='Phone.png' className={styles.imgInfo}/><td>연락처 :</td>
                                <td colSpan="2" className={styles.deltailorderLefrcontent}>010-6429-****</td>
                            </tr>
                            <tr>
                                <img src='Letter.png' className={styles.imgInfo}/><td>이메일 :</td>
                                <td colSpan="2" className={styles.deltailorderLefrcontent}>junyung123456789@naver.com</td>
                            </tr>
                            <tr>
                            <img src='City.png' className={styles.imgInfo}/><td>주소 :</td>
                                <td colSpan="2" className={styles.deltailorderLefrcontent}>경기도 안양시 동안로 14-10 이스케이프 룸 5층</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <Table className={styles.deltailordertotalprice}>
                                <tbody className={styles.deltailordertotalpricetbody}>
                                    <tr className={}>
                                        <td className={styles.deltailordertotalpriceleft}><Label>골드런나아가라폭포의 한숨</Label></td>
                                    </tr>
                                    <tr>
                                        <td className={styles.deltailordertotalpriceleft}> {framename[selectedFrame]} </td>&nbsp;&nbsp;&nbsp;
                                    </tr>
                                    <br/>
                                    <tr>
                                        <td className={styles.deltailordertotalpriceleft, styles.colorGold} >총 금액 </td>&nbsp;&nbsp;&nbsp;
                                    </tr>
                                </tbody>
                                <tbody className={styles.deltailordertotalpricetbody}>
                                    <tr className={}>
                                        <td className={styles.deltailordertotalpriceleft}>{new Intl.NumberFormat().format(basePrice)}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.deltailordertotalpriceleft}>+{new Intl.NumberFormat().format(framePrices[selectedFrame])}</td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td className={styles.deltailordertotalpriceleft,styles.colorGold}>{new Intl.NumberFormat().format(totalPrice)}</td> &nbsp;&nbsp;&nbsp;
                                    </tr>
                                </tbody>     
                            </Table>
                        </tbody>

                    </Table>

                </div>
                <div className={styles.detaildiv}>
                    <Button className={styles.detailbottombutton}>결제하기</Button>
                </div>
        </>
    );
}

export default SaleDetail;