"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const LineChart = () => {
  const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
  });
  const data = {
    labels: [ 'Views', 'Bookmarks', 'comments', 'Likes'],
    datasets: [
      {
        label: `ANALYTICS FOR ARTICLE.NAME`,
        data: [65, 59, 80, 81],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="w-[400px] h-[400px]">
      <Line data={data} />
    </div>
  );
};
export default LineChart;
