import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaTable,
  FaChartArea,
  FaExchangeAlt,
  FaDownload,
  FaSearchPlus,
  FaSearchMinus
} from 'react-icons/fa';
import styles from './ToolsSidebar.module.css';

const ToolsSidebar = ({ 
  activeChartType = 'bar',
  onChartTypeChange = () => {},
  onCompare = () => {},
  onDownload = () => {},
  chartContainerRef,
  onZoomIn = () => {},
  onZoomOut = () => {},
  zoomLevel = 1
}) => {
  const chartTypes = [
    { type: 'bar', icon: <FaChartBar />, label: 'Bar Chart' },
    { type: 'line', icon: <FaChartLine />, label: 'Line Chart' },
    { type: 'doughnut', icon: <FaChartPie />, label: 'Doughnut Chart' },
    { type: 'histogram', icon: <FaChartArea />, label: 'Histogram (Coming Soon)' },
    { type: 'table', icon: <FaTable />, label: 'Data Table (Coming Soon)' }
  ];

  const handleChartTypeClick = (type) => {
    if (type === 'histogram' || type === 'table') {
      alert('This feature is coming soon!');
      return;
    }
    onChartTypeChange(type);
  };

  const handleCompareClick = () => {
    alert('Compare feature is coming soon!');
  };

  return (
    <div className={styles.toolsSidebar}>
      <div className={styles.chartTypeGroup}>
        {chartTypes.map((chart) => (
          <button
            key={chart.type}
            className={`${styles.toolButton} ${activeChartType === chart.type ? styles.active : ''}`}
            onClick={() => handleChartTypeClick(chart.type)}
            aria-label={chart.label.replace(/\(.*?\)/, '').trim()}
            data-tooltip={chart.label}
          >
            {chart.icon}
            <span className={styles.toolLabel}>{chart.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.viewGroup}>
        <div className={styles.zoomControls}>
          <button 
            className={`${styles.zoomButton} ${zoomLevel <= 0.5 ? styles.disabled : ''}`}
            onClick={onZoomOut}
            disabled={zoomLevel <= 0.5}
            aria-label="Zoom out"
            data-tooltip="Zoom out"
          >
            <FaSearchMinus />
          </button>
          
          <span className={styles.zoomLevel}>{Math.round(zoomLevel * 100)}%</span>
          
          <button 
            className={`${styles.zoomButton} ${zoomLevel >= 3 ? styles.disabled : ''}`}
            onClick={onZoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom in"
            data-tooltip="Zoom in"
          >
            <FaSearchPlus />
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.utilityGroup}>
        <button 
          className={styles.toolButton}
          onClick={handleCompareClick}
          aria-label="Compare data"
          data-tooltip="Compare data (Coming Soon)"
        >
          <FaExchangeAlt />
          <span className={styles.toolLabel}>Compare (Soon)</span>
        </button>
        <button 
          className={styles.toolButton}
          onClick={onDownload}
          aria-label="Download chart"
          data-tooltip="Download as JPEG"
        >
          <FaDownload />
          <span className={styles.toolLabel}>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ToolsSidebar;