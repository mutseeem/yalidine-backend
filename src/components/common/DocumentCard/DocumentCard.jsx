import {
  FaTimesCircle,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaEdit,   // New: Edit Icon
  FaTrash,  // New: Delete Icon
} from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import styles from "./DocumentCard.module.css";

const DocumentCard = ({
  title = 'Untitled Document',
  uploadDate = 'Unknown Date',
  fileSize = '0 KB',
  fileType = 'pdf',
  isAvailable = true,
  url, // This can be a blob URL (blob:...) or regular URL
  // New props for edit/delete functionality
  showEditButton = false,   // Defaults to false
  showDeleteButton = false, // Defaults to false
  onEditClick,              // Callback for edit button click
  onDeleteClick,            // Callback for delete button click
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [blobData, setBlobData] = useState(null);

  // Convert blob URL to downloadable blob object
  useEffect(() => {
    const prepareBlob = async () => {
      if (!url || !isAvailable) return;

      try {
        // If it's already a blob URL (blob:...)
        if (url.startsWith('blob:')) {
          const response = await fetch(url);
          const blob = await response.blob();
          setBlobData(blob);
        } else if (url.startsWith('data:')) {
          // Handle data URLs (base64)
          const response = await fetch(url);
          const blob = await response.blob();
          setBlobData(blob);
        } else {
          // Regular URL, keep as is
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
      // For Blob objects (from blob URLs or data URLs)
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
      }
      // For regular URLs
      else if (typeof blobData === 'string') {
        window.open(blobData, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Download failed: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  // File type icon mapping
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
        <div className={styles['actions-group']}> {/* New: Group action buttons */}
          {/* Download Button */}
          <button
            className={styles['download-btn']}
            aria-label={`Download ${title || 'Document'}`}
            onClick={handleDownload}
            disabled={isDownloading || !blobData}
          >
            {isDownloading ? (
              <span className={styles['download-spinner']}></span>
            ) : (
              <HiOutlineDownload className={styles['download-icon']} />
            )}
          </button>

          {/* Edit Button (Conditional) */}
          {showEditButton && (
            <button
              className={styles['edit-btn']}
              aria-label={`Edit ${title || 'Document'}`}
              onClick={onEditClick} // Pass the click handler
            >
              <FaEdit className={styles['edit-icon']} />
            </button>
          )}

          {/* Delete Button (Conditional) */}
          {showDeleteButton && (
            <button
              className={styles['delete-btn']}
              aria-label={`Delete ${title || 'Document'}`}
              onClick={onDeleteClick} // Pass the click handler
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