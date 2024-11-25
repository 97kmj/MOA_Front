import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../atoms';
import axios from 'axios';

const TokenHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenString = query.get('token');

    if (tokenString) {
      try {
        const parsedToken = JSON.parse(decodeURIComponent(tokenString));
        const accessToken = parsedToken.access_token.replace('Bearer ', '');

        // 토큰 저장
        setToken(accessToken);

        // 사용자 정보 요청 및 저장
        axios
          .get('http://localhost:8080/api/user/profile', {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            setUser(response.data); // 사용자 정보 저장
            navigate('/'); // 메인 페이지로 리다이렉트
          })
          .catch((error) => {
            console.error('Error fetching user info:', error);
            alert('사용자 정보를 가져올 수 없습니다.');
          });
      } catch (error) {
        console.error('Error parsing token:', error);
        alert('잘못된 토큰 형식입니다.');
      }
    } else {
      alert('토큰이 존재하지 않습니다.');
      navigate('/user/login');
    }
  }, [location.search, navigate, setToken, setUser]);

  return <div>처리 중...</div>;
};

export default TokenHandler;
