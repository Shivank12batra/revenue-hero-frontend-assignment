import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ActivityGraph = ({ data }) => {
  const chartData = {
    labels: Array.from({ length: 7 }, (_, index) => `Day ${index + 1}`),
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: '#E6E6FF', // color of area under the curve
        borderColor: '#4B0082', // line color
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };
  

  return (
    <div className="w-full h-8">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ActivityGraph;






