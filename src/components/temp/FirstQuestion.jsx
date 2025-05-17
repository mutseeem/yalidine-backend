import { useQuery } from '@tanstack/react-query';
import { fetchFirstQuestionCH1_1_1 } from '../../services/api';
import QuestionCollapsibleSection from '../../components/common/QuestionCollapsibleSection';

const FirstQuestion = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['firstQuestion'],
    queryFn: fetchFirstQuestionCH1_1_1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading question data.</div>;

  const isAnswered = data && data.length > 0;

  // Check if a string is a valid base64 PDF blob
  const isBase64PDF = (str) => {
    if (!str) {
      console.log('Empty documentUri');
      return false;
    }

    try {
      const decoded = atob(str);
      const isPDF = decoded.startsWith('%PDF-');
      console.log('Blob check:', {
        type: 'PDF',
        valid: isPDF,
        sample: str.slice(0, 20) + '...' // Show first 20 chars
      });
      return isPDF;
    } catch (e) {
      console.log('Not valid base64:', {
        error: e.message,
        sample: str.slice(0, 20) + '...'
      });
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
          
          console.log('Document info:', {
            title: doc.titre,
            isBlob: isBlob,
            uriType: typeof doc.documentUri
          });

          return {
            type: 'DocumentType',
            title: doc.titre || 'Untitled Document',
            description: doc.context || 'No description',
            date: doc.anne || 'Unknown date',
            size: '5 MB', // Default or get from API
            format: 'PDF', // Default or detect from content
            url: isBlob 
              ? `data:application/pdf;base64,${doc.documentUri}`
              : doc.documentUri || '#'
          };
        })
      : []
  };

  return (
    <div>
      <QuestionCollapsibleSection question={question} />
    </div>
  );
};

export default FirstQuestion;