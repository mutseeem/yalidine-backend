import { useState, useRef } from 'react';
import ChartArea from './ChartArea'; 
import ToolsSidebar from './ToolsSidebar';
import styles from './ChartCard.module.css';
import html2canvas from 'html2canvas';
//import PropTypes from 'prop-types';

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
  const chartRef = useRef(null);      // Ref for html2canvas (outer wrapper)
  const chartAreaRef = useRef(null); //  Ref for ChartArea component

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

  // zoom in 
  const handleZoomChange = (factor) => {
    if (chartAreaRef.current) {
      // call the method -> ChartArea
      chartAreaRef.current.performZoomChange(factor);

      // Update local zoomLevel state 
      setZoomLevel(prev => {
        const newZoom = prev * factor;
        return Math.min(Math.max(newZoom, 0.5), 3); // Limit zoom level between 0.5 and 3
      });
    }
  };

  // reset zoom
  const handleResetZoom = () => {
    if (chartAreaRef.current) {
      chartAreaRef.current.resetChartZoom();
      setZoomLevel(1); 
    }
  };


  const handleHistogramClick = () => {
    setChartType('line');
    setChartOptions(prev => ({
      ...prev,
      elements: {
        line: {
          tension: 0
        }
      }
    }));
  };

  return (

    <div className={styles.chartCard}>
      { /* area seciton header area */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      {/*the chart area it self*/}
      <div className={styles.content}>
        <div className={styles.chartWrapper} ref={chartRef}>
          <ChartArea
            ref={chartAreaRef} 
            type={chartType}
            data={chartData}
            options={chartOptions}
            zoomLevel={zoomLevel} 
    
          />
        </div>

        {/*Tool bar section (buttons)*/}
        <ToolsSidebar
          activeChartType={chartType}
          onChartTypeChange={setChartType}
          onDownload={handleDownload}
          chartContainerRef={chartRef}
          onZoomIn={() => handleZoomChange(1.2)} 
          onZoomOut={() => handleZoomChange(0.8)} 
          onResetZoom={handleResetZoom} 
          zoomLevel={zoomLevel}
          onHistogramClick={handleHistogramClick}
        />
      </div>
    </div>
  );
};

/*ChartCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  initialChartType: PropTypes.oneOf(['bar', 'line', 'pie', 'area']),
  chartData: PropTypes.array.isRequired,
  initialChartOptions: PropTypes.object,
};*/

export default ChartCard;