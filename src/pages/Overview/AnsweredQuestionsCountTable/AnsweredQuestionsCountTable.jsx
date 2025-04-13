import React, { useState, useRef } from "react";
import styles from "./AnsweredQuestionsCountTable.module.css";
import { DownloadIcon, DownloadIconFocus } from "../../../assets/icons/icons";
import { downloadChartAsImage } from "../../../util/chart"; // Import the utility function

const AnsweredQuestionsCountTable = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "name", // Default sorting by "name"
    direction: "asc", // Default ascending order
  });

  const insightsSectionRef = useRef(null);

  // Function to process data
  const getFieldsData = () => {
    if (!data?.length) return [];

    return data.map((field) => {
      const answerCount = field.questions?.filter((q) => q.status === "answered").length || 0;
      const totalCount = field.questions?.length || 0;

      return {
        name: field.tag,
        answeredCount: answerCount,
        totalQuestions: totalCount,
      };
    });
  };

  const fieldsData = getFieldsData();

  // Render progress bar
  const renderProgressBar = (answeredCount, totalQuestions) => (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${(answeredCount / (totalQuestions || 1)) * 100}%` }}
      ></div>
    </div>
  );

  // Render table rows
  const renderTableRows = () => {
    if (fieldsData.length === 0) {
      return (
        <tr>
          <td colSpan="3" style={{ textAlign: "center", fontStyle: "italic", color: "#777" }}>
            Data is missing . . .
          </td>
        </tr>
      );
    }

    const sortedFields = [...fieldsData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedFields.map((field, index) => (
      <tr key={index}>
        <td>{field.name}</td>
        <td>{field.answeredCount}/{field.totalQuestions}</td>
        <td>{renderProgressBar(field.answeredCount, field.totalQuestions)}</td>
      </tr>
    ));
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle download
  const handleDownload = () => {
    const tableElement = document.querySelector(`.${styles.insightsTable}`); // Target the table directly
    downloadChartAsImage(tableElement, "answered_questions_number_table.jpeg"); // Call the utility function
  };

  return (
    <div className={styles.insightsSection} ref={insightsSectionRef}>
      <div className={styles.tableContainer}>
        {/* Download Icon with Hover Logic */}
        <img
          src={isHovered ? DownloadIconFocus : DownloadIcon} // Toggle icon based on hover state
          alt="Download Icon"
          className={styles.downloadIcon}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleDownload} // Trigger download when clicked
        />

        {/* Table Header */}
        <h2 className={styles.headTitle}>Nombre de questions répondues</h2>
        <h3 className={styles.underHead}>Par champ</h3>

        {/* Table */}
        <table className={styles.insightsTable}>
          <thead>
            <tr>
              <th
                onClick={() => handleSort("name")}
                className={sortConfig.key === "name" ? styles.sortedHeader : ""}
              >
                Champ
              </th>
              <th
                onClick={() => handleSort("answeredCount")}
                className={sortConfig.key === "answeredCount" ? styles.sortedHeader : ""}
              >
                Réponses
              </th>
              <th
                className={sortConfig.key === "totalQuestions" ? styles.sortedHeader : ""}
              >
                Progrès
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AnsweredQuestionsCountTable;