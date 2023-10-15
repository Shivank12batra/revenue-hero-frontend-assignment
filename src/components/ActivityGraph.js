import React, {useState, useRef, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ActivityGraph = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const activityGraphRef = useRef(null);

  // lazy load ActivityGraph for horizontal scroll on mobile screens
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (activityGraphRef.current) {
      observer.observe(activityGraphRef.current);
    }

    return () => {
      if (activityGraphRef.current) {
        observer.unobserve(activityGraphRef.current);
      }
    };
  }, []);
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
    <div className="w-full h-8" ref={activityGraphRef}>
      {isVisible && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default ActivityGraph;






