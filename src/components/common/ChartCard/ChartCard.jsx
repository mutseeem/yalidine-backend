import { useState } from 'react';
import ChartArea from './ChartArea';
import ToolsSidebar from './ToolsSidebar';
import styles from './ChartCard.module.css';

const ChartCard = ({ 
  title = "Data Visualization",
  description = "Interactive chart visualization",
  initialChartType = 'bar',
  chartData,
  chartOptions = {}
}) => {
  const [chartType, setChartType] = useState(initialChartType);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.2, 2);
    setZoomLevel(newZoom);
    setIsZoomed(newZoom > 1);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.2, 1);
    setZoomLevel(newZoom);
    setIsZoomed(newZoom > 1);
  };

  return (
    <div className={styles.chartCard}>
      {/* Header Section */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Chart Container */}
      <div className={styles.content}>
        <div className={styles.chartWrapper}>
          <ChartArea
            type={chartType}
            data={chartData}
            options={chartOptions}
            isZoomed={isZoomed}
            onZoomChange={setIsZoomed}
          />
        </div>

        <ToolsSidebar
          activeChartType={chartType}
          onChartTypeChange={setChartType}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          isZoomed={isZoomed}
          zoomLevel={zoomLevel}
        />
      </div>
    </div>
  );
};

export default ChartCard;