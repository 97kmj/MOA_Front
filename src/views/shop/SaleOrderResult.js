import saleStyles from '../../css/shop/Result.module.css';
import { Table, Label, Button , Input} from 'reactstrap';
import { useLocation,useNavigate } from 'react-router';
import Header from '../Header';
const SaleOrderResult = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = location.state?.requestData;
    
    const orderDate = new Date(); 
    const formattedDate = orderDate.toLocaleDateString("ko-KR");
    console.log()
    const goSaleList = ()=>{
        navigate(`/shop/saleList`);
        console.log("결제 확인 리스트로 이동");
    }


    return(
        <>
        <Header/>
            <div className={saleStyles.resultImage}>
                <img src="../img/ABOUTTHEPayment.png" />
            </div>
            <div className={saleStyles.resultImage2}>
                <img src="../img/unbrage.png" />
            </div>
            <div className={saleStyles.middleresult}>
                <div className={saleStyles.middleresultFont}>결제 완료</div>
            </div>
            <div className={saleStyles.priceInfo}>
                <div>총 주문 금액:&nbsp; </div>
                <div className=''>{userInfo.amount.toLocaleString()}</div>
            </div>
            <Table className={saleStyles.resultInfoTable}>
                <tbody>
                    <tr>
                        <td><b>받는분</b></td>
                        <td>{userInfo.buyerName}</td>
                    </tr>
                    <tr>
                        <td><b>주문일시</b></td>
                        <td>{formattedDate}</td>
                    </tr>
                    <tr>
                        <td><b>결제방법</b></td>
                        <td>카드</td>
                    </tr>
                    <tr>
                        <td>배송지</td>
                        <td>{userInfo.buyerAddr}</td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td>{userInfo.buyerTel}</td>
                    </tr>
                </tbody>
            </Table>
            <Button className={saleStyles.resultInfoButton} onClick={goSaleList}>

                확인
            </Button>


        </>
    )
}

export default SaleOrderResult;