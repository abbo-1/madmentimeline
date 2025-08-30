export const parseDate = (dateString) => {
  const [month, day, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export const getPosition = (dateString, timeStart, timeEnd) => {
  const date = new Date(dateString);
  const duration = timeEnd - timeStart;
  return ((date - timeStart) / duration) * 100;
};

export const getWidth = (startDate, endDate, timeStart, timeEnd) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = timeEnd - timeStart;
  return ((end - start) / duration) * 100;
};

export const getEpisodeDates = (episode) => {
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

export const getDateConfidence = (episode, targetDate) => {
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

export const getEpisodeColor = (episodeIndex, totalEpisodes) => {
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

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};