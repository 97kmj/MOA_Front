import { atomWithStorage, createJSONStorage } from 'jotai/utils';

// 초기 사용자 정보
export const initUser = {
  username: '', // PK
  nickname: '',
  name: '',
  email: '',
  address: '',
  role: '',
  phone: '',
  artistApprovalStatus:'',
};

// 사용자 정보를 세션 스토리지에 저장
export const userAtom = atomWithStorage(
  'user',
  initUser,
  createJSONStorage(() => sessionStorage)
);

// 토큰을 세션 스토리지에 저장
export const tokenAtom = atomWithStorage(
  'token',
  '',
  createJSONStorage(() => sessionStorage)
);
