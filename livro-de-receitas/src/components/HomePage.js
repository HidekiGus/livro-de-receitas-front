import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import backUrl from '../utils/backUrl';
import frontUrl from '../utils/frontUrl';
import Recipe from './Recipe';

export default function HomePage() {
  const token = localStorage.getItem('token');

  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const token = localStorage.getItem('token');

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
      <Header>
        <h1>Livro de Receitas</h1>
      </Header>
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
            <Recipe
              recipe={recipe}
              key={index}
              onClick={() =>
                window.open(`${frontUrl}/recipes/${recipe.id}`, '_self')
              }
            />
          ))
        )}
      </RecipesContainer>
    </>
  );
}

const Header = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: #0b8049;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Patrick hand';
    font-size: 50px;
    color: #d4d4d4;
  }
`;

const RecipesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
