import React, { useState } from 'react';
import '../css/timeline.css';

const Timeline = ({ colors }) => {
  const [zoomedIndex, setZoomedIndex] = useState(null);

  const handleSectionClick = (index) => {
    setZoomedIndex(index);
  };

  const handleZoomOut = () => {
    setZoomedIndex(null);
  };

  const handleEdgeClick = (direction) => {
    if (direction === 'prev' && zoomedIndex > 0) {
      setZoomedIndex(zoomedIndex - 1);
    } else if (direction === 'next' && zoomedIndex < colors.length - 1) {
      setZoomedIndex(zoomedIndex + 1);
    }
  };

  const years = Array.from({ length: 11 }, (_, i) => 1960 + i);

  return (
    <div className="timelineContainer">
    {zoomedIndex !== null ? (
      <div className="zoomedView">
        {/* Left edge (previous year) */}
        <div
          className="edge prev"
          onClick={() => handleEdgeClick('prev')}
          style={{ backgroundColor: colors[zoomedIndex - 1] }}
        >
          <span>{years[zoomedIndex - 1]}</span>
        </div>

        {/* Zoomed year */}
        <div
          className="zoomedSection"
          style={{ backgroundColor: colors[zoomedIndex] }}
        >
          <h2>{years[zoomedIndex]}</h2>
        </div>

        {/* Right edge (next year) */}
        <div
          className="edge next"
          onClick={() => handleEdgeClick('next')}
          style={{ backgroundColor: colors[zoomedIndex + 1] }}
        >
          <span>{years[zoomedIndex + 1]}</span>
        </div>
      </div>
    ) : (
      <div className="timeline">
        {years.map((year, index) => (
          <div
            key={year}
            className="timelineSection"
            onClick={() => handleSectionClick(index)}
            style={{ backgroundColor: colors[index] }}
          >
            <span>{year}</span>
          </div>
        ))}
      </div>
    )}

      {/* Don image */}
      <div className="don">
        <img src="/src/assets/don.webp" alt="Don" className="bottom-left-image" />
      </div>
    </div>
  );
};

export default Timeline;