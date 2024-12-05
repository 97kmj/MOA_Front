import React, { useEffect, useState } from 'react';
import styles from '../../../css/mypage/funding/MyContributedFunding.module.css';
import Header from "../../Header";
import SideNav from "../SideNav";
import axios from "axios";
import { useAtom } from "jotai/react";
import {tokenAtom, userAtom} from "../../../atoms";
import { url } from "../../../config";

import { Modal, Box, Typography, Button } from "@mui/material";
import {useAtomValue} from "jotai/index";

function MyContributedFunding() {
    const [activeTab, setActiveTab] = useState('ONGOING'); // Default to "성공 펀딩"
    const [fundingList, setFundingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user] = useAtom(userAtom);
    const token = useAtomValue(tokenAtom);

    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태

    const [selectedFunding, setSelectedFunding] = useState(null); // 선택한 펀딩 데이터
    const [isModalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태


    // 탭 클릭 핸들러
    const changeTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(0);
    };

    // 페이지 변경 핸들러
    const changePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };


    const openFundingDetail = async (fundingOrderId) => {
        console.log(fundingOrderId);
        try {
            setLoading(true);
            const response = await axios.get(
                `${url}/api/myPage/funding/contributedFunding/${fundingOrderId}`,{   headers: {
                        Authorization: token,
                    },}
            );
            setSelectedFunding(response.data); // 상세 데이터 저장
            setModalOpen(true); // 모달 열기
        } catch (err) {
            setError("상세 데이터를 가져오는 중 문제가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedFunding(null);
    };



    function refundIndividualFunding(fundingOrderId) {
        axios
            .post(
                `${url}/api/payment/funding/refund/individual/${fundingOrderId}`, // 백엔드 API
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                console.log("환불 요청 성공:", response.data);
                alert("환불 요청이 처리되었습니다.");

                setSelectedFunding((prev) => ({
                    ...prev,
                    refundable: false,
                }));

            })
            .catch((error) => {
                console.error("환불 요청 실패:", error.response?.data || error.message);
                alert("환불 요청 중 문제가 발생했습니다.");
            });
    }


    // API 호출
    useEffect(() => {

        if (!user || !user.username) {
            setError('사용자 정보가 없습니다. 로그인 후 다시 시도해주세요.');
            return;
        }


        const getFundingData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${url}/api/myPage/funding/contributedFunding`, {
                    params: {
                        username: user.username,
                        status: activeTab.toUpperCase(),
                        page: currentPage, // 현재 페이지 번호
                        size: 5 // 페이지 크기
                    },
                    headers: {
                        Authorization: token,
                    },
                });
                setFundingList(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log(response.data);

            } catch (err) {
                setError('데이터를 가져오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        getFundingData();
    }, [user, activeTab, currentPage]);

    const translateStatus = (status) => {
        switch (status) {
            case "ONGOING":
                return "진행중";
            case "SUCCESSFUL":
                return "성공";
            case "FAILED":
                return "실패";
            case "CANCELLED":
                return "취소됨";
            default:
                return "알 수 없음";
        }
    };



    return (
        <>
            <Header/>
            <div className={styles.container}>
                <SideNav/>
                <div className={styles.myContributedFunding}>
                    <h3>내가 후원한 펀딩 조회</h3>

                    {/* Tabs */}
                    <div className={styles.myContributedFundingTabs}>
                        <button
                            className={activeTab === 'SUCCESSFUL' ? 'active' : ''}
                            onClick={() => changeTabClick('SUCCESSFUL')}
                        >
                            성공 펀딩
                        </button>
                        <button
                            className={activeTab === 'FAILED' ? 'active' : ''}
                            onClick={() => changeTabClick('FAILED')}
                        >
                            실패 펀딩
                        </button>
                        <button
                            className={activeTab === 'ONGOING' ? 'active' : ''}
                            onClick={() => changeTabClick('ONGOING')}
                        >
                            진행 펀딩
                        </button>
                    </div>


                    {loading && <p>데이터를 불러오는 중...</p>}

                    {/* Error Message */}
                    {error && <p className={styles.error}>{error}</p>}

                    {/* Funding List */}
                    {!loading && !error && (
                        <div className={styles.myContributedFundingList}>
                            {fundingList.map((funding) => (
                                <div key={funding.fundingOrderId}
                                     className={styles.myContributedFundingItem}
                                     onClick={() => openFundingDetail(funding.fundingOrderId)}
                                >
                                    <img
                                        src={funding.fundingImage || "https://via.placeholder.com/60"} // 이미지가 없을 경우 기본 이미지 사용
                                        alt="funding"
                                        className={styles.myContributedFundingItemImg}
                                    />
                                    <div className={styles.myContributedFundingItemDetails}>
                                        <h4>{funding.fundingTitle}</h4>
                                        <p>모집 희망금액: {funding.goalAmount.toLocaleString()} 원</p>
                                        <p>상태: {translateStatus(funding.fundingStatus)}</p>
                                        <p>마감일: {new Date(funding.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.myContributedFundingPagination}>
                        {currentPage > 0 && (
                            <button onClick={() => changePageChange(currentPage - 1)}>
                                &lt;
                            </button>
                        )}
                        {Array.from({length: totalPages}, (_, index) => (
                            <button
                                key={index}
                                className={currentPage === index ? 'active' : ''}
                                onClick={() => changePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages - 1 && (
                            <button onClick={() => changePageChange(currentPage + 1)}>
                                &gt;
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Material UI Modal */}
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "#fefefe",
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                        borderRadius: 4,
                        p: 4,
                        border: "1px solid #ddd",
                        overflowY: "auto",
                        maxHeight: "80vh",
                    }}
                >
                    {selectedFunding && (
                        <>
                            <Typography
                                id="modal-title"
                                variant="h6"
                                component="h2"
                                sx={{
                                    mb: 2,
                                    fontWeight: "bold",
                                    color: "#333",
                                    textAlign: "center",
                                    borderBottom: "1px solid #ddd",
                                    pb: 1,
                                }}
                            >
                                펀딩 상세 정보
                            </Typography>
                            <Typography id="modal-description" sx={{ mb: 2, lineHeight: 1.6, color: "#555" }}>
                                <strong>후원자:</strong> {selectedFunding.name}
                                <br />
                                <strong>후원 금액:</strong> {selectedFunding.totalAmount.toLocaleString()} 원
                                <br />
                                <strong>결제 방식:</strong> {selectedFunding.paymentType}
                                <br />
                                <strong>환불 상태:</strong> {selectedFunding.refundStatus}
                                <br />
                                <strong>주소:</strong> {selectedFunding.address}
                                <br />
                                <strong>전화번호:</strong> {selectedFunding.phoneNumber}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: "bold", color: "#333" }}>
                                리워드 내역:
                            </Typography>
                            <ul style={{ paddingLeft: "20px", marginBottom: "16px", color: "#555" }}>
                                {selectedFunding.contributions.map((contribution) => (
                                    <li key={contribution.contributionId}>
                                        {contribution.rewardName} - {contribution.rewardPrice.toLocaleString()} 원 x{" "}
                                        {contribution.rewardQuantity}
                                    </li>
                                ))}
                            </ul>
                            {selectedFunding.refundable && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        display: "block",
                                        width: "100%",
                                        backgroundColor: "#333",
                                        color: "#b29c59",
                                        fontWeight: "bold",
                                        "&:hover": { backgroundColor: "#555" }, // 호버 시 더 밝은 색상
                                    }}
                                    onClick={() => {
                                        refundIndividualFunding(selectedFunding.fundingOrderId);
                                        console.log("환불 요청:", selectedFunding.fundingOrderId);
                                    }}
                                >
                                    환불 요청
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    mt: 2,
                                    display: "block",
                                    width: "100%",
                                    backgroundColor: "#757575"
                                }}
                                onClick={closeModal}
                            >
                                닫기
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>


        </>
    );
}

export default MyContributedFunding;
