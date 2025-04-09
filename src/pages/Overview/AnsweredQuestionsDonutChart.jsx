import React, { useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./AnsweredQuestionsDonutChart.module.css";
import { DownloadIcon } from "../../assets/icons/icons";
import { downloadChartAsImage } from "../../util/chart"; // Import the utility function

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AnsweredQuestionsDonutChart = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const chartRef = useRef(null);

  // Count statuses (answered, not_answered, missing_files)
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

  // Generate chart data with hover effects
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

  // Chart options
  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#2d3748",
          font: { size: 14, family: "Roboto, sans-serif" },
          boxWidth: 16,
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: true,
        borderColor: "transparent",
        borderWidth: 0,
        padding: 16,
        caretSize: 8,
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
    onHover: (event, chartElements) =>
      setHoverIndex(chartElements.length > 0 ? chartElements[0].index : null),
    elements: { arc: { borderWidth: 4 } },
  };

  // Handle Download
  const handleDownload = () => {
    const chartElement = chartRef.current;
    downloadChartAsImage(chartElement, "answered_questions_donut_chart.jpeg"); // Call the utility function
  };

  return (
    <div className={styles.chartContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.titleSection}>
          <h2 className={styles.headTitle}>Répartition des réponses</h2>
          <h3 className={styles.underHead}>Toutes catégories confondues</h3>
        </div>
        <img
          src={DownloadIcon}
          alt="Download Icon"
          className={styles.downloadIcon}
          onClick={handleDownload}
        />
      </div>

      {/* Chart */}
      <div ref={chartRef}>
        <Doughnut data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default AnsweredQuestionsDonutChart;