import { useState } from 'react';
import DocumentCard from './DocumentCard/DocumentCard';
import ChartCard from './ChartCard/ChartCard';
import styles from './QuestionCollapsibleSection.module.css';

const QuestionCollapsibleSection = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const documents = question.questionAnswer.filter(item => item.type ===  "DocumentType");
  const charts = question.questionAnswer.filter(item => item.type === "ChartType");

  return (
    <div className={`${styles.collapsibleSection} ${isOpen ? styles.open : ''}`}>
      <div 
        className={styles.header} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.questionCode}>{question.questionCode}</span>
        <h3 className={styles.questionTitle}>{question.questionTitle}</h3>
        <span className={`${styles.status} ${styles[question.status]}`}>
          {question.status}
        </span>
        <span className={styles.arrow}>
          {isOpen ? '▼' : '▶'}
        </span>
      </div>
      
      
      {isOpen && (
        <div className={styles.content}>
          {/* Documents Grid */}
          {documents.length > 0 && (
            <div className={styles.documentsContainer}>
              <h4 className={styles.sectionTitle}>Documents</h4>
              <div className={styles.documentsGrid}>
                {console.log("Documents:", documents)}
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
              </div>
            </div>
          )}

          {/* Charts Grid */}
          {charts.length > 0 && (
            <div className={styles.chartsContainer}>
              <h4 className={styles.sectionTitle}>Visualizations</h4>
              <div className={styles.chartsGrid}>
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