import { create } from 'zustand';

const useFundingStore = create((set) => ({
    // 펀딩 기본 정보
    fundingInfo: {
        title: '',            // 펀딩 제목
        description: '',      // 펀딩 설명
        goalAmount: '',       // 목표 금액
        schedule: {           // 펀딩 일정
            startDate: '',
            endDate: '',
        },
        registrant: {         // 등록자 정보
            name: '',
            account: { bank: '', account: '' },
        },
        mainImage: null,      // 메인 이미지 URL (Funding.fundingMainImage)
    },

    // 리워드 리스트 (Reward)
    rewards: [
        {
            id: null,
            name: '리워드 없는 후원',
            description: '리워드 없이 후원',
            price: 1000,
            quantity: 0,               // 수량 기본값
            isQuantityLimited: false,  // 수량 제한 여부
            isLimitPerPerson: false,   // 1인당 제한 여부
            limitPerPerson: 0,         // 1인당 제한 기본값
            rewardType: 'BASIC',       // 기본 리워드 타입
        },
    ],


    // 작품 리스트 (FundingImage)

    // 펀딩 정보 업데이트
    setFundingInfo: (info) =>
        set((state) => ({ fundingInfo: { ...state.fundingInfo, ...info } })),

    // 리워드 추가
    storeAddReward: (reward) =>
        set((state) => {
            // 기존 커스텀 리워드 중 가장 높은 ID를 가져옵니다.
            const customRewards = state.rewards.filter((r) => r.id !== null);
            const nextId = customRewards.length > 0
                ? Math.max(...customRewards.map((r) => r.id)) + 1
                : 1;

            // 새로운 리워드에 ID를 추가하고 상태를 업데이트합니다.
            const newReward = { ...reward, id: nextId };

            return {
                rewards: [...state.rewards, newReward],
            };
        }),


    // 리워드 삭제 (기본 리워드는 삭제 불가)
    storeRemoveReward: (id) =>
        set((state) => ({
            rewards: state.rewards.filter(
                (reward) => reward.id !== id || reward.rewardType === 'BASIC'
            ),
        })),


    artworks: [],


    // 작품 추가
    storeAddArtwork: (artwork) =>
        set((state) => ({
            artworks: [...state.artworks, artwork],
        })),

    // 초기화 메서드 추가
    resetFundingState: () =>
        set(() => ({
            fundingInfo: {
                title: '',
                description: '',
                goalAmount: '',
                schedule: {
                    startDate: '',
                    endDate: '',
                },
                registrant: {
                    name: '',
                    account: { bank: '', account: '' },
                },
                mainImage: null,
            },
            rewards: [
                {
                    id: null,
                    name: '리워드 없는 후원',
                    description: '리워드 없이 후원',
                    price: 1000,
                    quantity: 0,
                    isQuantityLimited: false,
                    isLimitPerPerson: false,
                    limitPerPerson: 0,
                    rewardType: 'BASIC',
                },
            ],
            artworks: [],
        })),



}));








export default useFundingStore;
