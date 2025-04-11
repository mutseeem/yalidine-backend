import React, { useState } from "react";
import styles from "./QuestionList.module.css";
import QuestionSingle from "./QuestionSingle";
//TODO:make the question tag as a badge will  maek it better
const QuestionList = ({ data }) => {
  // Process the data
  const processData = (inputData) => {
    if (Array.isArray(inputData)) return inputData;
    if (inputData && Array.isArray(inputData.fields)) return inputData.fields;
    return [];
  };

  // Count answered questions
  const countAnsweredQuestions = (questions) => {
    if (!Array.isArray(questions)) return 0;
    return questions.filter(q => q.status === "answered").length;
  };

  // Format the display name as "CHAMP1: DESCRIPTION" in all caps
  const formatDisplayName = (tag, name) => {
    const champNumber = tag.toLowerCase().replace(/\s+/g, ''); // "Champ 1" -> "champ1"
    const cleanedName = name.replace(/^C\d+\s*-\s*/, ""); // Remove "C1 - " prefix
    return `${champNumber}: ${cleanedName}`.toUpperCase(); // Convert entire string to uppercase
  };

  const fields = processData(data);
  const [expandedFields, setExpandedFields] = useState({});

  const toggleField = (fieldId) => {
    setExpandedFields((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  return (
    <div className={styles.questionListContainer}>
      {fields.length > 0 ? (
        fields.map((field, index) => {
          const totalQuestions = Array.isArray(field.questions) ? field.questions.length : 0;
          const answeredCount = countAnsweredQuestions(field.questions);
          const displayName = formatDisplayName(field.tag, field.name);
          
          return (
            <React.Fragment key={field.id}>
              <div className={styles.fieldSection}>
                {/* Field Header */}
                <div
                  className={styles.fieldHeader}
                  onClick={() => toggleField(field.id)}
                >
                  <div className={styles.fieldHeaderLeft}>
                    <span className={styles.toggleIcon}>
                      {expandedFields[field.id] ? "▼" : "▶"}
                    </span>
                    <div className={styles.fieldInfo}>
                      <span className={styles.fieldName}>{displayName}</span>
                    </div>
                  </div>
                  <div className={styles.questionCount}>
                    {answeredCount}/{totalQuestions}
                  </div>
                </div>

                {/* Questions Section */}
                {expandedFields[field.id] && (
                  <div className={styles.questionsSection}>
                    {Array.isArray(field.questions) ? (
                      field.questions.map((question) => (
                        <QuestionSingle key={question.id} question={question} />
                      ))
                    ) : (
                      <div className={styles.noQuestions}>NO QUESTIONS AVAILABLE</div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Spacing between fields */}
              {index < fields.length - 1 && <div className={styles.fieldSpacer}></div>}
            </React.Fragment>
          );
        })
      ) : (
        <div className={styles.error}>NO DATA AVAILABLE</div>
      )}
    </div>
  );
};

export default QuestionList;