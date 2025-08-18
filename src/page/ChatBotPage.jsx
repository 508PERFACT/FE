import React, { useEffect, useRef, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const { messages, recommendQuestions, addMessage } = useChatData(
    reportId,
    setIsChatStarted,
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      chatContainerRef.current.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages, isChatStarted]);

  const handleFormSubmit = async (e, questionText = userInput) => {
    if (e) e.preventDefault();
    if (!questionText.trim()) return;

    const text = questionText;
    addMessage('USER', text);
    setIsLoading(true);
    setUserInput('');

    try {
      const res = await api.post(`report/${reportId}/chat`, {
        userInput: text,
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
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isChatStarted ? (
        <div className={styles.mainWrapper}>
          <div ref={chatContainerRef} className={styles.mainChatContent}>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.chatId}
                senderType={msg.senderType}
                message={msg.message}
              />
            ))}
            {isLoading && <ChatBubble senderType={'AI'} message={'로딩중'} />}
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
          <div
            className={`${styles.suggest} ${
              recommendQuestions.length !== 0 && styles.visible
            }`}
          >
            <span className={styles.suggestedTitle}>추천질문</span>
            <div className={styles.suggestedContent}>
              {recommendQuestions.map((question, index) => (
                <button
                  className={styles.suggestedButton}
                  key={index}
                  onClick={() => handleFormSubmit(null, question)}
                >
                  <span>
                    {question.split(',').map((s, i) => (
                      <p key={i}>
                        {s.trim()}
                        {question.split(',').length - 1 > i && ','}
                      </p>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          className={`${styles.chatInputForm} ${
            isLoading ? styles.disabledInput : ''
          }`}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            className={styles.chatInputText}
            placeholder="질문을 입력하세요."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.chatSendButton}
            disabled={isLoading}
          >
            <img src={enter_icon} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
