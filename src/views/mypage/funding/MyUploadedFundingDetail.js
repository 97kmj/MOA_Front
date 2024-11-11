import React from 'react';
import  styles from '../../../css/mypage/funding/MyUploadedFundingDetail.module.css';
import Header from "../../Header";

function MyUploadedFundingDetail() {
    const contributors = [
        { id: 1, name: "USER1", rewards: "리워드1,리워드2", amount: "800,000원", date: "24/04/04" },
        { id: 2, name: "USER1", rewards: "리워드1", amount: "880,000원", date: "24/04/04" },
        { id: 3, name: "USER1", rewards: "리워드1", amount: "900,000원", date: "24/04/05" },
        { id: 4, name: "USER1", rewards: "리워드1", amount: "700,000원", date: "24/04/04" },
        // 추가 항목
    ];

    return (
        <>
            <Header />
            <div className={styles.myUploadedFundingDetail}>
                <h2>내가 올린 펀딩 조회 상세</h2>

                {/* Funding Information */}
                <div className={styles.FundingInfo}>
                    <img src="https://via.placeholder.com/300x200" alt="funding item" className={styles.fundingImage} />
                    <div className={styles.fundingDetails}>
                        <h3>펀딩 아이템 제목</h3>
                        <p>모집 희망 금액: 3000만원</p>
                        <p>최종 모집 금액: 4500만원</p>
                        <p>달성률: 150%</p>
                    </div>
                    <div className={styles.fundingDates}>
                        <p>펀딩 시작 일자: 24/09/01</p>
                        <p>펀딩 마감 일자: <span className="end-date">24/10/24</span></p>
                    </div>
                </div>

                {/* Contributors List */}
                <div className={styles.contributorsList}>
                    <table>
                        <thead>
                        <tr>
                            <th>후원자</th>
                            <th>연락처</th>
                            <th>주소</th>
                            <th>리워드</th>
                            <th>금액</th>
                            <th>후원 날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contributors.map((contributor) => (
                            <tr key={contributor.id}>
                                <td>{contributor.name}</td>
                                <td>[전화번호]</td>
                                <td>[주소]</td>
                                <td>{contributor.rewards}</td>
                                <td>{contributor.amount}</td>
                                <td>{contributor.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyUploadedFundingDetail;
