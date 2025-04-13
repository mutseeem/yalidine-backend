import { chapterData } from '../../components/content/dummyData';
import QuestionCollapsibleSection from '../../components/common/QuestionCollapsibleSection';
import styles from './ChapterPage.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ChapterPage = () => {
  const { reference } = useParams(); // Make sure this matches your route parameter
  
  console.log('Current reference:', reference); // Debugging
  
  // Find the chapter by reference
  const currentChapter = chapterData.find(chapter => chapter.reference === reference);
  
  if (!currentChapter) {
    return (
      <div className={styles.notFound}>
        <h2>Chapter {reference} not found</h2>
        <p>Available chapters:</p>
        <ul>
          {chapterData.map(ch => (
            <li key={ch.reference}>
              <a href={`/chapters/${ch.reference}`}>
                {ch.reference} - {ch.referenceTitle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.chapterContainer}>
      <header className={styles.chapterHeader}>
        <h1 className={styles.referenceCode}>{currentChapter.reference}</h1>
        <h2 className={styles.referenceTitle}>{currentChapter.referenceTitle}</h2>
      </header>
      
      <div className={styles.questionsContainer}>
        {currentChapter.questions.map((question) => (
          <QuestionCollapsibleSection
            key={question.questionId}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterPage;