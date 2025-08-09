import api from '@/apis/axiosInstance';
import { useEffect, useState } from 'react';

export const useChatData = (reportId) => {
  const [messages, setMessages] = useState([]);
  const [recommendQuestions, setRecommendQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const [chatRes, questionsRes] = await Promise.all([
        //   api.get(`/api/report/${reportId}/chat`),
        //   api.get(`/api/report/${reportId}/chat/recommend`),
        // ]);
        // setMessages(chatRes.data.result.chatLogs);
        // setRecommendQuestions(questionsRes.data.result.questions);

        // 테스트용 목데이터 사용
        setMessages(mockChatData.result.chatLogs);
        setRecommendQuestions(mockQuestions.result.questions);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [reportId]);

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
  return { messages, recommendQuestions, isLoading, addMessage };
};

const mockQuestions = {
  isSuccess: true,
  code: 'COMMON2000',
  message: '성공입니다.',
  result: {
    questions: [
      '이 기사의 신뢰도가 높은 이유는 무엇인가요?',
      '출처 신뢰성 점수가 75점인 이유를 설명해주세요',
    ],
  },
};

const mockChatData = {
  isSuccess: true,
  code: 'COMMON2000',
  message: '성공입니다.',
  result: {
    reportId: 1,
    chatLogs: [
      {
        chatId: 1,
        senderType: 'USER',
        message: '왜 총점이 85점인가요?',
        createdAt: '2025-08-07T20:30:15.123456',
      },
      {
        chatId: 2,
        senderType: 'AI',
        message:
          '총점이 85점인 이유는 세부 평가 근거에서 각 항목별로 받은 점수를 합산했기 때문입니다. 출처 신뢰성 80점, 사실 근거 90점, 과장/광고 표현 85점, 편향성 75점, 기사 형식 95점을 모두 더한 후 평균을 낸 결과입니다.',
        createdAt: '2025-08-07T20:30:16.234567',
      },
      {
        chatId: 3,
        senderType: 'USER',
        message: '이 기사의 신뢰도가 높은 이유는 무엇인가요?',
        createdAt: '2025-08-07T20:35:20.345678',
      },
      {
        chatId: 4,
        senderType: 'AI',
        message: `이 기사의 신뢰도가 높은 이유는 다음과 같습니다:

1. **사실 근거 (90점)**: 정확한 날짜, 지역, 수치 등을 포함한 구체적인 사례와 데이터가 제시되어 있습니다.

2. **기사 형식 (95점)**: 정보가 체계적으로 정리되어 있고, 중요한 내용이 누락되지 않았으며, 이해하기 쉽게 작성되었습니다.

3. **출처 신뢰성 (80점)**: 뉴스1은 신뢰할 만한 뉴스 소스입니다.

4. **과장/광고 표현 (85점)**: 기사는 주로 사실을 바탕으로 하고 있어 과장이 적습니다.`,
        createdAt: '2025-08-07T20:35:21.456789',
      },
    ],
  },
};
