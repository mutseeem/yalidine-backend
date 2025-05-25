// src/components/common/UploadDocumentMiniCard/UploadDocumentMiniCard.jsx
import React from 'react';
import styles from './UploadCard.module.css'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'; // The upload icon

const UploadCard = ({ onClick }) => {
  return (
    <div
      className={`${styles['document-card']} ${styles['upload-mini-card']}`}
      onClick={onClick}
      role="button" // Indicate that it's clickable for accessibility
      tabIndex="0" // Make it focusable
      aria-label="Upload new document"
    >
      {/* Reusing file-icon-wrapper for the upload icon area */}
      <div className={styles['file-icon-wrapper']} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faCloudArrowUp} className={styles['upload-main-icon']} />
      </div>

      {/* Reusing file-details for the text */}
      <div className={styles['file-details']}>
        <h3 className={styles['file-title']} style={{ textAlign: 'center', marginBottom: '0' }}>
          Upload New Document
        </h3>
        <p className={styles['upload-placeholder-text']} style={{ marginTop: '5px' }}>
          Click to add a file
        </p>
      </div>
      {/* No download button or other meta info */}
    </div>
  );
};

export default UploadCard;