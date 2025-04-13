// pages/ChapterPage/ChapterPage.jsx

import ChartCard from '../../components/common/ChartCard/ChartCard';
import DocumentCard from '../../components/common/DocumentCard';

const ChapterPage = () => {
  const chartData = {
    labels: ['2019', '2020', '2021'], // Years on x-axis
  datasets: [
    {
      label: 'Product A',
      data: [120, 190, 300],
      backgroundColor: '#FF6384',
    },
    {
      label: 'Product B', 
      data: [80, 150, 200],
      backgroundColor: '#36A2EB',
    },
    {
      label: 'Product C',
      data: [150, 210, 250],
      backgroundColor: '#FFCE56',
    }
  ]
  };
  return (
    <>
      <ChartCard
      title="Monthly Sales"
      chartType="bar"
      chartData={chartData}
      //onDownload={handleDownload}
      onSettings={() => console.log('Settings clicked')}
      onFilter={() => console.log('Filter clicked')}
      onExpand={() => console.log('Expand clicked')}
    />

    <DocumentCard  title="document of the IDK and IDC" uploadDate="20/02/08" fileSize="89212 kb" fileType="txt"/>
    
    
    </>
    
  );
};

export default ChapterPage;