import styles from '@/styles/pages/MyReports.module.scss';
import { arrow_right, logo_modal, report_blue } from '@/assets';
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
        const res = await api.get(`users?page=${currentPage}`);
        setPageData(res.data.result);
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
        {pageData !== undefined && pageData?.reports.length != 0 ? (
          pageData?.reports.map((report) => (
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
          ))
        ) : (
          <div className={styles.blankPage}>
            <img src={logo_modal} alt="logo" />
            <div className={styles.blank}>
              저장된 레포트가 없습니다. 레포트를 추가해주세요!
            </div>
          </div>
        )}
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
        {!pageData?.last && pageData?.totalPages > currentPage && (
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
