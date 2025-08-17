import React, { useState, useRef } from 'react';
import seasons from '../data/seasonData.js';

const ClickableTimeline = ({ seasons }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [panPosition, setPanPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, pan: 0 });
  const timelineRef = useRef(null);

  const timelineStart = new Date('1960-01-01');
  const timelineEnd = new Date('1970-12-31');

  //parse MM-DD-YYYY format to Date object
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  //format Date object to MM-DD-YYYY
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  //get all dates from an episode
  const getEpisodeDates = (episode) => {
    const allDates = [];
    
    episode.dates.forEach(dateObj => {
      if (dateObj.date) {
        //single date
        try {
          allDates.push(parseDate(dateObj.date));
        } catch (error) {
          console.error("Error parsing single date:", dateObj.date, error);
        }
      } else if (dateObj.start && dateObj.end) {
        //date range
        try {
          const startDate = parseDate(dateObj.start);
          const endDate = parseDate(dateObj.end);
          const currentDate = new Date(startDate);
          
          while (currentDate <= endDate) {
            allDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        } catch (error) {
          console.error("Error parsing date range:", dateObj.start, "to", dateObj.end, error);
        }
      }
    });
    
    return allDates;
  };

  //get confidence level for a specific date
  const getDateConfidence = (episode, targetDate) => {
    for (const dateObj of episode.dates) {
      if (dateObj.date) {
        const episodeDate = parseDate(dateObj.date);
        if (episodeDate.getTime() === targetDate.getTime()) {
          return { confidence: dateObj.confidence, type: dateObj.type };
        }
      } else if (dateObj.start && dateObj.end) {
        const startDate = parseDate(dateObj.start);
        const endDate = parseDate(dateObj.end);
        if (targetDate >= startDate && targetDate <= endDate) {
          return { confidence: dateObj.confidence, type: dateObj.type };
        }
      }
    }
    return { confidence: 'unknown', type: 'unknown' };
  };

  const getPosition = (dateString, timeStart = timelineStart, timeEnd = timelineEnd) => {
    const date = new Date(dateString);
    const duration = timeEnd - timeStart;
    return ((date - timeStart) / duration) * 100;
  };

  const getWidth = (startDate, endDate, timeStart = timelineStart, timeEnd = timelineEnd) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = timeEnd - timeStart;
    return ((end - start) / duration) * 100;
  };

  const years = Array.from({ length: 11 }, (_, i) => 1960 + i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getEpisodeColor = (episodeIndex, totalEpisodes) => {
    //generate distinct colors for each episode
    const hue = Math.round((episodeIndex * 360 / totalEpisodes) % 360);
    const saturation = 65 + (episodeIndex % 3) * 10;
    const lightness = 50 + (episodeIndex % 2) * 10;
    
    //convert HSL to RGB for browser compatibility
    const hslToRgb = (h, s, l) => {
      s /= 100;
      l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      
      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
      
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      
      return `rgb(${r}, ${g}, ${b})`;
    };
    
    return hslToRgb(hue, saturation, lightness);
  };

  const getEpisodeForDate = (year, month, day) => {
    if (!selectedSeason) return null;
    const targetDate = new Date(year, month, day);
    
    return selectedSeason.episodes.find(episode => {
      const episodeDates = getEpisodeDates(episode);
      return episodeDates.some(date => 
        date.getFullYear() === year && 
        date.getMonth() === month && 
        date.getDate() === day
      );
    });
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setShowAllEpisodes(false);
    setPanPosition(0);
  };

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    setSelectedYear(null);
    setSelectedEpisode(null);
    setShowAllEpisodes(false);
    setPanPosition(0);
  };

  const handleBackClick = () => {
    setSelectedYear(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setShowAllEpisodes(false);
    setPanPosition(0);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(selectedEpisode === episode ? null : episode);
    setShowAllEpisodes(false);
    console.log(`Clicked ${selectedSeason.name} Episode ${episode.number}: ${episode.title}`, episode.dates);
  };

  const handleShowAllEpisodes = () => {
    setShowAllEpisodes(!showAllEpisodes);
    setSelectedEpisode(null);
  };

  const handleMouseDown = (e) => {
    if (selectedYear || selectedSeason) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, pan: panPosition });
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const sensitivity = 50 / (timelineRef.current?.offsetWidth || 1000);
    const newPan = dragStart.pan + deltaX * sensitivity;
    
    setPanPosition(Math.max(-50, Math.min(50, newPan)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const renderDecadeView = () => {
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
              onClick={() => handleYearClick(year)}
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
            const left = getPosition(season.start);
            const width = getWidth(season.start, season.end);
            
            return (
              <div
                key={season.name}
                onClick={() => handleSeasonClick(season)}
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

  const renderYearView = () => {
    if (!selectedYear) return null;

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
          {seasonsInYear.map((season, seasonIndex) => {
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
                    onClick={() => handleSeasonClick(season)}
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
                            onClick={() => {
                              handleEpisodeClick(episode);
                            }}
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

  const renderSeasonView = () => {
    if (!selectedSeason) return null;

    const seasonStart = new Date(selectedSeason.start);
    const seasonEnd = new Date(selectedSeason.end);
    
    //grab first and last episode dates for in-universe timespan
    const allEpisodeDates = selectedSeason.episodes.flatMap(episode => getEpisodeDates(episode));
    if (allEpisodeDates.length === 0) {
      console.error("No episode dates found for season:", selectedSeason.name);
      return <div>Error: No episode dates found</div>;
    }
    
    const firstEpisodeDate = allEpisodeDates.sort((a, b) => a - b)[0];
    const lastEpisodeDate = allEpisodeDates.sort((a, b) => b - a)[0];

    //generate array of relevant months only
    const relevantMonths = [];
    const currentDate = new Date(firstEpisodeDate.getFullYear(), firstEpisodeDate.getMonth(), 1);
    const endDate = new Date(lastEpisodeDate.getFullYear(), lastEpisodeDate.getMonth(), 1);

    console.log("Season:", selectedSeason.name);
    console.log("First episode date:", firstEpisodeDate);
    console.log("Last episode date:", lastEpisodeDate);
    console.log("Date range:", currentDate, "to", endDate);

    while (currentDate <= endDate) {
      relevantMonths.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        monthName: months[currentDate.getMonth()],
        key: `${currentDate.getFullYear()}-${currentDate.getMonth()}`
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    console.log("Relevant months:", relevantMonths);

    //check if a day should be highlighted and get its color
    const getDayHighlighting = (year, month, day) => {
      if (showAllEpisodes) {
        //show all episode dates for the season with their respective colors
        const episode = getEpisodeForDate(year, month, day);
        if (episode) {
          const episodeIndex = selectedSeason.episodes.indexOf(episode);
          const targetDate = new Date(year, month, day);
          const confidence = getDateConfidence(episode, targetDate);
          return {
            isHighlighted: true,
            color: getEpisodeColor(episodeIndex, selectedSeason.episodes.length),
            confidence: confidence.confidence,
            type: confidence.type
          };
        }
        return { isHighlighted: false, color: null, confidence: null, type: null };
      }
      
      if (!selectedEpisode) return { isHighlighted: false, color: null, confidence: null, type: null };
      
      const episodeDates = getEpisodeDates(selectedEpisode);
      const targetDate = new Date(year, month, day);
      const isHighlighted = episodeDates.some(date => 
        date.getFullYear() === year && 
        date.getMonth() === month && 
        date.getDate() === day
      );
      
      if (isHighlighted) {
        const episodeIndex = selectedSeason.episodes.indexOf(selectedEpisode);
        const confidence = getDateConfidence(selectedEpisode, targetDate);
        return {
          isHighlighted: true,
          color: getEpisodeColor(episodeIndex, selectedSeason.episodes.length),
          confidence: confidence.confidence,
          type: confidence.type
        };
      }
      
      return { isHighlighted: false, color: null, confidence: null, type: null };
    };

    const renderCalendar = (monthInfo) => {
      const daysInMonth = getDaysInMonth(monthInfo.year, monthInfo.month);
      const firstDayOfMonth = new Date(monthInfo.year, monthInfo.month, 1).getDay(); 
      // 0 = sunday, 1 = monday, etc.
      
      const days = [];
      
      //add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(
          <div key={`empty-${i}`} style={{ 
            width: '20px', 
            height: '20px' 
          }} />
        );
      }
      
      //add days
      for (let day = 1; day <= daysInMonth; day++) {
        const highlighting = getDayHighlighting(monthInfo.year, monthInfo.month, day);
        
        //pick border style based on confidence level
        let borderStyle = '1px solid rgba(255,255,255,0.2)';
        if (highlighting.isHighlighted) {
          switch (highlighting.confidence) {
            case 'known':
              borderStyle = `3px solid ${highlighting.color}`;
              break;
            case 'estimate':
              borderStyle = `2px dashed ${highlighting.color}`;
              break;
            case 'guess':
              borderStyle = `1px dotted ${highlighting.color}`;
              break;
            default:
              borderStyle = `2px solid ${highlighting.color}`;
          }
        }
        
        days.push(
          <div
            key={day}
            style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: highlighting.isHighlighted ? 'bold' : 'normal',
              color: highlighting.isHighlighted ? '#000' : '#fff',
              background: highlighting.isHighlighted ? highlighting.color : 'transparent',
              border: borderStyle,
              borderRadius: '3px',
              transition: 'all 0.2s ease',
              boxShadow: highlighting.isHighlighted ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
              position: 'relative'
            }}
            title={highlighting.isHighlighted ? `${highlighting.type} (${highlighting.confidence})` : ''}
          >
            {day}
            {highlighting.isHighlighted && highlighting.type === 'range' && (
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '6px',
                height: '6px',
                background: '#FFD700',
                borderRadius: '50%',
                fontSize: '4px'
              }}>
              </div>
            )}
          </div>
        );
      }
      
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          padding: '5px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
          maxWidth: '160px'
        }}>
          {days}
        </div>
      );
    };

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
            onClick={handleShowAllEpisodes}
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
                  onClick={() => handleYearClick(monthInfo.year)}
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
                  onClick={() => handleEpisodeClick(episode)}
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

  const getViewTitle = () => {
    if (selectedYear) return `${selectedYear} - Monthly View`;
    if (selectedSeason) return `${selectedSeason.name} - Season View`;
    return 'Mad Men Timeline (1960-1970)';
  };

  return (
    <div style={{
      color: '#ffffff',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      padding: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* main timeline content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* dynamic Title Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            margin: 0,
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {getViewTitle()}
          </h1>
        </div>

        {/* header, timeline container, back button */}
        {!selectedYear && !selectedSeason && renderDecadeView()}
        {selectedYear && renderYearView()}
        {selectedSeason && renderSeasonView()}
      </div>

      {/* don image */}
      <div className="don" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '400px',
        height: 'auto',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <img 
          src="/src/assets/don.webp" 
          alt="Don" 
          className="bottom-left-image"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>
    </div>
  )
}

export default ClickableTimeline;