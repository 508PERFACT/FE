import { signature } from '@/assets';
import styles from '@/styles/pages/AlterNative.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const AlterNative = () => {
  const { state } = useLocation();
  const { res, overallScore, reliability } = state || {};
  const [reportData, setReportData] = useState();

  useEffect(() => {
    setReportData(res);
    console.log(res);
  }, [res]);

  if (!reportData || Object.keys(reportData).length === 0) {
    return <div>로딩 중...</div>;
  }

  const formatYearMonth = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return `${year}년 ${parseInt(month, 10)}월 기준`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <span className={styles.caption}>같은 주제, 다른 관점</span>
          <div className={styles.headerTitle}>다른 시각도 함께 보시겠어요?</div>
        </div>
        <div className={styles.topSection}>
          <span className={styles.caption}>
            {`(${formatYearMonth(reportData.opposingPublicationDate)})`}
          </span>
          <div className={styles.newsContent}>
            <div className={styles.sectionRow}>
              <div className={styles.labelGray}>기사 원문</div>
              <div>
                <a href={reportData.url}>{reportData.opposingTitle}</a>
                <p>
                  신뢰도 {overallScore}점 | {reliability?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.labelBlue}>반대시각 뉴스</div>
          <span className={styles.summary}>
            {reportData.opposingSummary}
            <br />
            {reportData.result}
          </span>
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.section} ${styles.tableSection}`}>
          <div className={styles.labelBlue}>반대시각 뉴스</div>
          <table>
            <colgroup>
              <col style={{ width: '100px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '150px' }} />
            </colgroup>
            <thead>
              <tr>
                <th>항목</th>
                <th>기존 기사</th>
                <th>반대 기사</th>
              </tr>
            </thead>
            <tbody>
              {reportData.contentComparisons.map((content, index) => (
                <tr key={index}>
                  <td>{content.title}</td>
                  <td>{content.article}</td>
                  <td>{content.altArticle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.divider}></div>

        <div className={`${styles.section} ${styles.tableSection}`}>
          <div className={styles.labelBlue}>반대시각 뉴스</div>
          <table>
            <colgroup>
              <col style={{ width: '100px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '150px' }} />
            </colgroup>
            <thead>
              <tr>
                <th>핵심 주제</th>
                <th>기존 기사</th>
                <th>반대 기사</th>
              </tr>
            </thead>
            <tbody>
              {reportData.perspectiveComparisons.map((content, index) => (
                <tr key={index}>
                  <td>{content.title}</td>
                  <td>{content.article}</td>
                  <td>{content.altArticle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.divider}></div>

        <div className={styles.section}>
          <div className={styles.labelGray}>AI 요약 결론</div>
          <span className={styles.summary}>
            {reportData.aiConclusion}
            <img src={signature} alt="sign" />
          </span>
        </div>
      </div>
    </div>
  );
};
