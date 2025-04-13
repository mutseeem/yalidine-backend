// components/common/ChartCard/ChartCard.jsx
import ToolsSidebar from './ToolsSidebar';
import ChartArea from './ChartArea';
import styles from './ChartCard.module.css';

const ChartCard = ({
  title = 'Chart Title',
  chartType = 'bar',
  chartData,
  chartOptions = {},
  onDownload,
  onSettings,
  onFilter,
  onExpand
}) => {
  return (
    <div className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <ToolsSidebar 
          onDownload={onDownload}
          onSettings={onSettings}
          onFilter={onFilter}
          onExpand={onExpand}
        />
      </div>
      
      <div className={styles.chartWrapper}>
        <ChartArea 
          type={chartType}
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default ChartCard;