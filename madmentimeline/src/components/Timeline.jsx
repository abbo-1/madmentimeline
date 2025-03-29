import React, { useState, useRef, useLayoutEffect } from 'react';
import '../css/timeline.css';

const Timeline = ({ colors }) => {
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [zoomedSeasonIndex, setZoomedSeasonIndex] = useState(null);
  const zoomedSectionRef = useRef(null);
  const [zoomedSectionRect, setZoomedSectionRect] = useState(null);
  
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

  const handleBackClick = () => {
    setZoomedIndex(null);
    setZoomedSeasonIndex(null); // Reset both zoom states to return to the main view
  };

  useLayoutEffect(() => {
    if (zoomedSectionRef.current) {
      const rect = zoomedSectionRef.current.getBoundingClientRect();
      setZoomedSectionRect(rect);
    }
  }, [zoomedIndex, zoomedSeasonIndex]);

  const years = Array.from({ length: 11 }, (_, i) => 1960 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const seasons = [
    { name: 'Season 1', subtitle: 'Mar 1960 - Nov 1960', start: '1960-03-01', end: '1960-11-30' },
    { name: 'Season 2', subtitle: 'Feb 1962 - Oct 1962', start: '1961-02-01', end: '1962-08-30' },
    { name: 'Season 3', subtitle: 'Mar 1963 - Dec 1963', start: '1963-03-01', end: '1963-12-31' },
    { name: 'Season 4', subtitle: 'Nov 1964 - Oct 1965', start: '1964-11-01', end: '1965-08-30' },
    { name: 'Season 5', subtitle: 'May 1966 - Apr 1967', start: '1966-05-01', end: '1967-04-30' },
    { name: 'Season 6', subtitle: 'Dec 1967 - Nov 1968', start: '1967-12-01', end: '1968-11-30' },
    { name: 'Season 7A', subtitle: 'Jan 1969 - Jul 1969', start: '1969-01-01', end: '1969-07-30' },
    { name: 'Season 7B', subtitle: 'Apr 1970 - Nov 1970', start: '1970-04-01', end: '1970-11-30' },
  ];

  // Calculate the width and position of each season box relative to the full timeline
  const calculateSeasonPosition = (season) => {
    const timelineStart = new Date('1960-01-01').getTime();
    const timelineEnd = new Date('1970-12-31').getTime();
    const seasonStart = new Date(season.start).getTime();
    const seasonEnd = new Date(season.end).getTime();

    const seasonStartPosition = ((seasonStart - timelineStart) / (timelineEnd - timelineStart)) * 100;
    const seasonEndPosition = ((seasonEnd - timelineStart) / (timelineEnd - timelineStart)) * 100;

    return {
      left: `${seasonStartPosition}%`,
      width: `${seasonEndPosition - seasonStartPosition}%`,
    };
  };

  // Calculate the width and position of each season box relative to the zoomed year
  const calculateSeasonPositionInYear = (season, zoomedYear) => {
    const yearStart = new Date(`${zoomedYear}-01-01`).getTime();
    const yearEnd = new Date(`${zoomedYear}-12-31`).getTime();
    const seasonStart = new Date(season.start).getTime();
    const seasonEnd = new Date(season.end).getTime();

    const seasonStartPosition = ((seasonStart - yearStart) / (yearEnd - yearStart)) * 100;
    const seasonEndPosition = ((seasonEnd - yearStart) / (yearEnd - yearStart)) * 100;

    return {
      left: `${seasonStartPosition}%`,
      width: `${seasonEndPosition - seasonStartPosition}%`,
    };
  };

  // Get the seasons that fall within the zoomed year
  const getSeasonsInYear = (year) => {
    return seasons.filter((season) => {
      const seasonStart = new Date(season.start).getFullYear();
      const seasonEnd = new Date(season.end).getFullYear();
      return seasonStart <= year && seasonEnd >= year;
    });
  };

  return (
    <div className="timelineContainer">
      {/* Zoomed View */}
      {zoomedIndex !== null || zoomedSeasonIndex !== null ? (
        <div className="zoomedView">
          {/* Back Button */}
          <button className="backButton" onClick={handleBackClick}>
            Back to Main View
          </button>
  
          {/* Left & Right Edge Buttons - Pixel Perfect Position */}
          {zoomedSectionRect && (
            <>
              <div
                className="edge prev"
                onClick={() => handleEdgeClick('prev')}
                style={{
                  backgroundColor:
                    zoomedIndex !== null
                      ? colors[zoomedIndex - 1]
                      : colors[zoomedSeasonIndex - 1],
                  top: `${zoomedSectionRect.top}px`,
                  height: `${zoomedSectionRect.height}px`,
                }}
              >
                <span>
                  {zoomedIndex !== null
                    ? years[zoomedIndex - 1]
                    : seasons[zoomedSeasonIndex - 1]?.name}
                </span>
              </div>
  
              <div
                className="edge next"
                onClick={() => handleEdgeClick('next')}
                style={{
                  backgroundColor:
                    zoomedIndex !== null
                      ? colors[zoomedIndex + 1]
                      : colors[zoomedSeasonIndex + 1],
                  top: `${zoomedSectionRect.top}px`,
                  height: `${zoomedSectionRect.height}px`,
                }}
              >
                <span>
                  {zoomedIndex !== null
                    ? years[zoomedIndex + 1]
                    : seasons[zoomedSeasonIndex + 1]?.name}
                </span>
              </div>
            </>
          )}
  
          {/* Display seasons when zoomed into a year */}
          {zoomedIndex !== null && (
            <div className="seasonTimeline zoomedSeasonTimeline">
              {getSeasonsInYear(years[zoomedIndex]).map((season, index) => {
                const position = calculateSeasonPositionInYear(season, years[zoomedIndex]);
                return (
                  <div
                    key={season.name}
                    className="seasonSection"
                    style={{
                      backgroundColor: '#57868f',
                      left: position.left,
                      width: position.width,
                    }}
                  >
                    <span>{season.name}</span>
                    <span className="seasonSubtitle">{season.subtitle}</span>
                  </div>
                );
              })}
            </div>
          )}
  
          {/* Zoomed year/season */}
          <div
            className="zoomedSection"
            ref={zoomedSectionRef}
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
        </div>
      ) : (
        <>
          {/* Normal View: Season Timeline */}
          <div className="seasonTimeline">
            {seasons.map((season, index) => {
              const position = calculateSeasonPosition(season);
              return (
                <div
                  key={season.name}
                  className="seasonSection"
                  onClick={() => handleSeasonClick(index)}
                  style={{
                    backgroundColor: '#57868f',
                    left: position.left,
                    width: position.width,
                  }}
                >
                  <span>{season.name}</span>
                  <span className="seasonSubtitle">{season.subtitle}</span>
                </div>
              );
            })}
          </div>
  
          {/* Normal View: Year Timeline */}
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
        </>
      )}
  
      {/* Don image */}
      <div className="don">
        <img src="/src/assets/don.webp" alt="Don" className="bottom-left-image" />
      </div>
    </div>
  );
            }

export default Timeline;