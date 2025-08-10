import api from '@/apis/axiosInstance';
import { signature } from '@/assets';
import { useHover } from '@/hooks/useHover';
import styles from '@/styles/pages/Report.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Report = () => {
  const [reportData, setReportData] = useState({});
  const [reliability, setReliability] = useState({});
  const [modalType, setModalType] = useState('close');

  const alterNewsHover = useHover();
  const chatbotHover = useHover();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`users/${id}`);
        if (res?.data.isSuccess) setReportData(res.data.result);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const score = reportData.trueScore?.overallScore;
    setReliability(getReliabilityMessage(score));
  }, [reportData, reliability]);

  const handleAlterNative = async () => {
    setModalType('loading');
    try {
      const res = await api.get(`/report/${id}/alternative`);
      if (res.data.isSuccess) {
        navigate(`/report/${id}/alternative`, {
          state: {
            res: res.data.result,
            overallScore: reportData.trueScore?.overallScore || 0,
            reliability,
          },
        });
        setModalType('close');
      }
    } catch (error) {
      console.error(error);
      setModalType('false');
    }
  };

  if (!reportData || Object.keys(reportData).length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {modalType !== 'close' && (
        <div className={styles.modalWrapper}>
          {modalType === 'loading' && (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>
              <span>분석중...</span>
            </div>
          )}

          {modalType === 'false' && (
            <div className={styles.modalContent}>
              <div className={styles.modalDesc}>
                <span className={styles.modalTitle}>
                  <span style={{ color: 'red' }}>분석</span> 실패
                </span>
                <div className={styles.modalCaption}>
                  죄송해요. 다른 시각의 기사를 찾지 못했어요.
                </div>
              </div>
              <div
                className={styles.confirmButton}
                onClick={() => setModalType('close')}
              >
                확인
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.topSection}>
            <span className={styles.caption}>퍼팩트가 분석한 결과는요?</span>
            <div className={styles.titleBox}>
              <div
                ref={alterNewsHover.nodeRef}
                className={styles.linkButton}
                onClick={handleAlterNative}
              >
                다른 시각의 기사보기
                <div
                  className={`${styles.hoverCaption} ${styles.alterNewsCaption}`}
                  style={{
                    opacity: alterNewsHover.isHovering ? 1 : 0,
                    visibility: alterNewsHover.isHovering
                      ? 'visible'
                      : 'hidden',
                  }}
                >
                  사용자가 보고 있던 주제에 대해 상반된 입장을 가진 기사들을
                  비교하며,
                  <br />
                  정보 편향 없이 스스로 판단할 수 있도록 돕는 기능
                </div>
              </div>
              <div className={styles.headerTitle}>💡[AI 통합 리포트]</div>
              <Link
                ref={chatbotHover.nodeRef}
                to={`/report/${reportData.reportId}/chat`}
                className={styles.linkButton}
              >
                AI 설명 챗봇
                <div
                  className={`${styles.hoverCaption} ${styles.chatbotCaption}`}
                  style={{
                    opacity: chatbotHover.isHovering ? 1 : 0,
                    visibility: chatbotHover.isHovering ? 'visible' : 'hidden',
                  }}
                >
                  신뢰도 리포트를 본 후 생기는 의문을 AI에게 후속 질문하면
                  <br />
                  사람의 언어로 쉽게 풀어 설명을 해주는 기능
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.topSection}>
            <span className={styles.caption}>
              {reportData.publicationDate.split('-').join('.')} /{' '}
              {reportData.publisher}
            </span>
            <div className={styles.newsContent}>
              <div className={styles.sectionRow}>
                <div className={styles.labelGray}>기사 원문</div>
                <a href={reportData.url}>{reportData.title}</a>
              </div>
              <div className={styles.sectionRow}>
                <div className={styles.labelGray}>분야 / 주제</div>
                <span>
                  {reportData.category || '분류 없음'} /{' '}
                  {reportData.oneLineSummary || '요약 없음'}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.labelBlue}>3줄 요약</div>
            <div className={styles.summary}>
              {reportData.summary ? (
                reportData.summary
                  .split('. ')
                  .map((s, index) => <p key={index}>{s}.</p>)
              ) : (
                <p>요약 정보가 없습니다.</p>
              )}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.labelBlue}>신뢰도 분석</div>
            <table>
              <colgroup>
                <col style={{ width: '100px' }} />
                <col style={{ width: '50px' }} />
                <col style={{ width: '250px' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>평가 항목</th>
                  <th>점수</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>✅ 출처 신뢰성</td>
                  <td>{reportData.trueScore?.sourceReliability || 0}점</td>
                  <td>{reportData.trueScore?.sourceReliabilityReason}</td>
                </tr>
                <tr>
                  <td>📃 사실근거</td>
                  <td>{reportData.trueScore?.factualBasis || 0}점</td>
                  <td>{reportData.trueScore?.factualBasisReason}</td>
                </tr>
                <tr>
                  <td>🚨 광고/과장표현</td>
                  <td>{reportData.trueScore?.adExaggeration || 0}점</td>
                  <td>{reportData.trueScore?.adExaggerationReason}</td>
                </tr>
                <tr>
                  <td>📌 편향성</td>
                  <td>{reportData.trueScore?.bias || 0}점</td>
                  <td>{reportData.trueScore?.biasReason}</td>
                </tr>
                <tr>
                  <td>📝 기사 형식</td>
                  <td>{reportData.trueScore?.articleStructure || 0}점</td>
                  <td>{reportData.trueScore?.articleStructureReason}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.section}>
            <div className={styles.scoreBadge}>
              <div className={styles.sectionRow}>
                <div className={styles.labelBlue}>신뢰도 점수</div>
                <div className={styles.score}>
                  {reportData.trueScore?.overallScore || 0}
                  <span style={{ color: reliability?.color }}>
                    {reliability?.message}
                  </span>
                </div>
              </div>
              <div className={styles.sectionRow}>
                <div className={styles.labelGray}>AI 판단 배지</div>
                <div className={styles.badges}>
                  {reportData.reportBadges ? (
                    reportData.reportBadges.map((badge) => (
                      <div className={styles.badge} key={badge.badgeId}>
                        {badge.badgeDescription}
                      </div>
                    ))
                  ) : (
                    <span>배지 정보가 없습니다.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.result}>
          <span>
            {reliability?.result}
            <img src={signature} alt="sign" />
          </span>
        </div>
      </div>
    </>
  );
};

const reliabilityMessages = [
  {
    min: 80,
    max: 100,
    message: '✅ 신뢰도 높음',
    result: '“객관적이며 신뢰할 수 있는 기사입니다.”',
    color: '#00B200',
  },
  {
    min: 60,
    max: 79,
    message: '🟨 신뢰도 보통',
    result:
      '“기본적인 정보는 신뢰할 수 있으나, 일부 내용은 추가 확인이 필요합니다.”',
    color: '#EFB600',
  },
  {
    min: 40,
    max: 59,
    message: '🟨 신뢰도 보통',
    result:
      '“과장되거나 근거가 부족한 내용이 포함되어 있어 주의가 필요합니다.”',
    color: '#EFB600',
  },
  {
    min: 0,
    max: 39,
    message: '⛔ 신뢰도 매우 낮음',
    result: '“신뢰할 수 없는 정보 또는 광고성·왜곡 가능성이 높은 기사입니다.”',
    color: '#EF0000',
  },
];

const getReliabilityMessage = (score) =>
  reliabilityMessages.find(({ min, max }) => score >= min && score <= max);
