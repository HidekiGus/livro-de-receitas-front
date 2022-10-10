import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import backUrl from '../utils/backUrl';
import frontUrl from '../utils/frontUrl';
import RecipeCard from './RecipeCard';
import Header from './Header';
import Footer from './Footer';

export default function HomePage() {
  const token = localStorage.getItem('token');

  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(async () => {
    if (token === null) {
      navigate('/');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const promise = await axios.get(`${backUrl}/recipes`, config);
      setRecipes(promise.data);
      console.log(promise.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <RecipesContainer>
        {recipes === null && error === null ? (
          <h1>Preparando receitas pra você...</h1>
        ) : recipes === null && error !== null ? (
          <h1>
            Ops! Parece que as receitas não deram certo, atualize a página!
          </h1>
        ) : recipes.length === 0 ? (
          <h1>Ainda não há receitas por aqui!</h1>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              key={index}
              onClick={() =>
                window.open(`${frontUrl}/recipes/${recipe.id}`, '_self')
              }
            />
          ))
        )}
      </RecipesContainer>
      <Footer />
    </>
  );
}

const RecipesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10vh; //8vh from Footer + 2vh for spacing between last post and footer
`;
