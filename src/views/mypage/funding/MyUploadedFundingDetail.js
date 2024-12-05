import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../../../css/mypage/funding/MyUploadedFundingDetail.module.css';
import Header from "../../Header";
import SideNav from "../SideNav";
import {Modal, Box, Typography, Button} from "@mui/material";
import {url} from "../../../config";
import {useNavigate, useParams} from "react-router-dom";
import {useAtomValue} from "jotai/index";
import {tokenAtom} from "../../../atoms";

function MyUploadedFundingDetail() {
    const [contributors, setContributors] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState([]);
    const {fundingId} = useParams();
    const navigate = useNavigate();
    const token = useAtomValue(tokenAtom);

    useEffect(() => {
        axios.get(`${url}/api/myPage/funding/registeredFunding/${fundingId}`, {headers: {Authorization: token}})
            .then((response) => {
                setContributors(response.data.content);
            })
            .catch((error) => {
                console.error("Error fetching funding details:", error);
            });
    }, [fundingId]);

    // 리워드 모달 열기
    const handleOpenModal = (rewards) => {
        setSelectedReward(rewards);
        setOpenModal(true);
    };

    // 리워드 모달 닫기
    const handleCloseModal = () => {
        setOpenModal(false);
    };


    // 펀딩 상세 페이지로 이동
    const navigateToFundingDetail = () => {
        navigate(`/fundings/${fundingId}`);
    };

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <SideNav/>
                <div className={styles.myUploadedFundingDetail}>
                    {/* 펀딩 상세 보기 버튼 */}
                    <div className={styles.fundingDetailButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={navigateToFundingDetail}  // 클릭 시 상세 페이지로 이동
                            sx={{
                                color: '#b29c59', // 텍스트 색상
                                borderColor: '#b29c59', // 테두리 색상

                            }}
                        >
                            펀딩 상세 보기
                        </Button>
                    </div>

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
                                <tr key={contributor.fundingOrderId}>
                                    <td>{contributor.name}</td>
                                    <td>{contributor.phoneNumber}</td>
                                    <td>{contributor.address}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleOpenModal(contributor.rewards)}
                                            sx={{
                                                backgroundColor: '#333', // 버튼 배경색
                                                color: '#b29c59', // 텍스트 색상
                                            }}
                                        >
                                            구매한 리워드 보기
                                        </Button>
                                    </td>
                                    <td>{contributor.totalAmount}원</td>
                                    <td>{new Date(contributor.paymentDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 리워드 모달 */}
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="reward-modal-title"
                        aria-describedby="reward-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#333',
                            color: '#b29c59',
                            padding: '20px',
                            boxShadow: 24,
                            width: 400,
                        }}>
                            <Typography id="reward-modal-title" variant="h6" component="h2">
                                구매한 리워드
                            </Typography>
                            <ul id="reward-modal-description">
                                {selectedReward.map((reward) => (
                                    <li key={reward.contributionId}>
                                        {reward.rewardName} - {reward.rewardQuantity}개
                                    </li>
                                ))}
                            </ul>
                            <Button onClick={handleCloseModal} variant="outlined" color="primary">
                                닫기
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default MyUploadedFundingDetail;
