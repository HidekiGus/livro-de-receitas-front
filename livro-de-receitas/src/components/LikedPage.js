import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import Header from './Header';
import heartDislike from '../assets/heart-dislike.svg';

export default function LikedPage() {
  const [likedRecipes, setLikedRecipes] = useState();

  const navigate = useNavigate();

  console.log(likedRecipes);

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

    const promise = axios.get(`${process.env.BACK_URL}/likes`, config);

    promise
      .then((res) => {
        if (res.data === null) {
          return;
        } else {
          setLikedRecipes(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <LikedRecipesContainer>
        {likedRecipes === undefined ? (
          ''
        ) : likedRecipes.length === 0 ? (
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
                window.open(
                  `${process.env.FRONT_URL}/recipes/${recipe.id}`,
                  '_self'
                )
              }
            />
          ))
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

const LikedRecipesContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10vh; //8vh from Footer + 2vh for spacing between last post and footer

  width: 100vw;
  height: fit-content;
  flex-wrap: wrap;
`;
