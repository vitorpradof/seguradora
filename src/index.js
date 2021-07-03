import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import Routes from './routers/Routes';
import history from './routers/History';

import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Routes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
