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
                <div className={saleStyles.middleresultFont}>판매 상품 등록</div>
            </div>
            <div className={saleStyles.priceInfo}>
                <div>가격 :&nbsp; </div>
                <div className=''>1,800,000원</div>
            </div>
            <Table className={saleStyles.resultInfoTable}>
                <tbody>
                    <tr>
                        <td><b>작가</b></td>
                        <td>오호라 오호라</td>
                    </tr>
                    <tr>
                        <td><b>작품명</b></td>
                        <td>오른쪽 부대찌개</td>
                    </tr>
                    <tr>
                        <td><b>사이즈</b></td>
                        <td>18cm x 18cm</td>
                    </tr>
                    <tr>
                        <td>카테고리</td>
                        <td>조각상</td>
                    </tr>
                    <tr>
                        <td>판매수량</td>
                        <td>1 EA</td>
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