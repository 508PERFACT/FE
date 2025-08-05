import React from 'react';
import styles from '@/styles/components/ChatBubble.module.scss';

import { logo_chatbot } from '@/assets';
export const ChatBubble = ({ sender, content }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        sender === 'bot' ? styles.bot : styles.user
      }`}
      style={{
        background: sender === 'bot' ? '#DBF1FF' : '#3A68FF',
        color: sender === 'bot' ? '#424145' : 'white',
      }}
    >
      <span className={styles.text}>
        {content}
        {sender === 'bot' ? <img src={logo_chatbot} alt="bot" /> : ''}
      </span>
    </div>
  );
};
