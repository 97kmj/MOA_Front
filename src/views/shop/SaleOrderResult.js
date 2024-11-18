import saleStyles from '../../css/shop/Result.module.css';
import { Table, Label, Button , Input} from 'reactstrap';

const SaleOrderResult = () =>{
    return(
        <>
            <div className={saleStyles.resultImage}>
                <img src="../img/ABOUT THE Payment.png" />
            </div>
            <div className={saleStyles.resultImage2}>
                <img src="../img/unbrage.png" />
            </div>
            <div className={saleStyles.middleresult}>
                <div className={saleStyles.middleresultFont}>결제 완료</div>
            </div>
            <div className={saleStyles.priceInfo}>
                <div>총 주문 금액:&nbsp; </div>
                <div className=''>1,800,000원</div>
            </div>
            <Table className={saleStyles.resultInfoTable}>
                <tbody>
                    <tr>
                        <td><b>주문자</b></td>
                        <td>르로르 제임스</td>
                    </tr>
                    <tr>
                        <td><b>주문일시</b></td>
                        <td>2024.05.03</td>
                    </tr>
                    <tr>
                        <td><b>결제방법</b></td>
                        <td>카드</td>
                    </tr>
                    <tr>
                        <td>배송지</td>
                        <td>경기도 간나시 간사동 가자미로 45-77 17-52</td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td>010-2333-0111</td>
                    </tr>
                </tbody>
            </Table>
            <Button className={saleStyles.resultInfoButton}>

                확인
            </Button>


        </>
    )
}

export default SaleOrderResult;