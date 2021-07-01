import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/template/Header';
import Menu from './components/template/Menu';
import Dashboard from './components/template/Dashboard';
import Footer from './components/template/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Menu/>
    <Dashboard/>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
