import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import styles from './EditModal.module.css';

const EditModal = ({ isOpen, onClose, onUpdate, initialDocumentData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [titre, setTitre] = useState('');
  const [context, setContext] = useState('');
  const [anne, setAnne] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  // reset form or pre-fill data when modal opens/closes
  useEffect(() => {
    if (isOpen && initialDocumentData) {
      // pre-fill fields with existing document data
      setTitre(initialDocumentData.title || '');
      setContext(initialDocumentData.description || '');
      setAnne(initialDocumentData.uploadDate || '');

      // reset file selection on open
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setMessage('');
    } else if (!isOpen) {
      // reset all state when modal closes
      setTitre('');
      setContext('');
      setAnne('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setMessage('');
      setIsLoading(false);
    }
  }, [isOpen, initialDocumentData]);

  // handle new file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // validate file type
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setMessage(`new file selected: ${file.name}`);
      } else {
        setSelectedFile(null);
        event.target.value = '';
        setMessage('please upload a PDF file only.');
        alert('Invalid file type. Please upload a PDF file.');
      }
    } else {
      setSelectedFile(null);
      setMessage('no new file selected.');
    }
  };

  // trigger hidden file input click
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  // handle form submission for update
  const handleSubmit = async (event) => {
    event.preventDefault();

    // basic input validation
    if (!titre || !context || !anne) {
      setMessage('title, context, and year are required.');
      return;
    }

    setIsLoading(true);
    setMessage('updating document...');

    try {
      // call the update handler passed from parent
      if (onUpdate && initialDocumentData && initialDocumentData.id) {
        const response = await onUpdate(
          initialDocumentData.id,
          selectedFile, // can be null if no new file is selected
          titre,
          context,
          anne
        );
        setMessage('update successful!');
        console.log('server response:', response);
        setTimeout(() => onClose(), 1000); // close after success message
      } else {
        throw new Error("update handler or document ID is missing.");
      }
    } catch (error) {
      setMessage(`update failed: ${error.message || 'an unknown error occurred.'}`);
      console.error('update error in modal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // do not render if modal is not open
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* close button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close edit form">
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>

        {/* modal header */}
        <h2 className={styles.modalTitle}>Edit Document</h2>
        <p className={styles.modalDescription}>update the details or replace the file.</p>

        {/* edit form */}
        <form onSubmit={handleSubmit} className={styles.editForm}>
          {/* fixed document id display */}
          {initialDocumentData && initialDocumentData.id && (
            <div className={styles.inputGroup}>
              <label htmlFor="modal-document-id">document ID:</label>
              <input
                type="text"
                id="modal-document-id"
                value={initialDocumentData.id}
                readOnly
                className={styles.readOnlyInput}
              />
            </div>
          )}

          {/* file input area */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf"
          />
          <div className={styles.uploadArea} onClick={handleUploadAreaClick}>
            <FontAwesomeIcon icon={faFilePdf} className={styles.fileIcon} />
            <p className={styles.uploadText}>
              {selectedFile
                ? `new file: ${selectedFile.name}`
                : (initialDocumentData?.title ? `current file: ${initialDocumentData.title}.pdf (click to change)` : 'click to select new file (PDF only)')
              }
            </p>
          </div>

          {/* metadata input fields */}
          <div className={styles.inputGroup}>
            <label htmlFor="modal-titre">title:</label>
            <input
              type="text"
              id="modal-titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="modal-context">context:</label>
            <input
              type="text"
              id="modal-context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="modal-anne">year:</label>
            <input
              type="text"
              id="modal-anne"
              value={anne}
              onChange={(e) => setAnne(e.target.value)}
              required
            />
          </div>

          {/* submit button */}
          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? 'updating...' : 'save changes'}
          </button>

          {/* status message display */}
          {message && <p className={styles.statusMessage}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditModal;