import React, { createContext, useContext, useEffect, useState } from "react";
import { useAtom } from "jotai/react";
import { userAtom } from "../../../atoms";

// Context 생성
const SSEContext = createContext();

// Provider 생성
export const SSEProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]); // 알림 데이터 상태
    const [isConnected, setIsConnected] = useState(false); // SSE 연결 상태
    const [user] = useAtom(userAtom); // 사용자 정보 가져오기
    const [unreadCount, setUnreadCount] = useState(0); // 읽지 않은 알림 개수

    // username 추출
    const username = user?.username;

    useEffect(() => {
        console.log("Unread count updated in context:", unreadCount);
    }, [unreadCount]);

    useEffect(() => {
        if (!username) {
            console.warn("SSE connection skipped: Username is not available.");
            return;
        }
        console.log("Connecting to SSE server for username:", username);

        let eventSource;

        const connect = () => {
            eventSource = new EventSource(`http://localhost:8080/api/sse/subscribe/${username}`);

            eventSource.onopen = () => {
                console.log("SSE connection established for username:", username);
                setIsConnected(true);
            };

            eventSource.onmessage = (event) => {
                console.log("New notification received:", event.data);
                setNotifications((prev) => [...prev, event.data]); // 알림 추가
            };

            eventSource.addEventListener("heartbeat", (event) => {
                console.log("Heartbeat received:", event.data);
            });

            eventSource.addEventListener("unreadCount", (event) => {
                const newCount = Number(event.data);
                console.log("Updating unread count to:", newCount);
                setUnreadCount(newCount);
            });

            eventSource.onerror = (error) => {
                console.error("SSE connection error:", error);
                setIsConnected(false);
                eventSource.close();

                // 재연결 로직
                setTimeout(() => {
                    console.log("Reconnecting SSE...");
                    connect(); // 재귀적으로 연결 재설정
                }, 60000); // 1분 후 재연결 시도
            };
        };

        connect();


        return () => {
            console.log("Closing SSE connection for username:", username);
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [username]); // username 변경 시 실행

    return (
        <SSEContext.Provider value={{ notifications, isConnected, unreadCount }}>
            {children}
        </SSEContext.Provider>
    );
};

// 알림 데이터와 SSE 상태를 사용하는 커스텀 훅
export const useSSE = () => useContext(SSEContext);
