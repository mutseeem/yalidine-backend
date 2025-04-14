import { chapterData } from '../../components/content/dummyData';
import QuestionCollapsibleSection from '../../components/common/QuestionCollapsibleSection';
import styles from './ChapterPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ChapterPage = () => {
  return (
    <div className={styles.chapterContainer}>
      {chapterData.map((chapter, index) => (
        <div key={chapter.reference} className={styles.chapterGroup}>
          <div className={styles.chapterHeader}>
            <h2 className={styles.chapterTitle}>Reference {index + 1}</h2>
            <div className={styles.tooltip}>
              <FontAwesomeIcon icon={faInfoCircle} className={styles.infoIcon} />
              <span className={styles.tooltipText}>{chapter.referenceTitle}</span>
            </div>
          </div>
          <div className={styles.questionsList}>
            {chapter.questions.map(question => (
              <QuestionCollapsibleSection
                key={question.questionId}
                question={question}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterPage;