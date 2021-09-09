import React from 'react';

import './App.css';
import { createTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';

import CostcoCarRentalTracker from './components/CostcoCarRentalTracker';

const theme = {};

export default function App() {
  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <div className="App">
        <header className="App-header">
          <CostcoCarRentalTracker />
        </header>
      </div>
    </MuiThemeProvider>
  );
}
