import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from './UploadCard.module.css';

const UploadCard = ({ onClick }) => {
  return (
    // main card container, clickable to open modal
    <div
      className={`${styles['document-card']} ${styles['upload-mini-card']}`}
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label="Upload new document"
    >
      {/*icnos section*/}
      <div className={styles['file-icon-wrapper']} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faCloudArrowUp} className={styles['upload-main-icon']} />
      </div>

      {/* text section  */}
      <div className={styles['file-details']}>
        {/* card title */}
        <h3 className={styles['file-title']} style={{ textAlign: 'left', marginBottom: '0' }}>
          Upload New Document
        </h3>
        {/*descriptive text*/}
        <p className={styles['upload-placeholder-text']} style={{ marginTop: '5px' }}>
          Click to add a file
        </p>
      </div>
    </div>
  );
};

export default UploadCard;