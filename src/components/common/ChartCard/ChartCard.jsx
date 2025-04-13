import { useState, useRef } from 'react';
import ChartArea from './ChartArea';
import ToolsSidebar from './ToolsSidebar';
import styles from './ChartCard.module.css';
import html2canvas from 'html2canvas';

const ChartCard = ({ 
  title = "Data Visualization",
  description = "Interactive chart visualization",
  initialChartType = 'bar',
  chartData,
  initialChartOptions = {}
}) => {
  const [chartType, setChartType] = useState(initialChartType);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  const chartRef = useRef(null);

  const handleDownload = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${title || 'chart'}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Error downloading chart:', error);
    }
  };

  const handleZoomChange = (factor) => {
    setZoomLevel(prev => {
      const newZoom = prev * factor;
      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  };

  const handleHistogramClick = () => {
    setChartType('line');
    setChartOptions(prev => ({
      ...prev,
      elements: {
        line: {
          tension: 0 // Disable smoothing for histogram mode
        }
      }
    }));
  };

  return (
    <div className={styles.chartCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.chartWrapper} ref={chartRef}>
          <ChartArea
            type={chartType}
            data={chartData}
            options={chartOptions}
            zoomLevel={zoomLevel}
            onZoomChange={handleZoomChange}
          />
        </div>

        <ToolsSidebar
          activeChartType={chartType}
          onChartTypeChange={setChartType}
          onDownload={handleDownload}
          chartContainerRef={chartRef}
          onZoomIn={() => handleZoomChange(1.2)}
          onZoomOut={() => handleZoomChange(0.8)}
          zoomLevel={zoomLevel}
          onHistogramClick={handleHistogramClick}
        />
      </div>
    </div>
  );
};

export default ChartCard;