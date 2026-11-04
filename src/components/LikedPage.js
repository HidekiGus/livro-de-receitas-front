import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import Header from './Header';
import heartDislike from '../assets/heart-dislike.svg';
import { api, getAuthConfig, getToken } from '../services/api';

export default function LikedPage() {
  const [likedRecipes, setLikedRecipes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchLikes = async () => {
      try {
        const res = await api.get('/likes', getAuthConfig());
        if (Array.isArray(res.data)) {
          setLikedRecipes(res.data);
        } else {
          setLikedRecipes([]);
        }
      } catch (_err) {
        setLikedRecipes([]);
      }
    };

    fetchLikes();
  }, [navigate]);

  return (
    <>
      <Header />
      <LikedRecipesContainer>
        {likedRecipes === undefined ? null : likedRecipes.length === 0 ? (
          <Message>
            <img src={heartDislike} alt="Nenhuma receita curtida" />
            <h1>Você ainda não curtiu nenhuma receita!</h1>
          </Message>
        ) : (
          likedRecipes.map((recipe) => {
            const recipeId = recipe._id || recipe.id;
            return <RecipeCard recipe={recipe} key={recipeId} />;
          })
        )}
      </LikedRecipesContainer>
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

const LikedRecipesContainer = styled.main`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10vh;

  width: 100vw;
  height: fit-content;
  flex-wrap: wrap;
`;
