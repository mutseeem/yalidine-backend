import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import styles from './ChartArea.module.css';

Chart.register(zoomPlugin);

const ChartArea = ({ 
  type = 'bar', 
  data, 
  options,
  isZoomed = false,
  onZoomChange
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: 'easeOutQuart'
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: { enabled: false }, // Disabled mouse wheel zoom
              pinch: { enabled: false }, // Disabled pinch zoom
              mode: 'xy',
              onZoom: ({ chart }) => onZoomChange?.(chart.isZoomedOrPanned())
            },
            pan: {
              enabled: true,
              mode: 'xy'
            }
          },
          legend: {
            position: 'top',
            labels: {
              padding: 20,
              font: {
                family: "'Inter', sans-serif"
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(234, 234, 234, 0.5)',
              drawBorder: false
            }
          },
          y: {
            grid: {
              color: 'rgba(234, 234, 234, 0.5)',
              drawBorder: false
            }
          }
        },
        ...options
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  useEffect(() => {
    if (!chartInstance.current) return;
    isZoomed ? chartInstance.current.zoom(1.2) : chartInstance.current.resetZoom();
  }, [isZoomed]);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartArea;