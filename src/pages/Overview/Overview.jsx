
import { useQuery } from '@tanstack/react-query';
import { fetchFieldsData } from '../../services/api';
import AnsweredQuestionsCountTable from './AnsweredQuestionsCountTable';

const Overview = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fieldsData'],
    queryFn: fetchFieldsData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  //console.log("Data in Overview:", data);

  return (
    <div>
      <h1>Overview</h1>
      {data && <AnsweredQuestionsCountTable data={data} />}
    </div>
  );
};

export default Overview;
