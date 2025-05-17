import { chapterData } from '../../components/Content/DummyData.jsx';
import QuestionCollapsibleSection from '../../components/common/QuestionCollapsibleSection';
import styles from './ChapterPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import FirstQuestion from '../../components/temp/firstQuestion.jsx';
import SecondQuestion from '../../components/temp/SecondQuestion.jsx';

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

          {/* Render FirstQuestion only in the first block */}
          {index === 0 && <SecondQuestion/> && <FirstQuestion /> }

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
