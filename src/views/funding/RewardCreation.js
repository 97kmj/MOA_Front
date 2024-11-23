import React, { useState } from 'react';
import styles from '../../css/funding/RewardCreation.module.css';
import Header from "../Header";
import StepNavigation from "./StepNavigation";
import { useNavigate } from "react-router-dom";
import useFundingStore from "./store/fundingStore";

const RewardCreation = () => {
    const navigate = useNavigate();
    const { rewards, storeAddReward, storeRemoveReward } = useFundingStore();
    const [newReward, setNewReward] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        limitPerPerson: '',
        rewardType: 'CUSTOM',
        isQuantityLimited: false,
        isLimitPerPerson: false,
    });

    const goToNextStep = () => {
        navigate("/funding/new/artworks");
    };

    // 입력값 처리
    const inputRewardValues = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;

        setNewReward((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    // 리워드 추가
    const addReward = () => {
        if (!newReward.name.trim() || isNaN(Number(newReward.price))) {
            alert("리워드 이름또는 가격을 올바르게 입력하세요.");
            return;
        }

        if (newReward.name && newReward.price) {
            const customRewards = rewards.filter((reward) => reward.id !== null);
            const nextId = customRewards.length > 0 ? Math.max(...customRewards.map((r) => r.id)) + 1 : 1;

            storeAddReward({
                id: nextId,
                ...newReward,
            });
            setNewReward({
                name: '',
                description: '',
                price: '',
                quantity: '',
                limitPerPerson: '',
                rewardType: 'CUSTOM',
                isQuantityLimited: false,
                isLimitPerPerson: false,
            });
        }
    };

    // 리워드 삭제
    const removeReward = (id) => {
        const targetReward = rewards.find((reward) => reward.id === id);
        if (targetReward && targetReward.rewardType === 'BASIC') {
            alert("기본 리워드는 삭제할 수 없습니다.");
            return;
        }
        storeRemoveReward(id);
    };

    return (
        <>
            <Header />

            <div>
                <div className={styles.rewardCreationContainer}>
                    <StepNavigation currentStep="리워드 등록" />
                    <div className={styles.rewardCreationHeader}></div>
                    <div className={styles.rewardCreationOutForm}>
                        <div className={styles.rewardCreationForm}>
                            <h3 className={styles.rewardCreationTitle}>리워드 만들기</h3>

                            <div className={styles.rewardCreationFormSection}>
                                <label>리워드 이름</label>
                                <input
                                    type="text"
                                    className={styles.rewardCreationInput}
                                    name="name"
                                    placeholder="리워드 이름을 입력해주세요"
                                    value={newReward.name}
                                    onChange={inputRewardValues}
                                />
                            </div>

                            <div className={styles.rewardCreationFormSection}>
                                <label>리워드 설명</label>
                                <input
                                    type="text"
                                    className={styles.rewardCreationInput}
                                    name="description"
                                    placeholder="리워드 설명을 입력해주세요"
                                    value={newReward.description}
                                    onChange={inputRewardValues}
                                />
                            </div>

                            <div className={styles.rewardCreationFormSection}>
                                <label>리워드 가격</label>
                                <input
                                    type="text"
                                    className={styles.rewardCreationInput}
                                    name="price"
                                    placeholder="리워드 가격을 입력해주세요"
                                    value={newReward.price}
                                    onChange={inputRewardValues}
                                />
                            </div>

                            {/* 수량 제한 */}
                            <div className={styles.rewardCreationFormSection}>
                                <label>수량</label>
                                <div className={styles.rewardCreationCheckboxGroup}>
                                    <div className={styles.rewardCreationCheckbox}>
                                        <input
                                            type="checkbox"
                                            name="isQuantityLimited"
                                            checked={newReward.isQuantityLimited}
                                            onChange={inputRewardValues}
                                        />
                                        <span>있음</span>
                                        {newReward.isQuantityLimited && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={newReward.quantity}
                                                    onChange={inputRewardValues}
                                                    className={styles.rewardCreationNumberInput}
                                                    placeholder="100"
                                                />
                                                <span>개</span>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.rewardCreationCheckbox}>
                                        <input
                                            type="checkbox"
                                            name="isQuantityLimited"
                                            checked={!newReward.isQuantityLimited}
                                            onChange={() =>
                                                setNewReward((prev) => ({
                                                    ...prev,
                                                    isQuantityLimited: false,
                                                    quantity: '',
                                                }))
                                            }
                                        />
                                        <span>없음</span>
                                    </div>
                                </div>
                            </div>

                            {/* 개인당 리워드 제한 */}
                            <div className={styles.rewardCreationFormSection}>
                                <label>개인당 리워드 개수 제한</label>
                                <div className={styles.rewardCreationCheckboxGroup}>
                                    <div className={styles.rewardCreationCheckbox}>
                                        <input
                                            type="checkbox"
                                            name="isLimitPerPerson"
                                            checked={newReward.isLimitPerPerson}
                                            onChange={inputRewardValues}
                                        />
                                        <span>있음</span>
                                        {newReward.isLimitPerPerson && (
                                            <>
                                                <input
                                                    type="number"
                                                    name="limitPerPerson"
                                                    value={newReward.limitPerPerson}
                                                    onChange={inputRewardValues}
                                                    className={styles.rewardCreationNumberInput}
                                                    placeholder="5"
                                                />
                                                <span>개</span>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.rewardCreationCheckbox}>
                                        <input
                                            type="checkbox"
                                            name="isLimitPerPerson"
                                            checked={!newReward.isLimitPerPerson}
                                            onChange={() =>
                                                setNewReward((prev) => ({
                                                    ...prev,
                                                    isLimitPerPerson: false,
                                                    limitPerPerson: '',
                                                }))
                                            }
                                        />
                                        <span>없음</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={styles.rewardCreationAddRewardButton}
                                onClick={addReward}
                            >
                                리워드 추가
                            </button>
                        </div>

                        <section className={styles.rewardCreationList}>
                            {rewards.map((reward) => (
                                <div key={reward.id || 'basic'} className={styles.rewardCreationItem}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`}
                                        alt="리워드 아이콘"
                                        className={styles.rewardCreationIcon}
                                    />
                                    <div className={styles.rewardCreationInfo}>
                                        <h3>{reward.name}</h3>
                                        <p className={styles.rewardCreationDescription}>
                                            {reward.description}
                                        </p>
                                        <p className={styles.rewardCreationPrice}>
                                            {reward.price}원 /{' '}
                                            {reward.isQuantityLimited ? `${reward.quantity}개` : '0개'}
                                        </p>
                                        {reward.isLimitPerPerson && (
                                            <p className={styles.rewardCreationLimit}>
                                                1인당 최대 {reward.limitPerPerson}개
                                            </p>
                                        )}
                                    </div>
                                    {reward.rewardType !== 'BASIC' && (
                                        <button
                                            className={styles.rewardCreationDeleteButton}
                                            onClick={() => removeReward(reward.id)}
                                        >
                                            ✖️
                                        </button>
                                    )}
                                </div>
                            ))}
                        </section>
                    </div>
                    <button
                        className={styles.rewardCreationNextStepButton}
                        onClick={goToNextStep}
                    >
                        다음 단계
                    </button>
                </div>
            </div>
        </>
    );
};

export default RewardCreation;
