import React, { useState } from 'react';
import styles from '../../css/mypage/Message.module.css';
import Header from "../Header";
import SideNav from "./SideNav"; // SideNav 컴포넌트 추가
import { userAtom } from '../../atoms';
import { useAtomValue } from 'jotai';

function Message() {
    const user = useAtomValue(userAtom);
    const [activeTab, setActiveTab] = useState('received'); // Default to "받은 메시지"

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const messageList = [
        { id: 1, sender: "르브론", content: "안녕하세요, 좋은 하루 되세요!", date: "24/08/07" },
        { id: 2, sender: "제임스", content: "다음 주 미팅 준비 부탁드립니다.", date: "24/08/07" },
        // ... 추가 항목
    ];

    return (
        <>
            <Header />
            <div className={styles.container}>
                {/* Side Navigation */}
                <SideNav />

                {/* Main Content */}
                <div className={styles.messageContent}>
                    <h3>쪽지함</h3>
                    {/* Tabs */}
                    <div className={styles.messageTabs}>
                        <button
                            className={activeTab === 'received' ? 'active' : ''}
                            onClick={() => handleTabClick('received')}
                        >
                            받은 쪽지
                        </button>
                        <button
                            className={activeTab === 'sent' ? 'active' : ''}
                            onClick={() => handleTabClick('sent')}
                        >
                            보낸 쪽지
                        </button>
                        <button
                            className={activeTab === 'archived' ? 'active' : ''}
                            onClick={() => handleTabClick('archived')}
                        >
                            안읽은 쪽지
                        </button>
                    </div>

                    {/* Message List */}
                    <div className={styles.messageList}>
                        {messageList.map((message) => (
                            <div key={message.id} className={styles.messageItem}>
                                
                                <div className={styles.messageItemDetails}>
                                    <h4>보낸 사람: {message.sender}</h4>
                                    <p>내용: {message.content}</p>
                                    <p>날짜: {message.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className={styles.messagePagination}>
                        <button>&lt;</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&gt;</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;
