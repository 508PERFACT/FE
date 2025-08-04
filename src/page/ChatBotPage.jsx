import React from 'react';
import styles from '@/styles/pages/ChatBotPage.module.scss';

export const ChatBotPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.introContent}>
        <span className={styles.title}>
          기사에 관한 모든 사실을 무엇이든 물어보세요!
        </span>
        <div className={styles.introBubble} />
        <div className={styles.introBubble} />
      </div>
      <div className={styles.chatInput}>
        <span className={styles.suggestedTitle}>추천질문</span>
        <div className={styles.suggestedContent}>
          <button className={styles.suggestedButton}>
            <span>왜 점수가 낮아요?</span>
          </button>
          <button className={styles.suggestedButton}>
            <span>이 기사 왜 광고같나요?</span>
          </button>
        </div>
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
