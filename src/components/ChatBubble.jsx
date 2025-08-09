import React from 'react';
import styles from '@/styles/components/ChatBubble.module.scss';

import { logo_chatbot } from '@/assets';
export const ChatBubble = ({ senderType, message }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        senderType === 'AI' ? styles.bot : styles.user
      }`}
      style={{
        background: senderType === 'AI' ? '#DBF1FF' : '#3A68FF',
        color: senderType === 'AI' ? '#424145' : 'white',
      }}
    >
      {message === '로딩중' && (
        <div className={styles.loadingDots}>
          <span className={styles.loadingDot}></span>
          <span className={styles.loadingDot}></span>
          <span className={styles.loadingDot}></span>
        </div>
      )}
      <span className={styles.text}>
        {message !== '로딩중' && message}
        {senderType === 'AI' ? <img src={logo_chatbot} alt="bot" /> : ''}
      </span>
    </div>
  );
};
