import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './reset.css';
import './index.css';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import LikedPage from './components/LikedPage';
import NewRecipePage from './components/NewRecipePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recipes/new" element={<NewRecipePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/liked" element={<LikedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('.root'));
