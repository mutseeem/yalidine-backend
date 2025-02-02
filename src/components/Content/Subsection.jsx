import React from 'react';
import styles from './Subsection.module.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

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

// this code is for the subsection content that exist within the collapsible items section which can be graphs or files 

export default function Subsection({ title, files, graphs }) {
  return (
    <div className={styles.subsection}>
      <h3>{title}</h3>

      {/* Display Files */}
      {files && (
        <div className={styles.files}>
          {files.map((file, index) => (
            <div key={index} className={styles.file}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{file.size}</span>
              <a href={file.url} download className={styles.downloadLink}>
                Download
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Display Graphs */}
      {graphs && (
        <div className={styles.graphs}>
          {graphs.map((graph, index) => (
            <div key={index} className={styles.graph}>
              <h4>{graph.title}</h4>
              {graph.type === 'bar' && (
                <Bar
                  data={graph.data}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: graph.title },
                    },
                  }}
                />
              )}
              {graph.type === 'line' && (
                <Line
                  data={graph.data}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: graph.title },
                    },
                  }}
                />
              )}
              {graph.type === 'pie' && (
                <Pie
                  data={graph.data}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: graph.title },
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