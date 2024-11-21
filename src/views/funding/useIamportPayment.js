import { useEffect, useCallback } from 'react';

const useIamportPayment = () => {
    useEffect(() => {
        const scriptId = 'iamport-script';

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
            script.id = scriptId;
            script.async = true;

            script.onload = () => {
                if (window.IMP) {
                    console.log('아임포트 SDK 로드 성공!');
                } else {
                    console.error('아임포트 객체가 정의되지 않았습니다.');
                }
            };

            script.onerror = () => console.error('아임포트 SDK 로드 실패!');

            document.body.appendChild(script);
        } else {
            console.log('아임포트 SDK가 이미 로드되었습니다.');
        }
    }, []);

    const requestPayment = useCallback(
        ({
             merchant_uid,
             name,
             amount,
             buyer_email,
             buyer_name,
             buyer_tel,
             buyer_addr,
             buyer_postcode,
             m_redirect_url,
         }) => {
            if (!window.IMP) {
                alert('아임포트가 아직 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.');
                return;
            }

            const { IMP } = window;
            IMP.init('imp12345678'); // 테스트용 가맹점 식별코드

            IMP.request_pay(
                {
                    pg: 'html5_inicis',
                    pay_method: 'card',
                    merchant_uid,
                    name,
                    amount,
                    buyer_email,
                    buyer_name,
                    buyer_tel,
                    buyer_addr,
                    buyer_postcode,
                    m_redirect_url,
                },
                (rsp) => {
                    if (rsp.success) {
                        fetch('/api/payments/complete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                imp_uid: rsp.imp_uid,
                                merchant_uid: rsp.merchant_uid,
                                amount: rsp.paid_amount,
                            }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('서버 응답:', data);
                                alert('결제가 성공적으로 완료되었습니다!');
                            })
                            .catch((error) => {
                                console.error('서버 에러:', error);
                                alert('결제는 성공했지만 서버 통신에 문제가 발생했습니다.');
                            });
                    } else {
                        alert(`결제에 실패하였습니다. 에러 메시지: ${rsp.error_msg}`);
                    }
                }
            );
        },
        []
    );

    return { requestPayment };
};

export default useIamportPayment;
