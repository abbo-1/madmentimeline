import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ClickableTimeline from './components/ClickableTimeline.jsx';
import './css/timeline.css';
import seasons from './data/seasonData.js';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ClickableTimeline seasons={seasons} />
  </StrictMode>
);