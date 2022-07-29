import React from 'react';
import './App.css';
import Template  from './components/Template'
import { Typography } from '@mui/material';
function App() {
  return (
    <div className="App">
      <Typography variant="h4">
        Zorp - Apps for mobile workforce, in minutes
      </Typography>
      <Template />
    </div>
  );
}

export default App;
