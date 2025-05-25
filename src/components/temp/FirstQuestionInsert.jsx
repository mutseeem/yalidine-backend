import { useQuery } from '@tanstack/react-query';
// Ensure all correct API functions for CH1-1-1 are imported
import {
    fetchFirstQuestionCH1_1_1,
    InsertFirstQuestionCH1_1_1,
    updateFirtQuestionCH1_1_1,
    deleteFirstQuestionCH1_1_1 // Correctly import the specific delete function
} from '../../services/api';
import QuestionCollapsibleSectionTemp from '../../components/common/QuestionCollapsibleSectionTemp.jsx';
// No direct UploadCard import needed here if QuestionCollapsibleSectionTemp renders it


const FirstQuestionInsert = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['firstQuestion'],
    queryFn: fetchFirstQuestionCH1_1_1,
  });

  // You might want to use useQueryClient here to invalidate queries after mutations
  // import { useQueryClient } from '@tanstack/react-query';
  // const queryClient = useQueryClient();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading question data.</div>;

  const isAnswered = data && data.length > 0;

  const isBase64PDF = (str) => {
    if (!str) {
      console.log('Empty documentUri');
      return false;
    }
    try {
      const decoded = atob(str);
      const isPDF = decoded.startsWith('%PDF-');
      return isPDF;
    } catch (e) {
      return false;
    }
  };

  const question = {
    questionId: 'C1.1.1',
    questionCode: 'C1.1.1',
    questionTitle: 'Est-ce que L\'établissement dispose d\'une politique déclarée d\'ouverture à l\'international ?',
    status: isAnswered ? 'answered' : 'not answered',
    questionAnswer: isAnswered
      ? data.map((doc) => {
          const isBlob = isBase64PDF(doc.documentUri);
          return {
            id: doc.id,
            type: 'DocumentType',
            title: doc.titre || 'Untitled Document',
            description: doc.context || 'No description',
            date: doc.anne || 'Unknown date',
            size: '5 MB',
            fileType: 'pdf',
            isAvailable: true,
            url: isBlob
              ? `data:application/pdf;base64,${doc.documentUri}`
              : doc.documentUri || '#'
          };
        })
      : []
  };

  // Define the actual API functions to pass as props
  const handleUploadApi = async (file, titre, context, anne) => {
    const response = await InsertFirstQuestionCH1_1_1(file, titre, context, anne);
    // TODO: Invalidate the query to re-fetch data after successful upload
    // queryClient.invalidateQueries(['firstQuestion']);
    return response;
  };

  const handleUpdateApi = async (documentId, newFile, titre, context, anne) => {
    const response = await updateFirtQuestionCH1_1_1(documentId, newFile, titre, context, anne);
    // TODO: Invalidate the query to re-fetch data after successful update
    // queryClient.invalidateQueries(['firstQuestion']);
    return response;
  };

  // FIX: This now correctly uses your deleteFirstQuestionCH1_1_1 API function
  const handleDeleteApi = async (documentId) => {
    const response = await deleteFirstQuestionCH1_1_1(documentId);
    // TODO: Invalidate the query to re-fetch data after successful deletion
    // queryClient.invalidateQueries(['firstQuestion']);
    return response;
  };

  return (
    <div>
      <QuestionCollapsibleSectionTemp
        question={question}
        onUploadApi={handleUploadApi}    // Pass the specific upload API
        onUpdateApi={handleUpdateApi}    // Pass the specific update API
        onDeleteApi={handleDeleteApi}    // Pass the specific delete API
      />
    </div>
  );
};

export default FirstQuestionInsert;