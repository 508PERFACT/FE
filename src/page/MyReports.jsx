import styles from '@/styles/pages/MyReports.module.scss';
import { arrow_right, report_blue } from '@/assets';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/apis/axiosInstance';

export const MyReports = () => {
  const [pageData, setPageData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentPage = Number(id);

  useEffect(() => {
    const getReportsList = async () => {
      try {
        // const res = await api.get(`users?page=${currentPage}`);
        // setList(res.data.result);
        setPageData(reportsData.result); // 테스트용
      } catch (error) {
        console.error(error);
      }
    };
    getReportsList();
  }, [currentPage]);

  const handlePageChange = (page) => {
    navigate(`/myreports/${page}`);
  };

  const formattedDate = (raw) => {
    const date = new Date(raw);
    return date.toLocaleString('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간제
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={report_blue} alt="" />
        <span>레포트 저장함</span>
      </div>
      <div className={styles.content}>
        {pageData?.reports.map((report) => (
          <div className={styles.listItem} key={report.reportId}>
            <div className={styles.listLeft}>
              <div className={styles.date}>
                {formattedDate(report.createdAt)}
              </div>
              <div
                className={styles.listTitle}
                onClick={() => navigate(`/report/${report.reportId}`)}
              >
                {report.title}
              </div>
            </div>
            <img
              src={arrow_right}
              alt="arrow"
              onClick={() => navigate(`/report/${report.reportId}`)}
            />
          </div>
        ))}
      </div>
      <div className={styles.PageNav}>
        {currentPage != 1 && (
          <div
            className={styles.prevButton}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <img src={arrow_right} alt="arrow" />
          </div>
        )}
        <div className={styles.currentPage}>{id}</div>
        {(pageData?.last || pageData?.totalPages > currentPage) && (
          <div
            className={styles.nextButton}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <img src={arrow_right} alt="arrow" />
          </div>
        )}
      </div>
    </div>
  );
};

const reportsData = {
  isSuccess: true,
  code: 'SUCCESS',
  message: '데이터 조회 성공',
  result: {
    reports: [
      {
        reportId: 1,
        title:
          '“소비쿠폰 대신 이거 써유”… 홍성 주민, 난민·외국인에 심시일반 전한 ‘마음’',
        createdAt: '2025-07-26T12:09:00',
      },
      {
        reportId: 2,
        title:
          '[뉴스토리] “정상 체중도 맞는다”…기저의 비만약 ‘위고비’, 오남용 우려도',
        createdAt: '2025-07-27T13:00:00',
      },
      {
        reportId: 3,
        title:
          '휴가철 홍역 환자 “급증”…“예방접종으로 안전한 해외여행 즐기세요”',
        createdAt: '2025-07-26T16:09:00',
      },
      {
        reportId: 4,
        title: '고령 운전사고 늘지만 면허증 반납만이 능사아냐',
        createdAt: '2025-07-26T22:09:00',
      },
      {
        reportId: 5,
        title:
          '휴가철 홍역 환자 “급증”…“예방접종으로 안전한 해외여행 즐기세요”',
        createdAt: '2025-07-26T16:09:00',
      },
      {
        reportId: 6,
        title: '고령 운전사고 늘지만 면허증 반납만이 능사아냐',
        createdAt: '2025-07-26T22:09:00',
      },
    ],
    currentPage: 1,
    totalPages: 3,
    totalElements: 18,
    last: false,
  },
};
