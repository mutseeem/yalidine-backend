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

  const question = {
    questionId: 'C1.1.1',
    questionCode: 'C1.1.1',
    questionTitle: 'Est-ce que L’établissement dispose d’une politique déclarée d’ouverture à l’international ?',
    status: isAnswered ? 'answered' : 'not answered',
    questionAnswer: isAnswered
      ? data.map((doc, index) => ({
          type: 'DocumentType',
          title: doc.titre || '',
          description: doc.context || '',
          date: doc.anne || '',
          size: '5 MB',
          format: 'PDF', 
          url: doc.documentUri?.[0] || '',
        }))
      : [],
  };

  //console.log(question.questionAnswer);

  return (
    <div>
      <QuestionCollapsibleSection question={question} />
    </div>
  );
};

export default FirstQuestion;
