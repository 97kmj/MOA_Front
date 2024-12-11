// import { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../../css/notification/Notification.module.css";
// import {url} from "../../config";
// import {useSSE} from "./sse/SSEProvider";
//
// const Notification = ({ username, children }) => {
//     const [unreadCount, setUnreadCount] = useState(0); // 초기 알림 개수 관리
//     const { unreadCount: sseUnreadCount } = useSSE(); // SSE에서 받은 알림 개수
//
//
//     const [notifications, setNotifications] = useState([]); // 알림 리스트
//     const [showNotifications, setShowNotifications] = useState(false); // 알림 리스트 토글 상태
//
//
//     // 알림 개수 가져오기
//     useEffect(() => {
//         if (username) {
//             axios
//                 .get(`${url}/api/sse/count`, { params: { username } })
//                 .then((response) => {
//                     setUnreadCount(response.data); // 초기 알림 개수 설정
//                 })
//                 .catch((err) => console.error("Error fetching unread count:", err));
//         }
//     }, [username]);
//
//
//     useEffect(() => {
//         if (sseUnreadCount !== undefined) {
//             setUnreadCount((prev) => Math.max(sseUnreadCount, prev)); // SSE 데이터와 로컬 데이터 동기화
//         }
//     }, [sseUnreadCount]);
//
//
//     // 알림 리스트 가져오기
//     useEffect(() => {
//         if (username) {
//             axios
//                 .get(`${url}/api/sse/notifications`, { params: { username } })
//                 .then((response) => {
//                     setNotifications(response.data); // 알림 리스트 설정
//                 })
//                 .catch((err) => console.error("Error fetching notifications:", err));
//         }
//     }, [username, unreadCount]);
//
//
//
//     const handleMarkAsRead = (notificationId) => {
//
//       if(window.confirm("알림을 읽음처리 하시겠습니까 ?")) {
//           axios
//               .post(`${url}/api/sse/markAsRead/${notificationId}`, {}, {
//                   params: {username},
//               })
//               .then(() => {
//                   setNotifications((prev) =>
//                       prev.filter((notif) => notif.id !== notificationId)
//                   ); // 읽은 알림 삭제
//                   setUnreadCount((prev) => Math.max(prev - 1, 0));
//               })
//               .catch((err) => console.error("Error marking notification as read:", err));
//
//       }
//     };
//
//
//     const toggleNotifications = () => {
//         setShowNotifications((prev) => !prev);
//     };
//
//     return (
//         <div className={styles.notificationBox} onClick={toggleNotifications}>
//             <div className={styles.iconContainer}>
//                 {children}
//                 {unreadCount > 0 && (
//                     <span className={styles.notificationCount}>{unreadCount}</span>
//                 )}
//             </div>
//             <div>
//
//             {showNotifications && (
//
//                 <ul className={styles.notificationList}>
//                     <div>
//                         <h3 className={styles.notificationTitle}>알림</h3>
//                     </div>
//                     {notifications.length > 0 ? (
//                         notifications.map((notification) => (
//                             <li
//                                 key={notification.id}
//                                 className={styles.notificationItem}
//                                 onClick={() => handleMarkAsRead(notification.id)} // 클릭 시 읽음 처리
//                             >
//                                 {notification.message}
//                             </li>
//                         ))
//                     ) : (
//                         <li className={styles.empty}>알림이 없습니다.</li>
//                     )}
//                 </ul>
//             )}
//             </div>
//         </div>
//     );
// };
//
// export default Notification;


import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/notification/Notification.module.css";
import { url } from "../../config";
import { useSSE } from "./sse/SSEProvider";

