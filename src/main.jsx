// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';
import FilmDetails from './FilmDetails.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/film/:id" element={<FilmDetails />} /> {/* Добавлен параметр :id */}
    </Routes>
  </Router>,
);
