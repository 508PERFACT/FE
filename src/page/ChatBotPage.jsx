import React, { useEffect, useState } from 'react';
import styles from '@/styles/pages/ChatBotPage.module.scss';
import { ChatBubble } from '@/components/ChatBubble';
import api from '@/apis/axiosInstance';
import { useParams } from 'react-router-dom';
import { enter_icon } from '@/assets';

export const ChatBotPage = () => {
  const { id: reportId } = useParams();
  const [isChatStarted, setIsChatStarted] = useState(true);
  const [messages, setMessages] = useState([]); // 테스트용 목데이터
  const [recommendQuestions, setRecommendQuestions] = useState([]);

  useEffect(() => {
    const getChatLogs = async () => {
      // const res = await api.get(`/api/report/${reportId}/chat`);
      // if (res?.data.isSuccess) setMessages(res.data.result.chatLogs);
      setMessages(mockChatData.result.chatLogs);
    };

    const getRecommnendQuestions = async () => {
      try {
        // const res = await api.get(`/api/report/${reportId}/chat/recommend`);
        // if (res?.data.isSuccess)
        //   setRecommendQuestions(res.data.result.questions);
        setRecommendQuestions(mockQuestions.result.questions);
      } catch (error) {
        console.error(error);
      }
    };
    getChatLogs();
    getRecommnendQuestions();
  }, [reportId]);

  // 메세지 추가 함수
  const addMessage = (senderType, message) => {
    setMessages((prev) => [
      ...prev,
      {
        chatId: messages.length() + 1,
        senderType: senderType,
        message: message,
      },
    ]);
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
