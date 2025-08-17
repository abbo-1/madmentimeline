import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ClickableTimeline from './components/Timeline.jsx';
import './css/timeline.css';
import seasons from './data/seasonData.js';

// Define the colors array outside the render method
// const colors = [
//   '#f9ac3d', '#cf4917', '#e3caa4', '#985914', '#758c33',
//   '#2d758c', '#5B456E', '#D15A5A', '#0c4352', '#d2a8ac',
//   '#c4ccb4'
// ];

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ClickableTimeline seasons={seasons} />
  </StrictMode>
);