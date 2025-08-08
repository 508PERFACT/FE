import { signature } from '@/assets';
import styles from '@/styles/pages/AlterNative.module.scss';
import { useEffect, useState } from 'react';

export const AlterNative = () => {
  const [reportData, setReportData] = useState({});

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
          <span className={styles.caption}>같은 주제, 다른 관점</span>
          <div className={styles.headerTitle}>다른 시각도 함께 보시겠어요?</div>
        </div>
        <div className={styles.topSection}>
          <span className={styles.caption}>(2025년 7월 기준)</span>
          <div className={styles.newsContent}>
            <div className={styles.sectionRow}>
              <div className={styles.labelGray}>기사 원문</div>
              <div>
                <a href={reportData.url}>{reportData.title}</a>
                <p>
                  신뢰도 {reportData.trueScore.overallScore}점 | 신뢰성 높음
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.labelBlue}>반대시각 뉴스</div>
          <span className={styles.summary}>
            체중감량 고민, ‘위고비 다이어트’가 도움될 수 있어 위고비는 FDA 승인
            주사제로, 식욕 조절 호르몬을 활용해 장기 체중감량 가능 BMI 27 이상
            및 대사증후군 환자에게 효과적 철저한 진료/상담을 통해 처방되는 전문
            치료제 구토·설사 등 부작용 가능성도 있으나, 의료기관 관리 시 통제
            가능
          </span>
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.section} ${styles.tableSection}`}>
          <div className={styles.labelBlue}>반대시각 뉴스</div>
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th>기존 기사</th>
                <th>반대 기사</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>강조성</td>
                <td>오남용 위험,부작용 사례 소개 중심</td>
                <td>의학적 효과,치료 옵션 강조 중심</td>
              </tr>
              <tr>
                <td>접근방식</td>
                <td>사례중심+사회적 문제 제기</td>
                <td>전문가 발언 중심+의료적 효능 설명</td>
              </tr>
              <tr>
                <td>톤</td>
                <td>중립적 경고+감정적 공감 혼합</td>
                <td>전문가 기반 설명+합리적 권고 중심</td>
              </tr>
              <tr>
                <td>의도</td>
                <td>‘무분별한 사용 자제’ 메시지</td>
                <td>‘의료 목적 활용 시 효과적’ 메시지</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.divider}></div>

        <div className={`${styles.section} ${styles.tableSection}`}>
          <div className={styles.labelBlue}>반대시각 뉴스</div>
          <table>
            <thead>
              <tr>
                <th>핵심 주제</th>
                <th>기존 기사</th>
                <th>반대 기사</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>감량 효과</td>
                <td>50kg 감량 사례 중심 소개</td>
                <td>GTP-1 기반으로 의학적 효과 설명</td>
              </tr>
              <tr>
                <td>부작용 강조</td>
                <td>탈모,위장 장애등 부작용 사례</td>
                <td>부작용 언급 있음(구토,설사), 의료 통제 가능 강조</td>
              </tr>
              <tr>
                <td>오남용 경고</td>
                <td>‘정상 체중도 맞는다’사례 → 사회적문제로 확대</td>
                <td>오남용보다는 효과적 치료 대상 선별에 초점</td>
              </tr>
              <tr>
                <td>전문가 조언</td>
                <td>“효과는 있지만 신중해야”</td>
                <td>“BMI 27 이상이라면 치료 옵션 가능”</td>
              </tr>
              <tr>
                <td>메시지 방향</td>
                <td>“경계하고 주의하라”</td>
                <td>‘제대로 쓰면 도움이 된다’</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.section}>
          <div className={styles.labelGray}>AI 요약 결론</div>
          <span className={styles.summary}>
            체중감량 고민, ‘위고비 다이어트’가 도움될 수 있어 위고비는 FDA 승인
            주사제로, 식욕 조절 호르몬을 활용해 장기 체중감량 가능 BMI 27 이상
            및 대사증후군 환자에게 효과적 철저한 진료/상담을 통해 처방되는 전문
            치료제 구토·설사 등 부작용 가능성도 있으나, 의료기관 관리 시 통제
            가능
            <img src={signature} alt="sign" />
          </span>
        </div>
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
