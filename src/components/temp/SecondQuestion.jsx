import { useQuery } from '@tanstack/react-query';
import { fetchSecondQuestionCH1_1_2 } from '../../services/api';
import QuestionCollapsibleSection from '../../components/common/QuestionCollapsibleSection';

const SecondQuestion = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['secondQuestion'],
        queryFn: fetchSecondQuestionCH1_1_2,
    });

    if (isLoading) return <div className="p-4 text-center">Loading question data...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error loading question data: {error.message}</div>;

    return (
        <div className="p-4">
            {data && (
                <QuestionCollapsibleSection 
                    question={{
                        ...data,
                        // Ensure the questionAnswer array has the correct structure
                        questionAnswer: data.questionAnswer.map(answer => {
                            if (answer.type === "DocumentType") {
                                return {
                                    ...answer,
                                    // Add any missing properties needed by DocumentCard
                                    fileType: answer.format || 'pdf',
                                    isAvailable: true // Or determine based on your logic
                                };
                            }
                            return answer;
                        })
                    }} 
                />
            )}
        </div>
    );
};

export default SecondQuestion;