import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import {
    fetchFirstQuestionCH1_1_1, 
    InsertFirstQuestionCH1_1_1,
    updateFirtQuestionCH1_1_1, 
    deleteFirstQuestionCH1_1_1 
} from '../../services/api';
import QuestionCollapsibleSectionTemp from '../../components/common/QuestionCollapsibleSectionTemp.jsx'; // component to display question and documents

const FirstQuestionInsert = () => {
  const queryClient = useQueryClient(); // get the query client instance

  const { data, error, isLoading } = useQuery({ // fetch data for the first question
    queryKey: ['firstQuestion'],
    queryFn: fetchFirstQuestionCH1_1_1,
  });

  if (isLoading) return <div>Loading...</div>; // display loading state
  if (error) return <div>Error loading question data.</div>; // display error state

  const isAnswered = data && data.length > 0; // check if question has answers

  const isBase64PDF = (str) => { // check if documentUri is a valid Base64 PDF
    if (!str) return false; // return false if string is empty
    try {
      const decoded = atob(str); // decode base64 string
      const isPDF = decoded.startsWith('%PDF-'); // check for PDF magic number
      return isPDF; // return true if it's a PDF
    } catch (e) {
      return false; // return false if not valid base64
    }
  };

  const question = { // structure the question data for the collapsible section
    questionId: 'C1.1.1',
    questionCode: 'C1.1.1',
    questionTitle: 'Est-ce que L\'établissement dispose d\'une politique déclarée d\'ouverture à l\'international ?',
    status: isAnswered ? 'answered' : 'not answered',
    questionAnswer: isAnswered
      ? data.map((doc) => { // map API response to DocumentCard props
          const isBlob = isBase64PDF(doc.documentUri); // check if document is base64 PDF
          return {
            id: doc.id, // document ID
            type: 'DocumentType', // document type
            title: doc.titre || 'Untitled Document', // document title
            description: doc.context || 'No description', // document description/context
            date: doc.anne || 'Unknown date', // document year/date
            size: '5 MB', // default or get from API
            fileType: 'pdf', // default or detect from content
            isAvailable: true, // document availability
            url: isBlob // construct URL from base64 or direct URL
              ? `data:application/pdf;base64,${doc.documentUri}`
              : doc.documentUri || '#'
          };
        })
      : [] // empty array if no answers
  };

  const handleUploadApi = async (file, titre, context, anne) => { // handler for file upload API
    const response = await InsertFirstQuestionCH1_1_1(file, titre, context, anne); // call upload API
    queryClient.invalidateQueries(['firstQuestion']); // invalidate query to re-fetch data
    return response;
  };

  const handleUpdateApi = async (documentId, newFile, titre, context, anne) => { // handler for document update API
    const response = await updateFirtQuestionCH1_1_1(documentId, newFile, titre, context, anne); // call update API
    queryClient.invalidateQueries(['firstQuestion']); // invalidate query to re-fetch data
    return response;
  };

  const handleDeleteApi = async (documentId) => { // handler for document deletion API
    const response = await deleteFirstQuestionCH1_1_1(documentId); // call delete API
    queryClient.invalidateQueries(['firstQuestion']); // invalidate query to re-fetch data
    return response;
  };

  return (
    <div>
      <QuestionCollapsibleSectionTemp
        question={question}
        onUploadApi={handleUploadApi} 
        onUpdateApi={handleUpdateApi} 
        onDeleteApi={handleDeleteApi} 
      />
    </div>
  );
};

export default FirstQuestionInsert;