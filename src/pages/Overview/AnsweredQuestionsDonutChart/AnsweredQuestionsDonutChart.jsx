import React, { useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./AnsweredQuestionsDonutChart.module.css";
import { DownloadIcon, DownloadIconFocus } from "../../../assets/icons/icons";
import { downloadChartAsImage } from "../../../util/chart";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AnsweredQuestionsDonutChart = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Track focus state for center text
  const [isHovered, setIsHovered] = useState(false); // Track hover state for download button
  const chartRef = useRef(null);

  // Count statuses
  const countStatuses = () =>
    data?.reduce(
      (acc, field) => {
        field.questions?.forEach((q) => {
          if (q.status === "answered") acc.answered++;
          else if (q.status === "not_answered") acc.notAnswered++;
          else if (q.status === "missing_files") acc.missingFiles++;
        });
        return acc;
      },
      { answered: 0, notAnswered: 0, missingFiles: 0 }
    );

  const { answered, notAnswered, missingFiles } = countStatuses();

  const getChartData = () => ({
    labels: ["Répondues", "Non répondues", "Fichiers manquants"],
    datasets: [
      {
        data: [answered, notAnswered, missingFiles],
        backgroundColor: ["#41b8d5", "#C12862", "#718096"].map((color, index) =>
          hoverIndex === null || index === hoverIndex ? color : ["#D3D3D3", "#A9A9A9", "#808080"][index]
        ),
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#2d3748",
          font: { size: 16, family: "Roboto, sans-serif" },
          boxWidth: 14,
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "transparent",
        borderWidth: 0,
        padding: 12,
        caretSize: 6,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw || 0;
            const total = [answered, notAnswered, missingFiles].reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
          labelColor: (tooltipItem) => ({
            borderColor: "transparent",
            backgroundColor: ["#41b8d5", "#C12862", "#718096"][tooltipItem.dataIndex],
          }),
        },
      },
    },
    hover: { mode: "nearest", intersect: true },
    elements: { arc: { borderWidth: 3 } },
    layout: { padding: 0 },
  };

  const handleDownload = () => {
    const chartElement = chartRef.current;
    downloadChartAsImage(chartElement, "answered_questions_donut_chart.jpeg");
  };

  return (
    <div className={styles.chartContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.titleSection}>
          <h2 className={styles.headTitle}>Répartition des réponses</h2>
          <h3 className={styles.underHead}>Toutes catégories</h3>
        </div>
        {/* Download Icon with Hover Logic */}
        <img
          src={isHovered ? DownloadIconFocus : DownloadIcon} // Toggle icon based on hover state
          alt="Download Icon"
          className={styles.downloadIcon}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false
          onClick={handleDownload} // Trigger download when clicked
        />
      </div>

      {/* Chart Wrapper with Center Text */}
      <div
        ref={chartRef}
        className={styles.chartWrapper}
        onMouseEnter={() => setIsFocused(true)} // Hide center text on hover
        onMouseLeave={() => setIsFocused(false)} // Show center text when leaving
      >
        <Doughnut
          data={getChartData()}
          options={{
            ...options,
            onHover: (event, elements) => {
              if (elements.length > 0) {
                setHoverIndex(elements[0].index);
              } else {
                setHoverIndex(null);
              }
            },
          }}
        />

        {/* Center Text 
        <div
          className={`${styles.centerText} ${isFocused ? styles.hidden : ""}`}
        >
          {Math.round((answered / (answered + notAnswered + missingFiles)) * 100)}%
          <div>Répondues</div>
        </div>*/}
      </div>
    </div>
  );
};

export default AnsweredQuestionsDonutChart;