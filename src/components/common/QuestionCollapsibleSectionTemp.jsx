import React, { useState } from 'react';
import DocumentCard from './DocumentCard/DocumentCard';
import ChartCard from './ChartCard/ChartCard';
import UploadCard from "../common/UploadDocumentCard/UploadCard";
import UploadModal from '../common/UploadDocumentCard/UploadModal';
import EditModal from '../common/EditModal/EditModal';
// REMOVED: Direct API imports (InsertFirstQuestionCH1_1_1, updateFirtQuestionCH1_1_1, deleteFirstQuestionCH1_1_1)
import styles from './QuestionCollapsibleSection.module.css';

// Added new props: onUploadApi, onUpdateApi, onDeleteApi
const QuestionCollapsibleSectionTemp = ({ question, onUploadApi, onUpdateApi, onDeleteApi }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState(null);

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

  const openEditModal = (documentData) => {
    setDocumentToEdit(documentData);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDocumentToEdit(null);
  };

  // This handler now calls the 'onUploadApi' prop
  const handleFileUpload = async (file, titre, context, anne) => {
    if (!onUploadApi) {
      throw new Error("onUploadApi function is not provided to QuestionCollapsibleSectionTemp.");
    }
    try {
      const response = await onUploadApi(file, titre, context, anne);
      console.log('Document uploaded successfully:', response);
      // TODO: Invalidate query or trigger re-fetch in the parent component
      return response;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

  const handleEditDocumentClick = (documentId) => {
    const docToEdit = allDocuments.find(doc => doc.id === documentId);
    if (docToEdit) {
      openEditModal(docToEdit);
    } else {
      console.error(`Document with ID ${documentId} not found for editing.`);
      alert("Document not found for editing.");
    }
  };

  // This handler now calls the 'onUpdateApi' prop
  const handleUpdateDocument = async (documentId, newFile, titre, context, anne) => {
    if (!onUpdateApi) {
      throw new Error("onUpdateApi function is not provided to QuestionCollapsibleSectionTemp.");
    }
    try {
      const response = await onUpdateApi(documentId, newFile, titre, context, anne);
      console.log('Document updated successfully:', response);
      // TODO: Invalidate query or trigger re-fetch in the parent component
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  // This handler now calls the 'onDeleteApi' prop
  const handleDeleteDocument = async (documentId) => {
    if (!onDeleteApi) {
      throw new Error("onDeleteApi function is not provided to QuestionCollapsibleSectionTemp.");
    }
    console.log(`Attempting to delete document with ID: ${documentId}`);
    if (!documentId) {
      alert("Cannot delete: Document ID is missing.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete document with ID: ${documentId}?`)) {
      try {
        await onDeleteApi(documentId); // Use the provided prop function
        alert(`Document ${documentId} deleted successfully!`);
        // TODO: Invalidate query or trigger re-fetch in the parent component
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
                    key={`doc-${latestDocument.id}`}
                    title={latestDocument.title}
                    uploadDate={latestDocument.date}
                    fileSize={latestDocument.size}
                    fileType={latestDocument.fileType}
                    isAvailable={latestDocument.isAvailable}
                    url={latestDocument.url}
                    showEditButton={true}
                    showDeleteButton={true}
                    onEditClick={() => handleEditDocumentClick(latestDocument.id)}
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
        // No uploadTargetId/Type for this modal, as it's for CH1-1-1 only.
        // It will call handleFileUpload which then calls onUploadApi(file, titre, context, anne)
        onUpload={handleFileUpload}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        initialDocumentData={documentToEdit}
        onUpdate={handleUpdateDocument}
      />
    </>
  );
};

export default QuestionCollapsibleSectionTemp;