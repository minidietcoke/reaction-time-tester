import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InstructionPage from './InstructionPage';

// - A random number is fetched using the random.org API, and the app waits for as many seconds
// - the app displays the result and offers to restart the test
// -

// ========================================

ReactDOM.render(
  <InstructionPage />,
  document.getElementById('root')
);
