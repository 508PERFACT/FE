import React, { useState } from 'react';
import styles from '@/styles/pages/ChatBotPage.module.scss';
import { ChatBubble } from '@/components/ChatBubble';
import { useParams } from 'react-router-dom';
import { enter_icon } from '@/assets';
import { useChatData } from '@/hooks/useChatData';

export const ChatBotPage = () => {
  const { id: reportId } = useParams();
  const [isChatStarted, setIsChatStarted] = useState(false);
  const { messages, recommendQuestions, isLoading, setMessages, addMessage } =
    useChatData(reportId);

  return (
    <div className={styles.container}>
      {isChatStarted ? (
        <div className={styles.mainWrapper}>
          <div className={styles.mainChatContent}>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.chatId}
                senderType={msg.senderType}
                message={msg.message}
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
              {recommendQuestions.map((question, index) => (
                <button className={styles.suggestedButton} key={index}>
                  <span>{question}</span>
                </button>
              ))}
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
            <img src={enter_icon} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
