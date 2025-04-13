// components/common/ChartCard/ChartArea.jsx
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import styles from './ChartCard.module.css';

const ChartArea = ({ 
  type = 'bar', 
  data, 
  options 
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = new Chart(chartRef.current, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...options
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartArea;