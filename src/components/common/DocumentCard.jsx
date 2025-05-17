import { 
    FaTimesCircle,
    FaFilePdf, 
    FaFileWord, 
    FaFileAlt,
    FaDownload,
    FaFileDownload,
    FaCloudDownloadAlt
  } from 'react-icons/fa';
  import {triggerFileDownload} from '../../util/utils.js' ; 
  import { FiDownload } from 'react-icons/fi';
  import { HiOutlineDownload } from 'react-icons/hi';
  import styles from "./DocumentCard.module.css";
  
  
  const DocumentCard = ({ 
    title = 'Untitled Document',
    uploadDate = 'Unknown Date',
    fileSize = '0 KB',
    fileType = 'pdf',
    isAvailable = true,
    url
  }) => {
    
    const handleDownload = () => {

    }

    // File type icon mapping with custom color
    const fileIcons = {
      pdf: <FaFilePdf className={styles['file-type-icon']} />,
      word: <FaFileWord className={styles['file-type-icon']} />,
      txt: <FaFileAlt className={styles['file-type-icon']} />,
      unavailable: <FaTimesCircle className={styles['unavailable-icon']} />
    };

    // Get the appropriate icon
    const FileIcon = isAvailable 
      ? (fileIcons[fileType.toLowerCase()] || fileIcons.pdf)
      : fileIcons.unavailable;
    console.log("DocumentCard props:", { title, uploadDate, fileSize, fileType, isAvailable ,url});
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
              <button
                className={styles['download-btn']}
                aria-label={`Download ${title}`}
                onClick={() =>
                  triggerFileDownload({
                    url,
                    title,
                    uploadDate
                  })
                }
              >
                <HiOutlineDownload className={styles['download-icon']} />
              </button>
            ) : (
              <span className={styles['unavailable-label']}>Unavailable</span>
            )}

      </div>
    );
  };
  
  export default DocumentCard;