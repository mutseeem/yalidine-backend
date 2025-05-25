// src/components/common/EditModal/EditModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faFilePdf } from '@fortawesome/free-solid-svg-icons'; // Assuming you still want PDF icon if file not changed
import styles from './EditModal.module.css'; // Dedicated CSS for EditModal

const EditModal = ({ isOpen, onClose, onUpdate, initialDocumentData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [titre, setTitre] = useState('');
    const [context, setContext] = useState('');
    const [anne, setAnne] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef(null);

    // Effect to reset form or pre-fill data when modal opens/initial data changes
    useEffect(() => {
        if (isOpen && initialDocumentData) {
            // Pre-fill fields with existing document data
            setTitre(initialDocumentData.title || '');
            setContext(initialDocumentData.description || ''); // Assuming description is context
            setAnne(initialDocumentData.uploadDate || ''); // Assuming uploadDate is anne

            // Reset file selection when modal opens
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setMessage(''); // Clear any previous messages
        } else if (!isOpen) {
            // Reset all state when modal closes
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
    }, [isOpen, initialDocumentData]); // Depend on isOpen and initialDocumentData

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setSelectedFile(file);
                setMessage(`New file selected: ${file.name}`);
            } else {
                setSelectedFile(null);
                event.target.value = ''; // Clear file input
                setMessage('Please upload a PDF file only.');
                alert('Invalid file type. Please upload a PDF file.');
            }
        } else {
            setSelectedFile(null);
            setMessage('No new file selected.');
        }
    };

    const handleUploadAreaClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation: ensure title, context, year are not empty
        // File is optional for update, as user might only update metadata
        if (!titre || !context || !anne) {
            setMessage('Title, Context, and Year are required.');
            return;
        }

        setIsLoading(true);
        setMessage('Updating document...');

        try {
            if (onUpdate && initialDocumentData && initialDocumentData.id) {
                // Pass the document ID and the (potentially new) file/metadata
                const response = await onUpdate(
                    initialDocumentData.id,
                    selectedFile, // New file (can be null)
                    titre,
                    context,
                    anne
                );
                setMessage('Update successful!');
                console.log('Server response:', response);
                setTimeout(() => onClose(), 1000); // Close after a short delay to show success
            } else {
                throw new Error("Update handler or document ID is missing.");
            }
        } catch (error) {
            setMessage(`Update failed: ${error.message || 'An unknown error occurred.'}`);
            console.error('Update error in modal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close edit form">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>

                <h2 className={styles.modalTitle}>Edit Document</h2>
                <p className={styles.modalDescription}>Update the details or replace the file.</p>

                <form onSubmit={handleSubmit} className={styles.editForm}>
                    {/* Fixed ID Display */}
                    {initialDocumentData && initialDocumentData.id && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="modal-document-id">Document ID:</label>
                            <input
                                type="text"
                                id="modal-document-id"
                                value={initialDocumentData.id}
                                readOnly // Make it read-only
                                className={styles.readOnlyInput}
                            />
                        </div>
                    )}

                    {/* File Input (Optional for update) */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept=".pdf"
                    />
                    <div className={styles.uploadArea} onClick={handleUploadAreaClick}>
                         {/* Display current filename or prompt for new file */}
                        <FontAwesomeIcon icon={faFilePdf} className={styles.fileIcon} /> {/* Use PDF icon */}
                        <p className={styles.uploadText}>
                            {selectedFile
                                ? `New file: ${selectedFile.name}`
                                : (initialDocumentData?.title ? `Current file: ${initialDocumentData.title}.pdf (Click to change)` : 'Click to select new file (PDF only)')
                            }
                        </p>
                    </div>

                    {/* Metadata Inputs */}
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

                    <button type="submit" disabled={isLoading} className={styles.submitButton}>
                        {isLoading ? 'Updating...' : 'Save Changes'}
                    </button>

                    {message && <p className={styles.statusMessage}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default EditModal;