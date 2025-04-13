// components/common/ChartCard/ToolsSidebar.jsx
import { FiDownload, FiSettings, FiFilter, FiMaximize } from 'react-icons/fi';
import styles from './ChartCard.module.css';

const ToolsSidebar = ({ 
  onDownload, 
  onSettings, 
  onFilter, 
  onExpand 
}) => {
  return (
    <div className={styles.toolsSidebar}>
      <button 
        onClick={onDownload} 
        className={styles.toolButton}
        aria-label="Download chart"
      >
        <FiDownload />
      </button>
      <button 
        onClick={onFilter} 
        className={styles.toolButton}
        aria-label="Filter data"
      >
        <FiFilter />
      </button>
      <button 
        onClick={onSettings} 
        className={styles.toolButton}
        aria-label="Chart settings"
      >
        <FiSettings />
      </button>
      <button 
        onClick={onExpand} 
        className={styles.toolButton}
        aria-label="Expand chart"
      >
        <FiMaximize />
      </button>
    </div>
  );
};

export default ToolsSidebar;