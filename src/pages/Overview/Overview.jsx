import { useQuery } from '@tanstack/react-query';
import { fetchFieldsData } from '../../services/api';
import AnsweredQuestionsCountTable from './AnsweredQuestionsCountTable/AnsweredQuestionsCountTable';
import AnsweredQuestionsDonutChart from './AnsweredQuestionsDonutChart/AnsweredQuestionsDonutChart';
import QuestionList from './QuestionList/QuestionsList';
import DocumentCard from '../../components/common/DocumentCard/DocumentCard';



import styles from './Overview.module.css';

const Overview = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fieldsData'],
    queryFn: fetchFieldsData,
  });

  

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.overviewContainer}>
      <h1 className={styles.title}>Overview</h1>
      <div className={styles.contentWrapper}>
        {data && (
          <>
            <div className={styles.tableSection}>
              <AnsweredQuestionsCountTable data={data} />
            </div>
            <div className={styles.chartSection}>
              <AnsweredQuestionsDonutChart data={data} />
            </div>
          </>
        )}
      </div>
      <QuestionList data={data} />
      
    </div>
    
  );
};

export default Overview;