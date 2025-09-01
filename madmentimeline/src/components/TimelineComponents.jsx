import React from 'react';
import PropTypes from 'prop-types';

export const TimelineHeader = ({ selectedYear, selectedSeason }) => {
    const handleImageError = (e) => {
    console.warn('Logo image failed to load:', e.target.src);
    // Fallback to text if image fails to load
    e.target.style.display = 'none';
    const textFallback = document.createElement('h1');
    textFallback.style.cssText = 'fontSize: 1.8rem; fontWeight: bold; margin: 0; color: #ffffff; textShadow: 2px 2px 4px rgba(0,0,0,0.5);';
    
    const getViewTitle = () => {
      if (selectedYear) return `${selectedYear} - Monthly View`;
      if (selectedSeason) return `${selectedSeason.name} - Season View`;
      return 'Mad Men Timeline (1960-1970)';
    };
    
    textFallback.textContent = getViewTitle();
    e.target.parentNode.appendChild(textFallback);
  };

   return (
    <div style={{
      textAlign: 'center',
      marginBottom: '20px',
      padding: '10px 20px',
    }}>
      <img 
        src="/src/assets/logoTest.png"
        alt="Mad Men Timeline Logo"
        onError={handleImageError}
        style={{
          maxHeight: '200px',
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
  );
};

TimelineHeader.propTypes = {
  selectedYear: PropTypes.number,
  selectedSeason: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

TimelineHeader.defaultProps = {
  selectedYear: null,
  selectedSeason: null
};

export const DonImage = () => {
  const handleImageError = (e) => {
    console.warn('Don image failed to load:', e.target.src);
    e.target.style.display = 'none';
  };

  return (
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
        alt="Don Draper silhouette" 
        className="bottom-left-image"
        onError={handleImageError}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
};

DonImage.propTypes = {};

export const ConfidenceLegend = () => {
  const legendItems = [
    {
      borderStyle: '2px solid #fff',
      label: 'Known',
      description: 'Confirmed dates from episode content'
    },
    {
      borderStyle: '2px dashed #fff',
      label: 'Likely Estimate',
      description: 'Estimated based on contextual clues'
    },
    {
      borderStyle: '1px dotted #fff',
      label: 'Reasonable Guess',
      description: 'Best guess based on available information'
    }
  ];

  return (
    <div style={{
      fontSize: '0.8rem',
      opacity: 0.7,
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap'
    }}>
      {legendItems.map((item, index) => (
        <div 
          key={index}
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          title={item.description}
        >
          <div style={{ 
            width: '12px', 
            height: '12px', 
            border: item.borderStyle, 
            borderRadius: '2px' 
          }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

ConfidenceLegend.propTypes = {};