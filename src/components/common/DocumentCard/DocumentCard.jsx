import {
  FaTimesCircle,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaFileDownload, 
} from 'react-icons/fa';

import { useState, useEffect } from 'react';
import styles from "./DocumentCard.module.css";

const DocumentCard = ({
  title = 'Untitled Document',
  uploadDate = 'Unknown Date',
  fileSize = '0 KB',
  fileType = 'pdf',
  isAvailable = true,
  url,
  showEditButton = true,
  showDeleteButton = true,
  onEditClick,
  onDeleteClick,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [blobData, setBlobData] = useState(null);

  useEffect(() => {
    const prepareBlob = async () => {
      if (!url || !isAvailable) return;
      try {
        if (url.startsWith('blob:')) {
          const response = await fetch(url);
          const blob = await response.blob();
          setBlobData(blob);
        } else if (url.startsWith('data:')) {
          const response = await fetch(url);
          const blob = await response.blob();
          setBlobData(blob);
        } else {
          setBlobData(url);
        }
      } catch (error) {
        console.error('Error preparing blob:', error);
      }
    };
    prepareBlob();
  }, [url, isAvailable]);

  const handleDownload = async () => {
    if (!blobData || !isAvailable) {
      console.error('Download failed: No valid data available');
      return;
    }
    setIsDownloading(true);
    try {
      if (blobData instanceof Blob) {
        const blobUrl = URL.createObjectURL(blobData);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${title.replace(/[^a-z0-9_\-]/gi, '_')}-${uploadDate}.pdf`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        }, 100);
      } else if (typeof blobData === 'string') {
        window.open(blobData, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Download failed: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const fileIcons = {
    pdf: <FaFilePdf className={styles['file-type-icon']} />,
    word: <FaFileWord className={styles['file-type-icon']} />,
    txt: <FaFileAlt className={styles['file-type-icon']} />,
    unavailable: <FaTimesCircle className={styles['unavailable-icon']} />
  };

  const FileIcon = isAvailable
    ? (fileIcons[fileType.toLowerCase()] || fileIcons.pdf)
    : fileIcons.unavailable;

  return (
    <div className={`${styles['document-card']} ${!isAvailable ? styles.unavailable : ''}`}>
      <div className={styles['file-icon-wrapper']}>
        {FileIcon}
      </div>

      <div className={styles['file-details']}>
        <h3 className={styles['file-title']}>{title}</h3>
        <div className={styles['file-meta']}>
          <span className={styles['upload-date']}>{uploadDate}</span>
          <span className={styles['file-size']}>{fileSize}</span>
        </div>
      </div>

      {isAvailable ? (
        <div className={styles['actions-group']}>
          <button
            className={styles['download-btn']}
            aria-label={`Download ${title || 'Document'}`}
            onClick={handleDownload}
            disabled={isDownloading || !blobData}
          >
            {isDownloading ? (
              <span className={styles['download-spinner']}></span>
            ) : (
              <FaFileDownload className={styles['download-icon']} /> 
            )}
          </button>

          {showEditButton && (
            <button
              className={styles['edit-btn']}
              aria-label={`Edit ${title || 'Document'}`}
              onClick={onEditClick}
            >
              <FaEdit className={styles['edit-icon']} />
            </button>
          )}

          {showDeleteButton && (
            <button
              className={styles['delete-btn']}
              aria-label={`Delete ${title || 'Document'}`}
              onClick={onDeleteClick}
            >
              <FaTrash className={styles['delete-icon']} />
            </button>
          )}
        </div>
      ) : (
        <span className={styles['unavailable-label']}>Unavailable</span>
      )}
    </div>
  );
};

export default DocumentCard;