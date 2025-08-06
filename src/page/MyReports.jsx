import React, { useState } from 'react';
import styles from '@/styles/pages/MyReports.module.scss';
import { arrow_right, report_blue } from '@/assets';

export const MyReports = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={report_blue} alt="" />
        <span>레포트 저장함</span>
      </div>
      <div className={styles.content}>
        {reportsData.map((report) => (
          <div className={styles.listItem} key={report.id}>
            <div className={styles.listLeft}>
              <div className={styles.date}>{report.date}</div>
              <div className={styles.listTitle}>{report.title}</div>
            </div>
            <img src={arrow_right} alt="arrow" />
          </div>
        ))}
      </div>
      <div className={styles.PageNav}>
        {currentPage !== 1 && (
          <div className={styles.prevButton}>
            <img src={arrow_right} alt="arrow" />
          </div>
        )}
        <div className={styles.currentPage}>{currentPage}</div>
        {currentPage <= 10 - 1 && (
          <div className={styles.nextButton}>
            <img src={arrow_right} alt="arrow" />
          </div>
        )}
      </div>
    </div>
  );
};

const reportsData = [
  {
    id: 1,
    date: '7월 26일 12:09',
    title:
      '“소비쿠폰 대신 이거 써유”… 홍성 주민, 난민·외국인에 심시일반 전한 ‘마음’',
  },
  {
    id: 2,
    date: '7월 27일 13:00',
    title:
      '[뉴스토리] “정상 체중도 맞는다”…기저의 비만약 ‘위고비’, 오남용 우려도',
  },
  {
    id: 3,
    date: '7월 26일 16:09',
    title: '휴가철 홍역 환자 “급증”…“예방접종으로 안전한 해외여행 즐기세요”',
  },
  {
    id: 4,
    date: '7월 26일 22:09',
    title: '고령 운전사고 늘지만 면허증 반납만이 능사아냐',
  },
  {
    id: 5,
    date: '7월 26일 16:09',
    title: '휴가철 홍역 환자 “급증”…“예방접종으로 안전한 해외여행 즐기세요”',
  },
  {
    id: 6,
    date: '7월 26일 22:09',
    title: '고령 운전사고 늘지만 면허증 반납만이 능사아냐',
  },
];
