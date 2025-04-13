import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaTable,
  FaChartArea,
  FaArrowsAltH,
  FaExchangeAlt,
  FaDownload,
  FaSearchPlus,
  FaSearchMinus
} from 'react-icons/fa';
import styles from './ToolsSidebar.module.css';

const ToolsSidebar = ({ 
  activeChartType = 'bar', // Default to bar chart
  onChartTypeChange = (type) => alert(`Switched to ${type} chart`),
  onCompare = () => alert('Compare mode activated'),
  onDownload = () => alert('Download dialog opened'),
  onSpacingChange = () => alert('Adjusting chart spacing'),
  onZoomIn = () => alert('Zooming in'),
  onZoomOut = () => alert('Zooming out'),
  isZoomed = false
}) => {
  const chartTypes = [
    { type: 'bar', icon: <FaChartBar />, label: 'Bar Chart' },
    { type: 'line', icon: <FaChartLine />, label: 'Line Chart' },
    { type: 'donut', icon: <FaChartPie />, label: 'Donut Chart' },
    { type: 'histogram', icon: <FaChartArea />, label: 'Histogram' },
    { type: 'table', icon: <FaTable />, label: 'Data Table' }
  ];

  // Unified click handler for chart type changes
  const handleChartTypeClick = (type) => {
    onChartTypeChange(type);
  };

  // Toggle zoom handler
  const handleZoomClick = () => {
    isZoomed ? onZoomOut() : onZoomIn();
  };

  return (
    <div className={styles.toolsSidebar}>
      {/* Chart Type Buttons */}
      <div className={styles.chartTypeGroup}>
        {chartTypes.map((chart) => (
          <button
            key={chart.type}
            className={`${styles.toolButton} ${activeChartType === chart.type ? styles.active : ''}`}
            onClick={() => handleChartTypeClick(chart.type)}
            aria-label={chart.label}
            data-tooltip={chart.label}
          >
            {chart.icon}
            <span className={styles.toolLabel}>{chart.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* View Tools */}
      <div className={styles.viewGroup}>
        <button 
          className={styles.toolButton}
          onClick={onSpacingChange}
          aria-label="Adjust spacing"
          data-tooltip="Adjust spacing"
        >
          <FaArrowsAltH />
          <span className={styles.toolLabel}>Spacing</span>
        </button>
        
        <button 
          className={`${styles.toolButton} ${isZoomed ? styles.active : ''}`}
          onClick={handleZoomClick}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          data-tooltip={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
          <span className={styles.toolLabel}>
            {isZoomed ? "Zoom Out" : "Zoom In"}
          </span>
        </button>
      </div>

      <div className={styles.divider} />

      {/* Utility Buttons */}
      <div className={styles.utilityGroup}>
        <button 
          className={styles.toolButton}
          onClick={onCompare}
          aria-label="Compare data"
          data-tooltip="Compare data"
        >
          <FaExchangeAlt />
          <span className={styles.toolLabel}>Compare</span>
        </button>
        <button 
          className={styles.toolButton}
          onClick={onDownload}
          aria-label="Download chart"
          data-tooltip="Download chart"
        >
          <FaDownload />
          <span className={styles.toolLabel}>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ToolsSidebar;