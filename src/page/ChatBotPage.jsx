import React, { useState } from 'react';
import styles from '@/styles/pages/ChatBotPage.module.scss';
import { ChatBubble } from '@/components/ChatBubble';
import { useParams } from 'react-router-dom';
import { enter_icon } from '@/assets';
import { useChatData } from '@/hooks/useChatData';
import api from '@/apis/axiosInstance';

export const ChatBotPage = () => {
  const { id: reportId } = useParams();
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [userInput, setUserInput] = useState('');

  const { messages, recommendQuestions, addMessage } = useChatData(
    reportId,
    setIsChatStarted,
  );

  const handleFormSubmit = async (e, questionText = userInput) => {
    if (e) e.preventDefault();
    if (!questionText.trim()) return;

    addMessage('USER', questionText);
    try {
      const res = await api.post(`report/${reportId}/chat`, {
        userInput: questionText,
      });
      if (res?.data.isSuccess) {
        const aiMessage = res.data.result.aiResponse;
        addMessage('AI', aiMessage);
      }
    } catch (error) {
      console.error(error);
      addMessage('AI', '죄송합니다. 메시지를 처리하는 중 오류가 발생했습니다.');
    } finally {
      setUserInput('');
      setIsChatStarted(true);
    }
  };

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
                <button
                  className={styles.suggestedButton}
                  key={index}
                  onClick={() => handleFormSubmit(null, question)}
                >
                  <span>{question}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <form className={styles.chatInputForm} onSubmit={handleFormSubmit}>
          <input
            type="text"
            className={styles.chatInputText}
            placeholder="질문을 입력하세요."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit" className={styles.chatSendButton}>
            <img src={enter_icon} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
