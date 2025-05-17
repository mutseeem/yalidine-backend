import { useQuery } from '@tanstack/react-query';
import { fetchSecondQuestionCH1_1_2 } from '../../services/api';
import QuestionCollapsibleSection from '../../components/common/QuestionCollapsibleSection';

const SecondQuestion = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['secondQuestion'],
        queryFn: fetchSecondQuestionCH1_1_2,
    }); 

    //TODO:we need to make a design here a good one instead of a text ; same goeas everywhere we fetch data  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading question data.</div>;

    return(
        <></>
    );

}

export default SecondQuestion;