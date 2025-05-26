import { useState } from 'react';
import DocumentCard from './DocumentCard/DocumentCard';
import ChartCard from './ChartCard/ChartCard';
import UploadCard from "../common/UploadDocumentCard/UploadCard";
import styles from './QuestionCollapsibleSection.module.css';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'; // New: Import chevron icons

const QuestionCollapsibleSection = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const documents = question.questionAnswer.filter(item => item.type === "DocumentType");
  const charts = question.questionAnswer.filter(item => item.type === "ChartType");

  return (
    // main collapsible section container
    <div className={`${styles.collapsibleSection} ${isOpen ? styles.open : ''}`}>
      {/* section header */}
      <div
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {/* question code */}
        <span className={styles.questionCode}>{question.questionCode}</span>
        {/* question title */}
        <h3 className={styles.questionTitle}>{question.questionTitle}</h3>
        {/* question status */}
        <span className={`${styles.status} ${styles[question.status]}`}>
          {question.status}
        </span>
        {/* toggle arrow icon */}
        <span className={styles.arrow}>
          {isOpen ? <FaChevronDown /> : <FaChevronRight />} {/* Replaced text arrows with Font Awesome icons */}
        </span>
      </div>


      {/* collapsible content area */}
      {isOpen && (
        <div className={styles.content}>
          {/* documents grid section */}
          {documents.length > 0 && (
            <div className={styles.documentsContainer}>
              {/* documents section title */}
              <h4 className={styles.sectionTitle}>Documents</h4>
              {/* grid for document cards */}
              <div className={styles.documentsGrid}>
                {/* console log for debugging documents data */}
                {console.log("Documents:", documents)}
                {/* map through documents to render DocumentCard */}
                {documents.map((doc, index) => (
                  <DocumentCard
                    key={`doc-${index}`}
                    title={doc.title}
                    uploadDate={doc.date}
                    fileSize={doc.size}
                    fileType={doc.fileType}
                    isAvailable={doc.isAvailable}
                    url={doc.url}
                  />
                ))}
                <UploadCard />
              </div>
              
            </div>
          )}

          {/* charts grid section */}
          {charts.length > 0 && (
            <div className={styles.chartsContainer}>
              {/* visualizations section title */}
              <h4 className={styles.sectionTitle}>Visualizations</h4>
              {/* grid for chart cards */}
              <div className={styles.chartsGrid}>
                {/* map through charts to render ChartCard */}
                {charts.map((chart, index) => (
                  <ChartCard key={`chart-${index}`} {...chart} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCollapsibleSection;