import React, { useState } from 'react';
import '../css/timeline.css';

const Timeline = ({ colors }) => {
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [zoomedSeasonIndex, setZoomedSeasonIndex] = useState(null);

  const handleSectionClick = (index) => {
    setZoomedIndex(index);
    setZoomedSeasonIndex(null); // Reset season zoom when year is clicked
  };

  const handleSeasonClick = (index) => {
    setZoomedSeasonIndex(index);
    setZoomedIndex(null); // Reset year zoom when season is clicked
  };

  const handleEdgeClick = (direction) => {
    if (zoomedIndex !== null) {
      if (direction === 'prev' && zoomedIndex > 0) {
        setZoomedIndex(zoomedIndex - 1);
      } else if (direction === 'next' && zoomedIndex < years.length - 1) {
        setZoomedIndex(zoomedIndex + 1);
      }
    } else if (zoomedSeasonIndex !== null) {
      if (direction === 'prev' && zoomedSeasonIndex > 0) {
        setZoomedSeasonIndex(zoomedSeasonIndex - 1);
      } else if (direction === 'next' && zoomedSeasonIndex < seasons.length - 1) {
        setZoomedSeasonIndex(zoomedSeasonIndex + 1);
      }
    }
  };

  const years = Array.from({ length: 11 }, (_, i) => 1960 + i); // Years from 1960 to 1970
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const seasons = [
    { name: 'Season 1', start: '1960-03-01', end: '1960-11-30' },
    { name: 'Season 2', start: '1961-02-01', end: '1962-08-30' },
    { name: 'Season 3', start: '1963-03-01', end: '1963-12-31' },
    { name: 'Season 4', start: '1964-11-01', end: '1965-08-30' },
    { name: 'Season 5', start: '1966-05-01', end: '1967-04-30' },
    { name: 'Season 6', start: '1967-12-01', end: '1968-11-30' },
    { name: 'Season 7A', start: '1969-01-01', end: '1969-07-30' },
    { name: 'Season 7B', start: '1970-04-01', end: '1970-11-30' },
  ];

  // Calculate the width and position of each season box
  const calculateSeasonPosition = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the total timeline duration in milliseconds
    const timelineStart = new Date('1960-01-01').getTime();
    const timelineEnd = new Date('1970-12-31').getTime();
    const timelineDuration = timelineEnd - timelineStart;

    // Calculate the start and end positions of the season relative to the timeline
    const seasonStartPosition = ((start.getTime() - timelineStart) / timelineDuration) * 100;
    const seasonEndPosition = ((end.getTime() - timelineStart) / timelineDuration) * 100;

    return {
      left: `${seasonStartPosition}%`,
      width: `${seasonEndPosition - seasonStartPosition}%`,
    };
  };

  return (
    <div className="timelineContainer">
      {/* Season Timeline */}
      <div className="seasonTimeline">
        {seasons.map((season, index) => {
          const position = calculateSeasonPosition(season.start, season.end);
          return (
            <div
              key={season.name}
              className="seasonSection"
              onClick={() => handleSeasonClick(index)}
              style={{
                backgroundColor: colors[index % colors.length],
                left: position.left,
                width: position.width,
              }}
            >
              <span>{season.name}</span>
            </div>
          );
        })}
      </div>

      {/* Year Timeline */}
      {zoomedIndex !== null || zoomedSeasonIndex !== null ? (
        <div className="zoomedView">
          {/* Left edge (previous year/season) */}
          <div
            className="edge prev"
            onClick={() => handleEdgeClick('prev')}
            style={{
              backgroundColor:
                zoomedIndex !== null
                  ? colors[zoomedIndex - 1]
                  : colors[zoomedSeasonIndex - 1],
            }}
          >
            <span>
              {zoomedIndex !== null
                ? years[zoomedIndex - 1]
                : seasons[zoomedSeasonIndex - 1]?.name}
            </span>
          </div>

          {/* Zoomed year/season */}
          <div
            className="zoomedSection"
            style={{
              backgroundColor:
                zoomedIndex !== null
                  ? colors[zoomedIndex]
                  : colors[zoomedSeasonIndex],
            }}
          >
            <h2>
              {zoomedIndex !== null
                ? years[zoomedIndex]
                : seasons[zoomedSeasonIndex]?.name}
            </h2>
            {zoomedIndex !== null && (
              <div className="monthsContainer">
                {months.map((month, index) => (
                  <div key={month} className="month">
                    {month}
                    {index < months.length - 1 && <div className="monthDivider" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right edge (next year/season) */}
          <div
            className="edge next"
            onClick={() => handleEdgeClick('next')}
            style={{
              backgroundColor:
                zoomedIndex !== null
                  ? colors[zoomedIndex + 1]
                  : colors[zoomedSeasonIndex + 1],
            }}
          >
            <span>
              {zoomedIndex !== null
                ? years[zoomedIndex + 1]
                : seasons[zoomedSeasonIndex + 1]?.name}
            </span>
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