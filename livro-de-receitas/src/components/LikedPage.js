import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import Header from './Header';
import frontUrl from '../utils/frontUrl';
import backUrl from '../utils/backUrl';
import heartDislike from '../assets/heart-dislike.svg';

export default function LikedPage() {
  const [likedRecipes, setLikedRecipes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === null) {
      navigate('/');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`${backUrl}/likes`, config);

    promise
      .then((res) => setLikedRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      {likedRecipes.length === 0 ? (
        <Message>
          <img src={heartDislike} />
          <h1>Você ainda não curtiu nenhuma receita!</h1>
        </Message>
      ) : (
        likedRecipes.map((recipe, index) => (
          <RecipeCard
            recipe={recipe}
            key={index}
            onClick={() =>
              window.open(`${frontUrl}/recipes/${recipe.id}`, '_self')
            }
          />
        ))
      )}
      <Footer />
    </>
  );
}

const Message = styled.div`
  width: 100vw;
  height: 30vh;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  padding-top: 10vh;

  h1 {
    font-size: 25px;
  }

  img {
    width: 10vh;
  }
`;
