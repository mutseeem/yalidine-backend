import React, { useState, useRef } from "react";
import styles from "./AnsweredQuestionsCountTable.module.css";
import { DownloadIcon, DownloadIconFocus } from "../../assets/icons/icons";
import html2canvas from "html2canvas"; // Importing html2canvas

const AnsweredQuestionsCountTable = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "name",  // default sorting by "name"
    direction: "asc",  // default ascending order
  });

  // Create a ref to the insights section
  const insightsSectionRef = useRef(null);

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

  const renderProgressBar = (answeredCount, totalQuestions) => (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${(answeredCount / (totalQuestions || 1)) * 100}%` }}
      ></div>
    </div>
  );

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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDownload = () => {
    const tableElement = document.querySelector(`.${styles.insightsTable}`); // Target the table directly
  
    if (tableElement) {
      html2canvas(tableElement, {
        useCORS: true, // For external images like icons, etc.
        scale: 3, // Increase this value for higher resolution (higher means better quality)
        scrollX: 0,
        scrollY: -window.scrollY, // Adjust for page scrolling
        width: tableElement.offsetWidth,
        height: tableElement.offsetHeight,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/jpeg", 1.0); // Convert to JPEG image with quality 1.0 (100%)
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "answered_questions_number_table.jpeg"; // Name of the downloaded file
        link.click(); // Trigger the download
      }).catch((error) => {
        console.error("Error during html2canvas rendering:", error);
      });
    } else {
      console.error("Table element not found for screenshot");
    }
  };
  
  
  

  return (
    <div className={styles.insightsSection} ref={insightsSectionRef}>
      <div className={styles.tableContainer}>
        {/* Download Icon with Hover Logic */}
        <img
          src={isHovered ? DownloadIconFocus : DownloadIcon}  // Toggle icon based on hover state
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
