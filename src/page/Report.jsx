import { signature } from '@/assets';
import { useHover } from '@/hooks/useHover';
import styles from '@/styles/pages/Report.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Report = () => {
  const [reportData, setReportData] = useState({});
  const alterNewsHover = useHover();
  const chatbotHover = useHover();

  useEffect(() => {
    setReportData(mockNewsReports);
  }, []);

  if (!reportData || Object.keys(reportData).length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <span className={styles.caption}>퍼팩트가 분석한 결과는요?</span>
          <div className={styles.titleBox}>
            <div ref={alterNewsHover.nodeRef} className={styles.linkButton}>
              다른 시각의 기사보기
              <div
                className={`${styles.hoverCaption} ${styles.alterNewsCaption}`}
                style={{
                  opacity: alterNewsHover.isHovering ? 1 : 0,
                  visibility: alterNewsHover.isHovering ? 'visible' : 'hidden',
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
              to={`/chatbot/${reportData.reportId}`}
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
                신뢰도 리포트를 본 후 생기는 의문을 AI에게 후속 질문하면 <br />
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
                {reportData.category} / {reportData.oneLineSummary}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.labelBlue}>3줄 요약</div>
          <div className={styles.summary}>
            {reportData.summary.split('. ').map((s, index) => (
              <p key={index}>{s}.</p>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.labelBlue}>신뢰도 분석</div>
          <table>
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
                <td>{reportData.trueScore.sourceReliability}점</td>
                <td>공영방송 SBS 보도, 명확한기자명, 신뢰도 높은 취재 포맷</td>
              </tr>
              <tr>
                <td>📃 사실근거</td>
                <td>{reportData.trueScore.factualBasis}점</td>
                <td> 실사용자 인터뷰, 전문가 견해 인용, 숫자 통계 포함 </td>
              </tr>
              <tr>
                <td>🚨 광고/과장표현</td>
                <td>{reportData.trueScore.adExaggeration}점</td>
                <td>‘기적’ 같은 표현은 있지만 맥락상 과장아님</td>
              </tr>
              <tr>
                <td>📌 편향성</td>
                <td>{reportData.trueScore.bias}점</td>
                <td>효과 사례뿐 아니라 부작용,오남용 사례도 균형 있게 다름</td>
              </tr>
              <tr>
                <td>📝 기사 형식</td>
                <td>{reportData.trueScore.articleStructure}점</td>
                <td>제목과 내용 일치, 문단 구성 명확, 방송 요약 보조 역할</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.section}>
          <div className={styles.scoreBadge}>
            <div className={styles.sectionRow}>
              <div className={styles.labelBlue}>신뢰도 점수</div>
              <div className={styles.score}>
                {reportData.trueScore.overallScore}
                <span>✅ 신뢰도 높음</span>
              </div>
            </div>
            <div className={styles.sectionRow}>
              <div className={styles.labelGray}>AI 판단 배지</div>
              <div className={styles.badges}>
                {reportData.reportBadges.map((badge) => (
                  <div className={styles.badge} key={badge.badgeId}>
                    {badge.badgeDescription}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.result}>
        <span>
          "객관적이며 신뢰할 수 있는 기사입니다."
          <img src={signature} alt="sign" />
        </span>
      </div>
    </div>
  );
};

const mockNewsReports = {
  reportId: 1,
  title: '"더워도 에어컨 켜지 마세요" 경고…노후 아파트 무슨 일',
  category: '사회',
  oneLineSummary: '노후된 아파트에 대한 에어컨 사용 경고 뉴스',
  url: 'https://n.news.naver.com/mnews/article/015/0005167504',
  publisher: '뉴스1',
  publicationDate: '2025-08-06',
  summary:
    '노후화된 아파트의 전기 설비가 급증하는 전력 수요를 감당하지 못해 예고 정전 및 실제 정전 사고가 빈발하고 있습니다. 서울, 부산, 경기 등의 지역에서 다수의 노후 아파트 단지에서 정전 사례가 보고되었으며, 이로 인해 인근 시설에도 영향을 미쳤습니다. 한국전력은 이러한 문제가 변압기와 개폐기의 용량 부족 및 자체 설비의 노후화로 인한 것이라고 지적했습니다. 전국적으로 30년 초과 노후 아파트 비율이 증가하고 있으며, 특히 분당 지역은 88%에 달하는 등 문제가 심각해지고 있습니다. 정부는 여름철 전력 수급 대책을 마련했으나, 근본적인 해결책 부재로 인해 지속적인 문제가 예상됩니다.',
  chatbotContext: `[기사 분석 리포트 요약]
이 기사는 '뉴스1'에서 보도한 것으로, 총점 82점(보통)으로 평가되었습니다.

[세부 평가 근거]
출처 신뢰성(75점): 뉴스1은 신뢰할 만한 뉴스 소스이지만, 기사 내용 중 일부는 추가적인 검증이 필요합니다.
사실 근거(90점): 정확한 날짜, 지역, 수치 등을 포함한 구체적인 사례와 데이터가 제시되어 사실성에 대한 신뢰도가 높습니다.
광고/과장 표현(80점): 기사는 주로 사실을 바탕으로 하고 있지만, 일부 표현은 독자의 주의를 끌기 위해 다소 강조되어 있을 수 있습니다.
편향성(70점): 기사는 다양한 관점을 고려하기보다는 문제의 심각성과 기술적 측면에 초점을 맞추고 있습니다.
기사 형식(85점): 정보가 체계적으로 정리되어 있고, 중요한 내용이 누락되지 않았으며, 이해하기 쉽게 작성되었습니다.

[부여된 AI 배지]
사실 검증 불가: 일부 내용의 추가적인 검증이 필요함을 의미합니다.`,
  trueScore: {
    sourceReliability: 75,
    factualBasis: 90,
    adExaggeration: 80,
    bias: 70,
    articleStructure: 85,
    overallScore: 82,
  },
  reportBadges: [
    {
      badgeId: 1,
      badgeName: 'FACT_VERIFICATION_IMPOSSIBLE',
      badgeDescription: '사실 검증 불가',
    },
  ],
  createdAt: '2025-08-07T20:20:58.994Z',
  updatedAt: '2025-08-07T20:20:58.994Z',
};
