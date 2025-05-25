// src/components/common/UploadModal/UploadModal.jsx
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from './UploadModal.module.css'; // Dedicated CSS for the modal

const UploadModal = ({ isOpen, onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [titre, setTitre] = useState('');
    const [context, setContext] = useState('');
    const [anne, setAnne] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef(null);

    // Reset form fields when the modal is opened/closed
    React.useEffect(() => {
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
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

    const handleUploadAreaClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile || !titre || !context || !anne) {
            setUploadMessage('Please fill in all required fields and select a PDF file.');
            return;
        }

        setIsLoading(true);
        setUploadMessage('Uploading...');

        try {
            if (onUpload) {
                const response = await onUpload(selectedFile, titre, context, anne);
                setUploadMessage('Upload successful!');
                console.log('Server response:', response);
                onClose(); // Close modal on success
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

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close upload form">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>
                
                <h2 className={styles.modalTitle}>Upload New Document</h2>
                <p className={styles.modalDescription}>Fill in the details and select your PDF file.</p>

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

                    <button type="submit" disabled={isLoading || !selectedFile} className={styles.submitButton}>
                        {isLoading ? 'Uploading...' : 'Submit Document'}
                    </button>

                    {uploadMessage && <p className={styles.statusMessage}>{uploadMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default UploadModal;