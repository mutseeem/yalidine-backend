import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import styles from './ChartArea.module.css';

// register the zoom plugin globally
Chart.register(zoomPlugin);

const COLORS = [
  '#4361ee', '#3a0ca3', '#7209b7', '#b5179e',
  '#f72585', '#4cc9f0', '#4895ef', '#3f37c9',
  '#560bad', '#480ca8'
];

// allow parent ChartCard to get a direct reference to methods
const ChartArea = forwardRef(({
  type = 'bar',
  data,
  options = {},
  zoomLevel = 1,
  onZoomChange = () => {}
}, ref) => {
  const chartCanvasRef = useRef(null);
  const chartInstance = useRef(null);

  // expose specific methods to the parent component via the ref
  useImperativeHandle(ref, () => ({
    // programmatically zoom the chart
    performZoomChange(factor) {
      if (chartInstance.current) {
        chartInstance.current.zoom(factor);
      }
    },
    // reset the chart's zoom and pan to its initial state
    resetChartZoom() {
      if (chartInstance.current) {
        chartInstance.current.resetZoom();
      }
    }
  }));

  // initialize and destroy the Chart.js instance
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    const ctx = chartCanvasRef.current.getContext('2d');

    // destroy any existing chart instance
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
              onZoomComplete: ({ chart }) => {
                // optional: callback for user-initiated zoom
              },
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

    // cleanup function: destroy chart instance on unmount or re-render
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  // prepare chart data based on type
  const prepareChartData = (type, data) => {
    if (type === 'doughnut') {
      return {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
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
      <canvas ref={chartCanvasRef} />
    </div>
  );
});


ChartArea.displayName = 'ChartArea';

export default ChartArea;