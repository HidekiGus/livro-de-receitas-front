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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/recipes/new" element={<NewRecipePage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('.root'));
