import React from 'react';
import PropTypes from 'prop-types';
import { 
  getPosition, 
  getWidth, 
  getEpisodeColor, 
  getEpisodeDates
} from './timelineUtilities.js';

export const DecadeView = ({ 
  seasons, 
  years, 
  showSubtitles, 
  onYearClick, 
  onSeasonClick 
}) => {
  const timelineStart = new Date('1960-01-01');
  const timelineEnd = new Date('1970-12-31');
  return (
    <>
      {/* years Bar */}
      <div style={{
        position: 'relative',
        height: '80px',
        marginBottom: '40px',
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden'
      }}>
        {years.map((year, index) => (
          <div
            key={year}
            onClick={() => onYearClick(year)}
            style={{
              position: 'absolute',
              left: `${(index / years.length) * 100}%`,
              width: `${100 / years.length}%`,
              height: '100%',
              background: `hsl(${30 + index * 10}, 50%, ${40 + index * 3}%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: index < years.length - 1 ? '2px solid rgba(255,255,255,0.2)' : 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {year}
          </div>
        ))}
      </div>

      {/* seasons Bar */}
      <div style={{
        position: 'relative',
        height: showSubtitles ? '80px' : '60px',
        background: 'rgba(0,0,0,0.1)',
        overflow: 'visible'
      }}>
        {seasons.map((season, index) => {
          const left = getPosition(season.start, timelineStart, timelineEnd);
          const width = getWidth(season.start, season.end, timelineStart, timelineEnd);
          
          return (
            <div
              key={season.name}
              onClick={() => onSeasonClick(season)}
              style={{
                position: 'absolute',
                left: `${left}%`,
                width: `${width}%`,
                height: '60px',
                background: `linear-gradient(135deg, ${season.color} 0%, ${season.color}cc 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                overflow: 'visible'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) translateY(-5px)';
                e.target.style.zIndex = '10';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.zIndex = '1';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
              }}
            >
              <span style={{ padding: '0 10px' }}>
                {season.name}
              </span>
              {showSubtitles && (
                <span style={{
                  fontSize: '0.7rem',
                  opacity: 0.9,
                  marginTop: '2px',
                  whiteSpace: 'nowrap'
                }}>
                  {new Date(season.start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(season.end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

DecadeView.propTypes = {
  seasons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  showSubtitles: PropTypes.bool.isRequired,
  onYearClick: PropTypes.func.isRequired,
  onSeasonClick: PropTypes.func.isRequired
};

export const YearView = ({ 
  selectedYear,
  seasons,
  years,
  months,
  panPosition,
  isDragging,
  onSeasonClick,
  onEpisodeClick
}) => {
  const yearStart = new Date(selectedYear, 0, 1);
  const yearEnd = new Date(selectedYear, 11, 31);
  const seasonsInYear = seasons.filter(season => {
    const seasonStart = new Date(season.start);
    const seasonEnd = new Date(season.end);
    return seasonStart.getFullYear() <= selectedYear && seasonEnd.getFullYear() >= selectedYear;
  });

  return (
    <div style={{
      transform: `translateX(${panPosition}px)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* months */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '4px',
        marginBottom: '40px'
      }}>
        {months.map((month, index) => (
          <div
            key={month}
            style={{
              height: '60px',
              background: `hsl(${30 + years.indexOf(selectedYear) * 10}, 40%, ${35 + index * 2}%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              border: '2px solid rgba(255,255,255,0.2)',
              position: 'relative'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div>{month}</div>
              <div style={{ 
                fontSize: '0.7rem', 
                opacity: 0.8,
                marginTop: '2px'
              }}>
                {selectedYear}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* seasons in year with episodes */}
      <div style={{
        position: 'relative',
        flex: 1,
        background: 'rgba(0,0,0,0.3)',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }}>
        {seasonsInYear.map((season) => {
          const seasonStart = new Date(season.start);
          const seasonEnd = new Date(season.end);
          
          const effectiveStart = new Date(Math.max(seasonStart.getTime(), yearStart.getTime()));
          const effectiveEnd = new Date(Math.min(seasonEnd.getTime(), yearEnd.getTime()));
          
          const left = getPosition(effectiveStart.toISOString(), yearStart, yearEnd);
          const width = getWidth(effectiveStart.toISOString(), effectiveEnd.toISOString(), yearStart, yearEnd);
          
          return (
            <div key={`${season.name}-${selectedYear}`} style={{ marginBottom: '20px' }}>
              {/* season bar */}
              <div style={{
                position: 'relative',
                height: '60px',
                marginBottom: '10px'
              }}>
                <div
                  onClick={() => onSeasonClick(season)}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    width: `${width}%`,
                    height: '60px',
                    background: `linear-gradient(135deg, ${season.color} 0%, ${season.color}cc 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-5px)';
                    e.target.style.zIndex = '10';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.zIndex = '1';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '0 10px' }}>
                    <div>{season.name}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                      {effectiveStart.toLocaleDateString('en-US', { month: 'short' })} - {effectiveEnd.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* episodes line */}
              <div style={{
                position: 'relative',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'auto',
                padding: '0 10px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  minWidth: 'max-content'
                }}>
                  {season.episodes.map((episode, episodeIndex) => {
                    const episodeDates = getEpisodeDates(episode);
                    const firstDate = episodeDates[0];
                    const isInYear = firstDate && firstDate.getFullYear() === selectedYear;
                    const hasMultipleDates = episode.dates.length > 1 || episode.dates.some(dateObj => dateObj.start && dateObj.end);
                    const episodeColor = getEpisodeColor(episodeIndex, season.episodes.length);
                    
                    return (
                      <div key={episode.number} style={{ position: 'relative' }}>
                        <div
                          onClick={() => onEpisodeClick(episode)}
                          style={{
                            width: '40px',
                            height: '40px',
                            background: `linear-gradient(135deg, ${episodeColor} 0%, ${episodeColor.replace('rgb(', 'rgba(').replace(')', ', 0.7)')} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                            border: hasMultipleDates ? '3px solid #FFD700' : '2px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            opacity: isInYear ? 1 : 0.4,
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
                            e.target.style.borderColor = hasMultipleDates ? '#FFD700' : 'rgba(255,255,255,0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
                            e.target.style.borderColor = hasMultipleDates ? '#FFD700' : 'rgba(255,255,255,0.3)';
                          }}
                          title={`${episode.title}\n${episode.dates.map(dateObj => {
                            if (dateObj.date) return dateObj.date;
                            if (dateObj.start && dateObj.end) return `${dateObj.start} to ${dateObj.end}`;
                            return 'Unknown date';
                          }).join('\n')}`}
                        >
                          {episode.number}
                          {hasMultipleDates && (
                            <div style={{
                              position: 'absolute',
                              top: '-2px',
                              right: '-2px',
                              width: '8px',
                              height: '8px',
                              background: '#FFD700',
                              borderRadius: '50%',
                              fontSize: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#000',
                              fontWeight: 'bold'
                            }}>
                              •
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

YearView.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  seasons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    episodes: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      dates: PropTypes.array.isRequired
    })).isRequired
  })).isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  panPosition: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onSeasonClick: PropTypes.func.isRequired,
  onEpisodeClick: PropTypes.func.isRequired
};

export const SeasonView = ({ 
  selectedSeason,
  selectedEpisode,
  showAllEpisodes,
  panPosition,
  isDragging,
  years,
  months,
  onEpisodeClick,
  onShowAllEpisodes,
  onYearClick,
  renderCalendar
}) => {
  if (!selectedSeason) return null;

  const seasonStart = new Date(selectedSeason.start);
  
  // grab first and last episode dates for in-universe timespan
  const allEpisodeDates = selectedSeason.episodes.flatMap(episode => getEpisodeDates(episode));
  if (allEpisodeDates.length === 0) {
    console.error("No episode dates found for season:", selectedSeason.name);
    return <div>Error: No episode dates found</div>;
  }
  
  const firstEpisodeDate = allEpisodeDates.sort((a, b) => a - b)[0];
  const lastEpisodeDate = allEpisodeDates.sort((a, b) => b - a)[0];

  // generate array of relevant months only
  const relevantMonths = [];
  const currentDate = new Date(firstEpisodeDate.getFullYear(), firstEpisodeDate.getMonth(), 1);
  const endDate = new Date(lastEpisodeDate.getFullYear(), lastEpisodeDate.getMonth(), 1);

  while (currentDate <= endDate) {
    relevantMonths.push({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      monthName: months[currentDate.getMonth()],
      key: `${currentDate.getFullYear()}-${currentDate.getMonth()}`
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return (
    <div style={{
      transform: `translateX(${panPosition}px)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* season header with title and info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        background: 'rgba(0,0,0,0.3)',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h2 style={{
          color: selectedSeason.color,
          fontSize: '2.5rem',
          margin: '0 0 15px 0',
          fontWeight: 'bold'
        }}>
          {selectedSeason.name}
        </h2>
        <div style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '10px' }}>
          Premiered: {seasonStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '10px' }}>
          In-Universe Timespan: {firstEpisodeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {lastEpisodeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '15px' }}>
          {selectedSeason.episodes.length} episodes
        </div>
        
        {/* display all episodes button */}
        <button
          onClick={onShowAllEpisodes}
          style={{
            padding: '12px 24px',
            background: showAllEpisodes 
              ? `linear-gradient(135deg, ${selectedSeason.color} 0%, ${selectedSeason.color}cc 100%)`
              : 'rgba(255,255,255,0.1)',
            border: `2px solid ${selectedSeason.color}`,
            borderRadius: '25px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
            marginBottom: '10px'
          }}
          onMouseEnter={(e) => {
            if (!showAllEpisodes) {
              e.target.style.background = `linear-gradient(135deg, ${selectedSeason.color}66 0%, ${selectedSeason.color}44 100%)`;
            }
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            if (!showAllEpisodes) {
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }
            e.target.style.transform = 'scale(1)';
          }}
        >
          {showAllEpisodes ? 'Hide All Episodes' : 'Display All Episodes'}
        </button>

        {selectedEpisode && (
          <div style={{ 
            fontSize: '1rem', 
            opacity: 0.9, 
            marginTop: '10px',
            padding: '8px 15px',
            background: selectedSeason.color + '33',
            borderRadius: '20px',
            border: `2px solid ${selectedSeason.color}`
          }}>
            Selected: Episode {selectedEpisode.number} - {selectedEpisode.title}
          </div>
        )}
        
        {showAllEpisodes && (
          <div style={{ 
            fontSize: '1rem', 
            opacity: 0.9, 
            marginTop: '10px',
            padding: '8px 15px',
            background: selectedSeason.color + '33',
            borderRadius: '20px',
            border: `2px solid ${selectedSeason.color}`
          }}>
            Displaying all {selectedSeason.episodes.length} episodes
          </div>
        )}

        {/* Legend */}
        <div style={{
          fontSize: '0.8rem',
          opacity: 0.7,
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', border: '2px solid #fff', borderRadius: '2px' }}></div>
            <span>Known</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', border: '2px dashed #fff', borderRadius: '2px' }}></div>
            <span>Likely Estimate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', border: '1px dotted #fff', borderRadius: '2px' }}></div>
            <span>Reasonable Guess</span>
          </div>
        </div>
      </div>

      {/* relevant months with calendars */}
      <div style={{
        marginBottom: '30px',
        position: 'relative'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(relevantMonths.length, 4)}, 1fr)`,
          gap: '15px',
          background: 'rgba(0,0,0,0.2)',
          padding: '20px',
          borderRadius: '8px'
        }}>
          {relevantMonths.map((monthInfo, index) => (
            <div key={monthInfo.key} style={{ textAlign: 'center' }}>
              {/* month header */}
              <div
                onClick={() => onYearClick(monthInfo.year)}
                style={{
                  height: '40px',
                  background: `hsl(${30 + years.indexOf(monthInfo.year) * 10}, 45%, ${40 + monthInfo.month * 2}%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '5px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div>{monthInfo.monthName} {monthInfo.year}</div>
              </div>
              
              {/* calendar grid */}
              {renderCalendar(monthInfo)}
            </div>
          ))}
        </div>
      </div>

      {/* episodes line */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '15px',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '10px',
          overflow: 'auto',
          maxWidth: '100%'
        }}>
          {selectedSeason.episodes.map((episode, index) => {
            const isSelected = selectedEpisode === episode;
            const episodeColor = getEpisodeColor(index, selectedSeason.episodes.length);
            const hasMultipleDates = episode.dates.length > 1;
            const hasRanges = episode.dates.some(dateObj => dateObj.start && dateObj.end);
            
            return (
              <div
                key={episode.number}
                onClick={() => onEpisodeClick(episode)}
                style={{
                  minWidth: '60px',
                  height: '60px',
                  background: isSelected 
                    ? `linear-gradient(135deg, ${episodeColor} 0%, ${episodeColor} 100%)`
                    : `linear-gradient(135deg, ${episodeColor} 0%, ${episodeColor.replace('rgb(', 'rgba(').replace(')', ', 0.7)')} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                  border: isSelected 
                    ? `4px solid #FFD700`
                    : hasMultipleDates || hasRanges ? '3px solid #FFD700' : '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  boxShadow: isSelected 
                    ? '0 8px 25px rgba(0,0,0,0.5)'
                    : '0 4px 15px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = 'scale(1.1) translateY(-5px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                  }
                }}
                title={`${episode.title}\n${episode.dates.map(dateObj => {
                  let dateStr = '';
                  if (dateObj.date) dateStr = dateObj.date;
                  else if (dateObj.start && dateObj.end) dateStr = `${dateObj.start} to ${dateObj.end}`;
                  return `${dateStr} (${dateObj.confidence}, ${dateObj.type})`;
                }).join('\n')}\nClick to highlight dates in calendar${showAllEpisodes ? ' (will clear "Display All")' : ''}`}
              >
                {episode.number}
                {(hasMultipleDates || hasRanges) && (
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '14px',
                    height: '14px',
                    background: hasRanges ? '#FF6B6B' : '#FFD700',
                    borderRadius: '50%',
                    fontSize: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 'bold'
                  }}>
                    {hasRanges ? 'R' : episode.dates.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

SeasonView.propTypes = {
  selectedSeason: PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    episodes: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      dates: PropTypes.array.isRequired
    })).isRequired
  }),
  selectedEpisode: PropTypes.object,
  showAllEpisodes: PropTypes.bool.isRequired,
  panPosition: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEpisodeClick: PropTypes.func.isRequired,
  onShowAllEpisodes: PropTypes.func.isRequired,
  onYearClick: PropTypes.func.isRequired,
  renderCalendar: PropTypes.func.isRequired
};