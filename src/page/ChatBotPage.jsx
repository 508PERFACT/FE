import React, { useState } from 'react';
import styles from '@/styles/pages/ChatBotPage.module.scss';
import { ChatBubble } from '@/components/ChatBubble';

export const ChatBotPage = () => {
  const [isChatStarted, setIsChatStarted] = useState(true);
  const [messages, setMessages] = useState(mockMessages); // 테스트용 목데이터

  // 메세지 추가 함수
  const addMessage = (sender, content) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: sender, content: content },
    ]);
  };

  return (
    <div className={styles.container}>
      {isChatStarted ? (
        <div className={styles.mainWrapper}>
          <div className={styles.mainChatContent}>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                sender={msg.sender}
                content={msg.content}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.introContent}>
          <span className={styles.title}>
            기사에 관한 모든 사실을 무엇이든 물어보세요!
          </span>
          <div className={styles.introBubble} />
          <div className={styles.introBubble} />
        </div>
      )}

      <div className={styles.chatInput}>
        {!isChatStarted && (
          <>
            <span className={styles.suggestedTitle}>추천질문</span>
            <div className={styles.suggestedContent}>
              <button className={styles.suggestedButton}>
                <span>왜 점수가 낮아요?</span>
              </button>
              <button className={styles.suggestedButton}>
                <span>이 기사 왜 광고같나요?</span>
              </button>
            </div>
          </>
        )}

        <form className={styles.chatInputForm}>
          <input
            type="text"
            className={styles.chatInputText}
            placeholder="질문을 입력하세요."
          />
          <button type="submit" className={styles.chatSendButton}>
            &uarr;
          </button>
        </form>
      </div>
    </div>
  );
};

const mockMessages = [
  {
    id: '1',
    sender: 'user',
    content: '안녕하세요!',
  },
  {
    id: '2',
    sender: 'bot',
    content: '안녕하세요 😊 무엇을 도와드릴까요?',
  },
  {
    id: '3',
    sender: 'user',
    content: '오늘 날씨 어때요?',
  },
  {
    id: '4',
    sender: 'bot',
    content:
      '서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️',
  },
  {
    id: '1',
    sender: 'user',
    content: '안녕하세요!',
  },
  {
    id: '2',
    sender: 'bot',
    content: '안녕하세요 😊 무엇을 도와드릴까요?',
  },
  {
    id: '3',
    sender: 'user',
    content: '오늘 날씨 어때요?',
  },
  {
    id: '4',
    sender: 'bot',
    content:
      '서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️서울은 현재 맑고 기온은 28도입니다 ☀️',
  },
];
