import React, { useState } from 'react';
import DocumentCard from './DocumentCard/DocumentCard';
import ChartCard from './ChartCard/ChartCard';
import UploadCard from "../common/UploadDocumentCard/UploadCard";
import UploadModal from '../common/UploadDocumentCard/UploadModal';
import EditModal from '../common/EditModal/EditModal';
import styles from './QuestionCollapsibleSection.module.css';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'; // import chevron icons

const QuestionCollapsibleSectionTemp = ({ question, onUploadApi, onUpdateApi, onDeleteApi }) => {
  const [isOpen, setIsOpen] = useState(false); // state for section open/close status
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // state for upload modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // state for edit modal visibility
  const [documentToEdit, setDocumentToEdit] = useState(null); // state for document currently being edited

  const allDocuments = question.questionAnswer.filter(item => item.type === "DocumentType" && item.id); // filter documents with IDs from question answers
  const charts = question.questionAnswer.filter(item => item.type === "ChartType"); // filter charts from question answers

  const latestDocument = allDocuments // logic to get the latest document by date
    .sort((a, b) => {
      const dateA = new Date(a.date || 0); // parse dates for comparison
      const dateB = new Date(b.date || 0);
      return dateB.getTime() - dateA.getTime(); // sort in descending order (latest first)
    })
    .at(0); // get the latest document

  const openUploadModal = () => setIsUploadModalOpen(true); // handler to open upload modal
  const closeUploadModal = () => setIsUploadModalOpen(false); // handler to close upload modal

  const openEditModal = (documentData) => { // handler to open edit modal with document data
    setDocumentToEdit(documentData);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => { // handler to close edit modal and clear data
    setIsEditModalOpen(false);
    setDocumentToEdit(null);
  };

  const handleFileUpload = async (file, titre, context, anne) => { // handles file upload via onUploadApi prop
    if (!onUploadApi) throw new Error("onUploadApi not provided.");
    try {
      const response = await onUploadApi(file, titre, context, anne); // execute the upload API call via prop
      console.log('Document uploaded successfully:', response);
      // TODO: invalidate query or re-fetch in parent
      return response;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

  const handleEditDocumentClick = (documentId) => { // handles edit button click, opens edit modal
    const docToEdit = allDocuments.find(doc => doc.id === documentId); // find the full document object
    if (docToEdit) {
      openEditModal(docToEdit); // open edit modal with found document data
    } else {
      console.error(`Document ${documentId} not found.`);
      alert("Document not found for editing.");
    }
  };

  const handleUpdateDocument = async (documentId, newFile, titre, context, anne) => { // handles document update via onUpdateApi prop
    if (!onUpdateApi) throw new Error("onUpdateApi not provided.");
    try {
      const response = await onUpdateApi(documentId, newFile, titre, context, anne); // execute the update API call via prop
      console.log('Document updated successfully:', response);
      // TODO: invalidate query or re-fetch in parent
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  const handleDeleteDocument = async (documentId) => { // handles document deletion via onDeleteApi prop
    if (!onDeleteApi) throw new Error("onDeleteApi not provided.");
    console.log(`attempting to delete document: ${documentId}`);
    if (!documentId) {
      alert("cannot delete: document ID is missing.");
      return;
    }

    if (window.confirm(`are you sure you want to delete document: ${documentId}?`)) { // confirm deletion with user
      try {
        await onDeleteApi(documentId); // use the provided prop function
        alert(`document ${documentId} deleted successfully!`);
        // TODO: invalidate query or re-fetch in parent
      } catch (error) {
        alert(`failed to delete document ${documentId}: ${error.message || 'an unknown error occurred.'}`);
      }
    }
  };

  return (
    <>
      <div className={`${styles.collapsibleSection} ${isOpen ? styles.open : ''}`}> {/* main collapsible section container */}
        <div
          className={styles.header}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        > {/* section header, clickable to toggle content */}
          <span className={styles.questionCode}>{question.questionCode}</span> {/* display question code */}
          <h3 className={styles.questionTitle}>{question.questionTitle}</h3> {/* display question title */}
          <span className={`${styles.status} ${styles[question.status]}`}> {/* display question status */}
            {question.status}
          </span>
          <span className={styles.arrow}> {/* toggle arrow icon */}
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>

        {isOpen && ( // collapsible content area
          <div className={styles.content}>
            <div className={styles.documentsContainer}> {/* documents grid container */}
              <h4 className={styles.sectionTitle}>Documents</h4> {/* documents section title */}
              <div className={styles.documentsGrid}> {/* grid for document cards */}
                {allDocuments.length > 0 ? ( // display all documents or no documents message
                  allDocuments.map((doc) => ( // map through all documents to render DocumentCard
                    <DocumentCard
                      key={`doc-${doc.id}`} // unique key for React list rendering
                      title={doc.title}
                      uploadDate={doc.date}
                      fileSize={doc.size}
                      fileType={doc.fileType}
                      isAvailable={doc.isAvailable}
                      url={doc.url}
                      showEditButton={true}
                      showDeleteButton={true}
                      onEditClick={() => handleEditDocumentClick(doc.id)} // pass edit handler
                      onDeleteClick={() => handleDeleteDocument(doc.id)} // pass delete handler
                    />
                  ))
                ) : (
                  <p className={styles.noDocumentsMessage}>no documents available yet for this question.</p>
                )}

                <UploadCard onClick={openUploadModal} /> {/* upload new document card */}
              </div>
            </div>

            {charts.length > 0 && ( // charts grid container
              <div className={styles.chartsContainer}>
                <h4 className={styles.sectionTitle}>Visualizations</h4> {/* visualizations section title */}
                <div className={styles.chartsGrid}> {/* grid for chart cards */}
                  {charts.map((chart, index) => ( // map through charts to render ChartCard
                    <ChartCard key={`chart-${index}`} {...chart} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <UploadModal // upload modal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onUpload={handleFileUpload} // passes general file upload handler
      />

      <EditModal // edit modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal} // closes modal and clears edit data
        initialDocumentData={documentToEdit} // provides current document data for pre-filling
        onUpdate={handleUpdateDocument} // passes document update handler
      />
    </>
  );
};

export default QuestionCollapsibleSectionTemp;