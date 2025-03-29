import React from 'react';
import styles from './Subsection.module.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

// Default Chart Options for Consistency
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#ffffff',
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#333',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#444',
      borderWidth: 1,
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || '';
          const value = context.raw || 0;
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#ffffff',
        font: {
          size: 10,
        },
      },
    },
    y: {
      grid: {
        color: '#444',
      },
      ticks: {
        color: '#ffffff',
        font: {
          size: 10,
        },
      },
    },
  },
};

export default function Subsection({ title, files, graphs }) {
  return (
    <div className={styles.subsection}>
      <h3>{title}</h3>

      {/* Files Section */}
      {files && (
        <div className={styles.files}>
          {files.map((file, index) => (
            <div key={index} className={styles.file}>
              <img src={`/icons/${file.type}.svg`} alt="File Icon" />
              <div>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{file.size}</span>
                {file.unavailable && <span className={styles.unavailable}>(Unavailable)</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Graphs Section */}
      {graphs && (
        <div className={styles.graphs}>
          {graphs.map((graph, index) => (
            <div key={index} className={styles.graph}>
              <h4>{graph.title}</h4>
              {graph.type === 'bar' && (
                <Bar
                  data={graph.data}
                  options={{
                    ...defaultOptions,
                    plugins: {
                      ...defaultOptions.plugins,
                      title: {
                        display: true,
                        text: graph.title,
                        color: '#ffffff',
                        font: {
                          size: 14,
                          weight: 'bold',
                        },
                      },
                    },
                  }}
                />
              )}
              {graph.type === 'line' && (
                <Line
                  data={graph.data}
                  options={{
                    ...defaultOptions,
                    elements: {
                      line: {
                        tension: 0.4, // Smooth curves
                        borderWidth: 2,
                        borderColor: graph.data.datasets[0].borderColor,
                        fill: false,
                      },
                      point: {
                        radius: 4,
                        hoverRadius: 6,
                        backgroundColor: graph.data.datasets[0].backgroundColor,
                      },
                    },
                  }}
                />
              )}
              {graph.type === 'pie' && (
                <Pie
                  data={graph.data}
                  options={{
                    ...defaultOptions,
                    plugins: {
                      ...defaultOptions.plugins,
                      legend: {
                        ...defaultOptions.plugins.legend,
                        position: 'right',
                      },
                    },
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}