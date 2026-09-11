import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import GiveawayPage from './pages/Giveaway/Giveaway.jsx';
import './App.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GiveawayPage />
  </React.StrictMode>,
);