const Notification = ({ username, children }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const { unreadCount: sseUnreadCount } = useSSE();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // 초기 읽지 않은 개수
    useEffect(() => {
        if (username) {
            axios
                .get(`${url}/api/sse/count`, { params: { username } })
                .then((response) => {
                    setUnreadCount(response.data);
                })
                .catch((err) => console.error("Error fetching unread count:", err));
        }
    }, [username]);

    // SSE 업데이트와 동기화
    useEffect(() => {
        if (sseUnreadCount !== undefined) {
            setUnreadCount((prev) => Math.max(sseUnreadCount, prev));
        }
    }, [sseUnreadCount]);

    // 알림 목록 가져오기
    useEffect(() => {
        if (username) {
            axios
                .get(`${url}/api/sse/notifications`, { params: { username } })
                .then((response) => {
                    const fetchedNotifications = response.data.map((notif) => ({
                        ...notif,
                        read: notif.read || false,
                    }));
                    setNotifications(fetchedNotifications);
                })
                .catch((err) => console.error("Error fetching notifications:", err));
        }
    }, [username, unreadCount]);

    const handleSingleMarkAsRead = (notificationId) => {
        if (window.confirm("이 알림을 읽음처리 하시겠습니까?")) {
            axios
                .post(`${url}/api/sse/markAsRead/${notificationId}`, {}, { params: { username } })
                .then(() => {
                    setNotifications((prev) =>
                        prev.map((notif) =>
                            notif.id === notificationId ? { ...notif, read: true } : notif
                        )
                    );
                    setUnreadCount((prev) => Math.max(prev - 1, 0));
                })
                .catch((err) => console.error("Error marking notification as read:", err));
        }
    };

    const handleToggleSelect = (notificationId) => {
        setSelectedIds((prev) =>
            prev.includes(notificationId)
                ? prev.filter((id) => id !== notificationId)
                : [...prev, notificationId]
        );
    };

    const handleSelectAllToggle = () => {
        if (selectAll) {
            setSelectedIds([]);
        } else {
            const allIds = notifications.filter((n) => !n.read).map((n) => n.id);
            setSelectedIds(allIds);
        }
        setSelectAll((prev) => !prev);
    };

    const handleMarkSelectedAsRead = () => {
        if (selectedIds.length === 0) {
            alert("선택된 알림이 없습니다.");
            return;
        }

        if (window.confirm("선택된 알림들을 읽음처리 하시겠습니까?")) {
            Promise.all(
                selectedIds.map((id) =>
                    axios.post(`${url}/api/sse/markAsRead/${id}`, {}, { params: { username } })
                )
            )
                .then(() => {
                    setNotifications((prev) =>
                        prev.map((notif) =>
                            selectedIds.includes(notif.id) ? { ...notif, read: true } : notif
                        )
                    );
                    const newlyReadCount = notifications.filter(
                        (notif) => selectedIds.includes(notif.id) && !notif.read
                    ).length;
                    setUnreadCount((prev) => Math.max(prev - newlyReadCount, 0));
                    setSelectedIds([]);
                    setSelectAll(false);
                })
                .catch((err) => console.error("Error marking notifications as read:", err));
        }
    };

    const handleMarkAllAsRead = () => {
        const unreadNotifications = notifications.filter((notif) => !notif.read);
        if (unreadNotifications.length === 0) {
            alert("읽지 않은 알림이 없습니다.");
            return;
        }

        if (window.confirm("모든 알림을 읽음처리 하시겠습니까?")) {
            Promise.all(
                unreadNotifications.map((notif) =>
                    axios.post(`${url}/api/sse/markAsRead/${notif.id}`, {}, { params: { username } })
                )
            )
                .then(() => {
                    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
                    setUnreadCount(0);
                    setSelectedIds([]);
                    setSelectAll(false);
                })
                .catch((err) => console.error("Error marking all as read:", err));
        }
    };

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <div className={styles.notificationBox}>
            <div className={styles.iconContainer} onClick={toggleNotifications}>
                {children}
                {unreadCount > 0 && (
                    <span className={styles.notificationCount}>{unreadCount}</span>
                )}
            </div>
            {showNotifications && (
                <div className={styles.notificationDropdown} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.notificationHeader}>
                        <h3 className={styles.notificationTitle}>알림</h3>
                        <div className={styles.actions}>
                            <label className={styles.customCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllToggle}
                                />
                                <span className={styles.checkmark}></span>
                                <span className={styles.labelText}>전체 선택</span>
                            </label>
                            <button className={styles.actionButton} onClick={handleMarkSelectedAsRead}>
                                선택 읽음
                            </button>
                            <button className={styles.actionButton} onClick={handleMarkAllAsRead}>
                                전체 읽음
                            </button>
                        </div>
                    </div>
                    <ul className={styles.notificationList}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className={`${styles.notificationItem} ${
                                        notification.read ? styles.read : ""
                                    }`}
                                >
                                    <label className={styles.customCheckbox}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(notification.id)}
                                            onChange={() => handleToggleSelect(notification.id)}
                                            disabled={notification.read}
                                        />
                                        <span className={styles.checkmark}></span>
                                    </label>
                                    <span
                                        className={styles.notificationText}
                                        onClick={() =>
                                            !notification.read &&
                                            handleSingleMarkAsRead(notification.id)
                                        }
                                    >
                                        {notification.message}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className={styles.empty}>알림이 없습니다.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notification;
