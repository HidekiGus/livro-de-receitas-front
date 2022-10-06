import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './reset.css';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('.root'));
