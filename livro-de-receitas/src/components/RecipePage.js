import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';

import backUrl from '../utils/backUrl';
import frontUrl from '../utils/frontUrl';

import Header from './Header';
import Footer from './Footer';

export default function RecipePage() {
  const [isLiked, setIsLiked] = useState();
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(config);
    const promise = axios.get(`${backUrl}/recipes/${id}`, config);
    console.log(promise);
    promise
      .then((res) => {
        setRecipeDataFromRes(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function setRecipeDataFromRes(res) {
    console.log(res.data);
    setIsLiked(res.data.isLiked);
    setRecipeData(res.data);
  }

  function like(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(`${backUrl}/like/${recipeData.id}`, {}, config);
    promise
      .then((res) => {
        setIsLiked(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <RecipeContainer>
          <AboveLine onClick={() => navigate(`/recipes/${recipeData.id}`)}>
            <Top>
              <img src={recipeData.image} />
              <h1>{recipeData.title}</h1>
            </Top>
            <TopMiddle>
              <h1>⏲️ {recipeData.time} minutos</h1>
              <h1>Rende: {recipeData.portions} porções</h1>
            </TopMiddle>
            <BottomMiddle>
              <h1>🛒 Ingredientes</h1>
              {recipeData.ingredients === undefined ? (
                ''
              ) : (
                <ul>
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.description}</li>
                  ))}
                </ul>
              )}
              <h1>🥣 Modo de preparo</h1>
              {recipeData.method === undefined ? (
                ''
              ) : (
                <ol>
                  {recipeData.method.map((method, index) => (
                    <li key={index}>{method.description}</li>
                  ))}
                </ol>
              )}
            </BottomMiddle>
          </AboveLine>
          <Line />
          <Bottom>
            {token === null ? (
              ''
            ) : isLiked ? (
              <img src={fullHeart} onClick={like} />
            ) : (
              <img src={emptyHeart} color="red" onClick={like} />
            )}

            <img
              src={link}
              onClick={() => {
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Link copiado pra área de transferência!',
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigator.clipboard.writeText(
                  `${frontUrl}/recipes/${recipeData.id}`
                );
              }}
            />
          </Bottom>
        </RecipeContainer>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh; //8vh from Footer + 2vh for spacing between last post and footer
`;

const RecipeContainer = styled.div`
  font-family: 'Patrick hand';
  width: 90vw;
  height: fit-content;
  background-color: #0c7845;
  margin-top: 20px;
  border: 1px solid;
  border-radius: 8px;
`;

const Top = styled.div`
  width: 90vw;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    max-height: 100px;
    max-width: 160px;
    border: 1px solid black;
    border-radius: 8px;
  }

  h1 {
    font-size: 30px;
    width: 150px;
  }
`;

const TopMiddle = styled.div`
  width: 90vw;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;

  padding: 10px 0;

  h1 {
    font-size: 24px;
  }
`;

const BottomMiddle = styled.div`
  width: 90vw;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;

  padding-left: 20px;

  h1 {
    font-size: 40px;
    padding: 15px 0 15px 10px;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
  }

  ol {
    list-style-type: decimal;
    list-style-position: inside;
    padding-bottom: 20px;
  }

  li {
    font-size: 30px;
    padding-bottom: 5px;
    max-width: 80vw;
  }
`;

const Bottom = styled.div`
  width: 90vw;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    height: 30px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
`;

const AboveLine = styled.div`
  width: 90vw;
  height: fit-content;
`;
