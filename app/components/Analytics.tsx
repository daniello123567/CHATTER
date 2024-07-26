"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const LineChart = ({viewsCount,BookmarkCount,CommentsCount,LikesCount,articlename}:{articlename:string,viewsCount:number,BookmarkCount:number,CommentsCount:number,LikesCount:number}) => {
  const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
  });
  const data = {
    labels: [ 'Views', 'Bookmarks', 'comments', 'Likes'],
    datasets: [
      {
        label:articlename,
        data: [viewsCount, BookmarkCount, CommentsCount, LikesCount],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="w-[80%] px-[1em] py-[1em] mx-auto">
      <h1 className='text-lg font-bold text-center mb-[2em]'>ANALYTICS FOR {articlename}</h1>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
