import api from '@/apis/axiosInstance';
import { useEffect, useState } from 'react';

export const useChatData = (reportId, setIsChatStarted) => {
  const [messages, setMessages] = useState([]);
  const [recommendQuestions, setRecommendQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatRes, questionsRes] = await Promise.all([
          api.get(`/api/report/${reportId}/chat`),
          api.get(`/api/report/${reportId}/chat/recommend`),
        ]);
        setMessages(chatRes.data.result.chatLogs);
        setRecommendQuestions(questionsRes.data.result.questions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [reportId]);

  useEffect(() => {
    if (messages.length != 0) setIsChatStarted(true);
  }, [messages]);

  // 메세지 추가 함수
  const addMessage = (senderType, message) => {
    const messageData = {
      chatId: Date.now(),
      senderType: senderType,
      message: message,
    };
    setMessages((prev) => [...prev, messageData]);
    console.log(messages);
  };
  return { messages, recommendQuestions, addMessage };
};
