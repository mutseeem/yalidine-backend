import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import styles from './ChartArea.module.css';

Chart.register(zoomPlugin);

const COLORS = [
  '#4361ee', '#3a0ca3', '#7209b7', '#b5179e',
  '#f72585', '#4cc9f0', '#4895ef', '#3f37c9',
  '#560bad', '#480ca8'
];

const ChartArea = ({
  type = 'bar',
  data,
  options = {},
  zoomLevel = 1,
  onZoomChange = () => {}
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleZoom = (factor) => {
    if (!chartInstance.current) return;
    
    const zoom = chartInstance.current.options.plugins.zoom.zoom;
    const currentZoom = zoom.wheel?.enabled ? zoom.wheel.speed : 0.1;
    
    // Simulate wheel zoom with the given factor
    const deltaY = factor > 1 ? -1 : 1;
    const wheelEvent = new WheelEvent('wheel', {
      deltaY,
      clientX: chartRef.current.width / 2,
      clientY: chartRef.current.height / 2,
    });
    
    chartRef.current.dispatchEvent(wheelEvent);
    onZoomChange(factor);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const preparedData = prepareChartData(type, data);

    chartInstance.current = new Chart(ctx, {
      type,
      data: preparedData,
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
              wheel: { 
                enabled: true,
                speed: 0.1
              },
              pinch: { 
                enabled: true 
              },
              mode: 'xy',
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
          },
          ...(type === 'doughnut' && {
            doughnut: {
              cutout: '60%'
            }
          })
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(234, 234, 234, 0.3)',
              drawBorder: false
            }
          },
          y: {
            grid: {
              color: 'rgba(234, 234, 234, 0.3)',
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

  const prepareChartData = (type, data) => {
    if (type === 'doughnut') {
      return {
        labels: data.labels,
        datasets: data.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: COLORS.slice(0, data.labels.length),
          borderColor: '#fff',
          borderWidth: 2
        }))
      };
    }
    return {
      ...data,
      datasets: data.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: COLORS[index % COLORS.length],
        borderColor: COLORS[index % COLORS.length],
        borderWidth: 2
      }))
    };
  };

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartArea;