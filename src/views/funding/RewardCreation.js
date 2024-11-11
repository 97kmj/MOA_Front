import React, { useState } from 'react';
import styles from '../../css/funding/RewardCreation.module.css';
import Header from "../Header";
const RewardCreation = () => {
    const [rewardList, setRewardList] = useState([
        { id: 1, name: '리워드 없는 후원', description: '리워드 없는 후원', price: 100000, quantity: 1 }
    ]);

    const [newReward, setNewReward] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        limitPerPerson: ''
    });

    // 입력값 처리
    const inputRewardValues = (e) => {
        const { name, value } = e.target;
        setNewReward((preNewReward) => ({
            ...preNewReward,
            [name]: value
        }));
    };

    // 리워드 추가
    const addReward = () => {
        if (newReward.name && newReward.price) {
            setRewardList((prevRewardList) => [
                ...prevRewardList,
                { id: prevRewardList.length + 1, ...newReward }
            ]);
            setNewReward({ name: '', description: '', price: '', quantity: '', limitPerPerson: '' });
        }
    };

    const removeReward = (id) => {
        // 리워드 없는 후원은 삭제 불가
         if (rewardList.find(reward => reward.id === id).name === '리워드 없는 후원') {
             return;
         }
        // 조건에 맞는 id가 아닌 것만 필터링
        setRewardList(rewardList.filter(reward => reward.id !== id));
    };

    return (
        <>
            <Header/>

            <div className={styles.rewardCreationContainer}>
                <div className={styles.rewardCreationHeader}>
                    <h3 className="">리워드 등록</h3>
                    <hr className={styles.rewardCreationSectionDivider}/>
                </div>
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

                        {/* Reward Price */}
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

                        <div className={styles.rewardCreationFormSection}>
                            <label>수량</label>
                            <div className={styles.rewardCreationCheckboxGroup}>
                                <div className={styles.rewardCreationCheckbox}>
                                    <input type="checkbox"/>
                                    <span>있음</span>
                                    <input type="number" name="quantity" value={newReward.quantity}
                                           onChange={inputRewardValues} className={styles.rewardCreationNumberInput}
                                           placeholder="100"/>
                                    <span>개</span>
                                </div>
                                <div className={styles.rewardCreationCheckbox}>
                                    <input type="checkbox"/>
                                    <span>없음</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rewardCreationFormSection}>
                            <label>개인당 리워드 개수 제한</label>
                            <div className={styles.rewardCreationCheckboxGroup}>
                                <div className={styles.rewardCreationCheckbox}>
                                    <input type="checkbox"/>
                                    <span>있음</span>
                                    <input type="number" name="limitPerPerson" value={newReward.limitPerPerson}
                                           onChange={inputRewardValues} className={styles.rewardCreationNumberInput}
                                           placeholder="5"/>
                                    <span>개</span>
                                </div>
                                <div className={styles.rewardCreationCheckbox}>
                                    <input type="checkbox"/>
                                    <span>없음</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.rewardCreationAddRewardButton} onClick={addReward}>
                            리워드 추가
                        </button>
                    </div>

                    <section className={styles.rewardCreationList}>
                        {rewardList.map((reward) => (
                            <div key={reward.id} className={styles.rewardCreationItem}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/funding/rewardIcon.png`}
                                    alt="리워드 아이콘"
                                    className={styles.rewardCreationIcon}
                                />
                                <div className={styles.rewardCreationInfo}>
                                    <h3>{reward.name}</h3>
                                    <p className={styles.rewardCreationDescription}>{reward.description}</p>
                                    <p className={styles.rewardCreationPrice}>
                                        {reward.price}원 / {reward.quantity}개
                                    </p>
                                </div>
                                {reward.name !== '리워드 없는 후원' && (
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
                    <button className={styles.rewardCreationNextStepButton}>다음 단계</button>
            </div>
        </>
    );
};

export default RewardCreation;
