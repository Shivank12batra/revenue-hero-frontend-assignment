import React from 'react';

const IntentIndicators = ({ value }) => {
  const getBars = (count, activeBars, barColor, emptyColor) => {
    const bars = [];
    for (let i = 0; i < count; i++) {
      const height = i < activeBars ? `${(i + 1) * 3}px` : `${(i + 1) * 3}px`; // Increase height with each bar
      const width = '4px';
      const margin = '0.4px'
      const color = i < activeBars ? barColor : emptyColor;
      bars.push(
        <div
          key={i}
          className="h-6 inline-block rounded-md"
          style={{
            backgroundColor: color,
            width: width,
            height: height,
            margin: margin,
          }}
        ></div>
      );
    }
    return bars;
  };

  const progressBars = () => {
    switch (value) {
      case 'high':
        return getBars(5, 5, 'red', 'gray');
      case 'mid':
        return getBars(5, 3, 'red', 'gray');
      case 'low':
        return getBars(5, 2, 'red', 'gray');
      default:
        return null;
    }
  };

  return (
    <div className="text-center">
      {progressBars()}
    </div>
  );
};

export default IntentIndicators;




