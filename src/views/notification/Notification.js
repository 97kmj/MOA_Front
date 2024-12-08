import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/notification/Notification.module.css";
import {url} from "../../config";
import {useSSE} from "./sse/SSEProvider";

const Notification = ({ username, children }) => {
    const [unreadCount, setUnreadCount] = useState(0); // 초기 알림 개수 관리
    const { unreadCount: sseUnreadCount } = useSSE(); // SSE에서 받은 알림 개수

    console.log("Unread count in Notification:", sseUnreadCount); // 디버그 로그

    const [notifications, setNotifications] = useState([]); // 알림 리스트
    const [showNotifications, setShowNotifications] = useState(false); // 알림 리스트 토글 상태


    // 알림 개수 가져오기
    useEffect(() => {
        if (username) {
            axios
                .get(`${url}/api/sse/count`, { params: { username } })
                .then((response) => {
                    setUnreadCount(response.data); // 초기 알림 개수 설정
                })
                .catch((err) => console.error("Error fetching unread count:", err));
        }
    }, [username]);

    // useEffect(() => {
    //     if (sseUnreadCount !== undefined) {
    //         setUnreadCount(sseUnreadCount);
    //     }
    // }, [sseUnreadCount]);

    useEffect(() => {
        if (sseUnreadCount !== undefined) {
            setUnreadCount((prev) => Math.max(sseUnreadCount, prev)); // SSE 데이터와 로컬 데이터 동기화
        }
    }, [sseUnreadCount]);


    // 알림 리스트 가져오기
    useEffect(() => {
        if (username) {
            axios
                .get(`${url}/api/sse/notifications`, { params: { username } })
                .then((response) => {
                    setNotifications(response.data); // 알림 리스트 설정
                })
                .catch((err) => console.error("Error fetching notifications:", err));
        }
    }, [username, unreadCount]);



    const handleMarkAsRead = (notificationId) => {

      if(window.confirm("알림을 읽음처리 하시겠습니까 ?")) {
          axios
              .post(`${url}/api/sse/markAsRead/${notificationId}`, {}, {
                  params: {username},
              })
              .then(() => {
                  setNotifications((prev) =>
                      prev.filter((notif) => notif.id !== notificationId)
                  ); // 읽은 알림 삭제
                  setUnreadCount((prev) => Math.max(prev - 1, 0));
              })
              .catch((err) => console.error("Error marking notification as read:", err));

      }
    };


    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <div className={styles.notificationBox} onClick={toggleNotifications}>
            {/* 자식 컴포넌트로 알림 아이콘 렌더링 */}
            <div className={styles.iconContainer}>
                {children}
                {unreadCount > 0 && (
                    <span className={styles.notificationCount}>{unreadCount}</span>
                )}
            </div>
            {showNotifications && (
                <ul className={styles.notificationList}>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className={styles.notificationItem}
                                onClick={() => handleMarkAsRead(notification.id)} // 클릭 시 읽음 처리
                            >
                                {notification.message}
                            </li>
                        ))
                    ) : (
                        <li className={styles.empty}>No notifications</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Notification;
