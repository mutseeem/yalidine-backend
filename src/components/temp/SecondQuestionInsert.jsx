import { useQuery, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import QuestionCollapsibleSectionTemp from '../../components/common/QuestionCollapsibleSectionTemp';
import UploadCard from '../../components/common/UploadDocumentCard/UploadCard';
import UploadModal from '../../components/common/UploadDocumentCard/UploadModal';
import {
    fetchSecondQuestionCH1_1_2, // Assuming this fetches data for the overall question
    uploadPlanCommunicationExterneDocument,
    uploadActionSensibilisationDocument
} from '../../services/api';
import React, { useState } from 'react';

const SecondQuestionInsert = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [currentUploadTarget, setCurrentUploadTarget] = useState(null);

    const queryClient = useQueryClient(); // Get the query client instance

    const { data, error, isLoading } = useQuery({
        queryKey: ['secondQuestion'],
        queryFn: fetchSecondQuestionCH1_1_2,
    });

    if (isLoading) return <div className="p-4 text-center">Loading question data...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error loading question data: {error.message}</div>;

    // Assuming 'data' directly contains the structure expected by QuestionCollapsibleSectionTemp
    // For this question, we will assume it returns an object with question details and questionAnswer
    // and that it also contains the IDs needed for the new uploads.
    const questionDataForCollapsible = {
      questionId: data?.questionId || 'C1.1.2', // Example ID for this question
      questionCode: data?.questionCode || 'C1.1.2',
      questionTitle: data?.questionTitle || 'Questions on Communication Plan and Awareness Actions',
      status: data?.status || (data?.questionAnswer?.length > 0 ? 'answered' : 'not answered'),
      questionAnswer: data?.questionAnswer?.map(answer => {
          // Assuming the data fetched by fetchSecondQuestionCH1_1_2 also includes 'id'
          // and other properties needed by DocumentCard, similar to FirstQuestionInsert
          if (answer.type === "DocumentType") {
              return {
                  id: answer.id, // Ensure ID is mapped
                  type: 'DocumentType',
                  title: answer.titre || 'Untitled Document',
                  description: answer.context || 'No description',
                  date: answer.anne || 'Unknown date',
                  size: '5 MB', // Default or get from API
                  fileType: answer.format || 'pdf',
                  isAvailable: true
              };
          }
          return answer;
      }) || [], // Ensure questionAnswer is always an array
    };

    // Assuming 'data' contains the specific IDs for the upload targets.
    // Replace with actual data fetching logic from your 'data' object
    const planCommunicationExterneId = data?.planCommunicationExterneId || 'plan-123';
    const actionSensibilisationId = data?.actionSensibilisationId || 'action-456';


    const openUploadModal = (id, type) => {
        setCurrentUploadTarget({ id, type });
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
        setCurrentUploadTarget(null);
    };

    // Unified upload handler for the SecondQuestionInsert's dedicated modal
    const handleSpecificFileUpload = async (targetId, targetType, file, titre, context, anne) => {
        try {
            let response;
            if (targetType === 'plan-de-communication-externe') {
                response = await uploadPlanCommunicationExterneDocument(targetId, file, titre, context, anne);
            } else if (targetType === 'action-de-sensibilisation') {
                response = await uploadActionSensibilisationDocument(targetId, file, titre, context, anne);
            } else {
                throw new Error(`Unknown document type: ${targetType}`);
            }
            console.log('Upload successful for type:', targetType, response);
            // Invalidate the query for this page to re-fetch and update UI
            queryClient.invalidateQueries(['secondQuestion']);
            return response;
        } catch (err) {
            console.error('Error during specific upload:', err);
            throw err;
        }
    };

    // Define the API functions specific to THIS QuestionCollapsibleSectionTemp instance
    // These will be passed to QuestionCollapsibleSectionTemp as props
    const handleCollapsibleUpload = async (file, titre, context, anne) => {
        // Here, you'd define the API call specific to the *document* managed by this
        // QuestionCollapsibleSectionTemp. If the data structure for QuestionCollapsibleSectionTemp
        // doesn't have a specific `id` for its own upload, you might need to hardcode it or derive it
        // from the `questionDataForCollapsible.questionId`.
        // Assuming there's a default upload for 'C1.1.2' question answers if they are document types.
        // This part needs clarification on what `handleCollapsibleUpload` means for CH1_1_2.
        // For simplicity, let's assume it doesn't have a direct "default upload" like CH1-1-1.
        // Or, if it's the same as plan-de-communication-externe but without an ID, you'd use that.
        // For now, I'll make it a dummy or throw an error if no specific use is defined.
        throw new Error("Default upload for this QuestionCollapsibleSectionTemp is not implemented yet or should use a specific ID.");
        // If it was for a default document tied to this question, you'd do:
        // return await uploadPlanCommunicationExterneDocument(questionDataForCollapsible.questionId, file, titre, context, anne);
    };

    const handleCollapsibleUpdate = async (documentId, newFile, titre, context, anne) => {
        // This update function would be specific to documents already part of 'questionAnswer' for CH1_1_2.
        // Assuming there's a specific API endpoint for updating these types of documents.
        // This is a placeholder; you'd need the actual API function.
        // For example:
        // return await updatePlanCommunicationExterneDocument(documentId, newFile, titre, context, anne);
        throw new Error("Update for QuestionCollapsibleSectionTemp is not implemented yet for this question type.");
    };

    const handleCollapsibleDelete = async (documentId) => {
        // This delete function would be specific to documents already part of 'questionAnswer' for CH1_1_2.
        // Assuming there's a specific API endpoint for deleting these types of documents.
        // This is a placeholder; you'd need the actual API function.
        // For example:
        // return await deletePlanCommunicationExterneDocument(documentId);
        throw new Error("Delete for QuestionCollapsibleSectionTemp is not implemented yet for this question type.");
    };


    return (
        <div className="p-4">
            {questionDataForCollapsible && ( // Render QuestionCollapsibleSectionTemp based on this data
                <QuestionCollapsibleSectionTemp
                    question={questionDataForCollapsible}
                    onUploadApi={handleCollapsibleUpload}   // Pass the relevant upload API for this specific collapsible section
                    onUpdateApi={handleCollapsibleUpdate}   // Pass the relevant update API
                    onDeleteApi={handleCollapsibleDelete}   // Pass the relevant delete API
                />
            )}

            {/* Section for Uploading New Documents of Different Types (from SecondQuestionInsert itself) */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Upload New Documents for This Question</h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {/* Upload Card for Plan de Communication Externe */}
                    <UploadCard
                        title="Upload Communication Plan Document"
                        description="For external communication."
                        onClick={() => openUploadModal(planCommunicationExterneId, 'plan-de-communication-externe')}
                    />

                    {/* Upload Card for Action de Sensibilisation */}
                    <UploadCard
                        title="Upload Awareness Action Document"
                        description="For public awareness campaigns."
                        onClick={() => openUploadModal(actionSensibilisationId, 'action-de-sensibilisation')}
                    />
                </div>
            </div>

            {/* The Upload Modal controlled by SecondQuestionInsert */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={closeUploadModal}
                onUpload={handleSpecificFileUpload} // This handler is for the two *new* upload types
                uploadTargetId={currentUploadTarget?.id}
                uploadTargetType={currentUploadTarget?.type}
            />
        </div>
    );
};

export default SecondQuestionInsert;