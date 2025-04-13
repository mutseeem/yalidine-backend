import styles from "./QuestionSingle.module.css";
import { CheckMark, CrossMark, MissingMark } from "../../../assets/icons/icons";

const QuestionSingle = ({ question }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "answered":
        return <img src={CheckMark} alt="Answered" className={styles.statusIcon} />;
      case "not_answered":
        return <img src={CrossMark} alt="Not Answered" className={styles.statusIcon} />;
      case "missing_files":
        return <img src={MissingMark} alt="Missing Files" className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.headerSection}>
        <div className={styles.questionContent}>
          <div className={styles.questionLabel}>
            <span className={styles.label}>QUESTION</span>
            <span className={styles.tag}>{question.tag}</span>
          </div>
          <div className={styles.questionText}>{question.question}</div>
        </div>
        {getStatusIcon(question.status)}
      </div>
    </div>
  );
};

export default QuestionSingle;