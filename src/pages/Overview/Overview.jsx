import { useQuery } from '@tanstack/react-query';
import { fetchFieldsData } from '../../services/api';
import AnsweredQuestionsCountTable from './AnsweredQuestionsCountTable/AnsweredQuestionsCountTable';
import AnsweredQuestionsDonutChart from './AnsweredQuestionsDonutChart/AnsweredQuestionsDonutChart';
import QuestionList from './QuestionList/QuestionsList';
import DocumentCard from '../../components/common/DocumentCard';
import ChartCard from '../../components/common/ChartCard/ChartCard';
import ToolsSidebar from '../../components/common/ChartCard/ToolsSidebar';
import styles from './Overview.module.css';

const Overview = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fieldsData'],
    queryFn: fetchFieldsData,
  });

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Sales 2023',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

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
      <DocumentCard  title="document of the IDK and IDC" uploadDate="20/02/08" fileSize="89212 kb" fileType="txt"/>
      <ChartCard
      title="Monthly Sales"
      chartType="bar"
      chartData={chartData}
      //onDownload={handleDownload}
      onSettings={() => console.log('Settings clicked')}
      onFilter={() => console.log('Filter clicked')}
      onExpand={() => console.log('Expand clicked')}
      
    />
      

      {/* <ToolsSidebar />*/}
    </div>
    
  );
};

export default Overview;