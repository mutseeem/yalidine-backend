import React, { useState } from 'react';
import DocumentCard from './DocumentCard/DocumentCard';
import ChartCard from './ChartCard/ChartCard';
import UploadCard from "../common/UploadDocumentCard/UploadCard";
import UploadModal from '../common/UploadDocumentCard/UploadModal';
import EditModal from '../common/EditModal/EditModal'; 
import { InsertFirstQuestionCH1_1_1, updateFirtQuestionCH1_1_1, deleteFirstQuestionCH1_1_1 } from '../../services/api'; 
import styles from './QuestionCollapsibleSection.module.css';

const QuestionCollapsibleSectionTemp = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New: State for Edit Modal
  const [documentToEdit, setDocumentToEdit] = useState(null); // New: State to hold document data for editing

  const allDocuments = question.questionAnswer.filter(item => item.type === "DocumentType" && item.id);
  const charts = question.questionAnswer.filter(item => item.type === "ChartType");

  const latestDocument = allDocuments
    .sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .at(0);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  // New: Handlers for Edit Modal
  const openEditModal = (documentData) => {
    setDocumentToEdit(documentData); // Store the document data to be edited
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDocumentToEdit(null); // Clear document data when modal closes
  };

  const handleFileUpload = async (file, titre, context, anne) => {
    try {
      const response = await InsertFirstQuestionCH1_1_1(file, titre, context, anne);
      console.log('Document uploaded successfully:', response);
      // TODO: Re-fetch or update state
      return response;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

  // Handler for the Edit button click
  const handleEditDocumentClick = (documentId) => {
    // Find the full document object using its ID
    const docToEdit = allDocuments.find(doc => doc.id === documentId);
    if (docToEdit) {
      openEditModal(docToEdit); // Pass the entire document object to the modal
    } else {
      console.error(`Document with ID ${documentId} not found for editing.`);
      alert("Document not found for editing.");
    }
  };

  // New: Handler for updating the document via the Edit Modal
  const handleUpdateDocument = async (documentId, newFile, titre, context, anne) => {
    try {
      const response = await updateFirtQuestionCH1_1_1(documentId, newFile, titre, context, anne);
      console.log('Document updated successfully:', response);
      // TODO: Re-fetch the question data or update the state here to reflect the changes.
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  // Dummy Function for Delete - Now with a proper call if implemented
  const handleDeleteDocument = async (documentId) => {
    console.log(`Attempting to delete document with ID: ${documentId}`);
    if (!documentId) {
        alert("Cannot delete: Document ID is missing.");
        return;
    }

    if (window.confirm(`Are you sure you want to delete document with ID: ${documentId}?`)) {
        try {
            await deleteFirstQuestionCH1_1_1(documentId); // Use the actual API call
            alert(`Document ${documentId} deleted successfully!`);
            // TODO: Re-fetch the question data or update the state here to reflect the deletion.
        } catch (error) {
            alert(`Failed to delete document ${documentId}: ${error.message || 'An unknown error occurred.'}`);
        }
    }
  };

  return (
    <>
      <div className={`${styles.collapsibleSection} ${isOpen ? styles.open : ''}`}>
        <div
          className={styles.header}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className={styles.questionCode}>{question.questionCode}</span>
          <h3 className={styles.questionTitle}>{question.questionTitle}</h3>
          <span className={`${styles.status} ${styles[question.status]}`}>
            {question.status}
          </span>
          <span className={styles.arrow}>
            {isOpen ? '▼' : '▶'}
          </span>
        </div>

        {isOpen && (
          <div className={styles.content}>
            <div className={styles.documentsContainer}>
              <h4 className={styles.sectionTitle}>Documents</h4>
              <div className={styles.documentsGrid}>
                {latestDocument ? (
                  <DocumentCard
                    key={`doc-${latestDocument.id}`} // Use ID as key now that it's available
                    title={latestDocument.title}
                    uploadDate={latestDocument.date}
                    fileSize={latestDocument.size}
                    fileType={latestDocument.fileType}
                    isAvailable={latestDocument.isAvailable}
                    url={latestDocument.url}
                    showEditButton={true}
                    showDeleteButton={true}
                    onEditClick={() => handleEditDocumentClick(latestDocument.id)} // Pass ID to handler
                    onDeleteClick={() => handleDeleteDocument(latestDocument.id)}
                  />
                ) : (
                  <p className={styles.noDocumentsMessage}>No documents available yet for this question.</p>
                )}

                <UploadCard onClick={openUploadModal} />
              </div>
            </div>

            {charts.length > 0 && (
              <div className={styles.chartsContainer}>
                <h4 className={styles.sectionTitle}>Visualizations</h4>
                <div className={styles.chartsGrid}>
                  {charts.map((chart, index) => (
                    <ChartCard key={`chart-${index}`} {...chart} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onUpload={handleFileUpload}
      />

      {/* New: The Edit Modal, conditionally rendered */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        initialDocumentData={documentToEdit} // Pass the document data to be edited
        onUpdate={handleUpdateDocument} // Pass the update API handler
      />
    </>
  );
};

export default QuestionCollapsibleSectionTemp;