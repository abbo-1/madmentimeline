import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DecadeView, YearView, SeasonView } from './TimelineViews.jsx';
import { TimelineHeader, DonImage } from './TimelineComponents.jsx';
import { 
  getEpisodeDates, 
  getDateConfidence, 
  getEpisodeColor,
  getDaysInMonth
} from './timelineUtilities.js';

const ClickableTimeline = ({ seasons }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [showSubtitles] = useState(true);
  const [panPosition, setPanPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, pan: 0 });
  const timelineRef = useRef(null);

  const years = Array.from({ length: 11 }, (_, i) => 1960 + i);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const sensitivity = 50 / (timelineRef.current?.offsetWidth || 1000);
    const newPan = dragStart.pan + deltaX * sensitivity;

    setPanPosition(Math.max(-50, Math.min(50, newPan)));
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getEpisodeForDate = (year, month, day) => {
    if (!selectedSeason) return null;    
    return selectedSeason.episodes.find(episode => {
      const episodeDates = getEpisodeDates(episode);
      return episodeDates.some(date => 
        date.getFullYear() === year && 
        date.getMonth() === month && 
        date.getDate() === day
      );
    });
  };

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
    <div 
      ref={timelineRef}
      onMouseDown={handleMouseDown}
      style={{
        color: '#ffffff',
        fontFamily: '"Swiss721HeavyRegular", Arial, sans-serif',
        padding: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, zIndex: 100}}>
        
        <TimelineHeader 
          selectedYear={selectedYear} 
          selectedSeason={selectedSeason} 
        />

        {!selectedYear && !selectedSeason && (
          <DecadeView
            seasons={seasons}
            years={years}
            months={months}
            showSubtitles={showSubtitles}
            onYearClick={handleYearClick}
            onSeasonClick={handleSeasonClick}
          />
        )}

        {selectedYear && (
          <YearView
            selectedYear={selectedYear}
            seasons={seasons}
            years={years}
            months={months}
            panPosition={panPosition}
            isDragging={isDragging}
            onSeasonClick={handleSeasonClick}
            onEpisodeClick={handleEpisodeClick}
            getEpisodeForDate={getEpisodeForDate}
          />
        )}

        {selectedSeason && (
          <SeasonView
            selectedSeason={selectedSeason}
            selectedEpisode={selectedEpisode}
            showAllEpisodes={showAllEpisodes}
            panPosition={panPosition}
            isDragging={isDragging}
            years={years}
            months={months}
            onEpisodeClick={handleEpisodeClick}
            onShowAllEpisodes={handleShowAllEpisodes}
            onYearClick={handleYearClick}
            renderCalendar={renderCalendar}
          />
        )}
      </div>

      <DonImage />
    </div>
  );
};

ClickableTimeline.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      episodes: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          dates: PropTypes.arrayOf(
            PropTypes.shape({
              date: PropTypes.string,
              start: PropTypes.string,
              end: PropTypes.string,
              confidence: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired
            })
          ).isRequired
        })
      ).isRequired
    })
  ).isRequired
};

export default ClickableTimeline;