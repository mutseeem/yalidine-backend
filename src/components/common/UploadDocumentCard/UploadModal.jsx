import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from './UploadModal.module.css';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  // component state for form inputs and upload status
  const [selectedFile, setSelectedFile] = useState(null);
  const [titre, setTitre] = useState('');
  const [context, setContext] = useState('');
  const [anne, setAnne] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ref for the hidden file input
  const fileInputRef = useRef(null);

  // reset form fields when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setTitre('');
      setContext('');
      setAnne('');
      setUploadMessage('');
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [isOpen]);

  // handle file selection and validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // allow only PDF files
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setUploadMessage(`Selected: ${file.name}`);
      } else {
        setSelectedFile(null);
        event.target.value = '';
        setUploadMessage('Please upload a PDF file only.');
        alert('Invalid file type. Please upload a PDF file.');
      }
    } else {
      setSelectedFile(null);
      setUploadMessage('No file selected.');
    }
  };

  // trigger hidden file input click
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // basic input validation
    if (!selectedFile || !titre || !context || !anne) {
      setUploadMessage('Please fill in all required fields and select a PDF file.');
      return;
    }

    setIsLoading(true);
    setUploadMessage('Uploading...');

    try {
      // call the upload handler passed from parent
      if (onUpload) {
        const response = await onUpload(selectedFile, titre, context, anne);
        setUploadMessage('Upload successful!');
        console.log('Server response:', response);
        onClose(); // close modal on success
      } else {
        throw new Error("Upload handler is not provided.");
      }
    } catch (error) {
      setUploadMessage(`Upload failed: ${error.message || 'An unknown error occurred.'}`);
      console.error('Upload error in modal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // don't render if modal is not open
  if (!isOpen) return null;

  return (
    // modal overlay
    <div className={styles.modalOverlay}>
      {/*modal content container*/} 
      <div className={styles.modalContent}>
        {/*close button*/}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close upload form">
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>

        {/*modal header*/} 
        <h2 className={styles.modalTitle}>Upload New Document</h2>
        <p className={styles.modalDescription}>Fill in the details and select your PDF file.</p>

        {/*uplaod forum*/}
        <form onSubmit={handleSubmit} className={styles.uploadForm}>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf"
          />

          
          <div className={styles.uploadArea} onClick={handleUploadAreaClick}>
            <FontAwesomeIcon icon={faCloudArrowUp} className={styles.uploadIcon} />
            <p className={styles.uploadText}>
              {selectedFile ? `Selected: ${selectedFile.name}` : 'Click here to browse files'}
            </p>
          </div>

          
          <div className={styles.inputGroup}>
            <label htmlFor="modal-titre">Title:</label>
            <input
              type="text"
              id="modal-titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="modal-context">Context:</label>
            <input
              type="text"
              id="modal-context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="modal-anne">Year:</label>
            <input
              type="text"
              id="modal-anne"
              value={anne}
              onChange={(e) => setAnne(e.target.value)}
              required
            />
          </div>

          {/*submit button */}
          <button type="submit" disabled={isLoading || !selectedFile} className={styles.submitButton}>
            {isLoading ? 'Uploading...' : 'Submit Document'}
          </button>

          {/*deisplay mseega */}
          {uploadMessage && <p className={styles.statusMessage}>{uploadMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UploadModal;