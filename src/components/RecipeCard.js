import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';
import Swal from 'sweetalert2';
import frontUrl from '../utils/frontUrl.js';

export default function RecipeCard({ recipe }) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const backUrl = process.env.REACT_APP_BACK_URL;
  const navigate = useNavigate();

  function like(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(`${backUrl}/like/${recipe.id}`, {}, config);
    promise
      .then((res) => {
        console.log(res.data);
        setIsLiked(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div />
      <RecipeContainer>
        <AboveLine onClick={() => navigate(`/recipes/${recipe.id}`)}>
          <Top>
            <img src={recipe.image} />
            <h1>{recipe.title}</h1>
          </Top>
          <Middle>
            <h1>⏲️ {recipe.time} minutos</h1>
            <h1>{recipe.portions} porções</h1>
          </Middle>
        </AboveLine>
        <Line />
        <Bottom>
          {isLiked ? (
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
              navigator.clipboard.writeText(`${frontUrl}/recipes/${recipe.id}`);
            }}
          />
        </Bottom>
      </RecipeContainer>
    </>
  );
}

const RecipeContainer = styled.div`
  font-family: 'Patrick hand';
  width: 90vw;
  max-width: 450px;
  height: 230px;
  background-color: #0c7845;
  margin-top: 20px;
  border: 1px solid;
  border-radius: 8px;
`;

const Top = styled.div`
  width: 90vw;
  height: 150px;
  max-width: 480px;

  display: flex;
  align-items: center;

  img {
    height: 117px;
    width: 208px;
    max-width: 208px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    margin-right: 20px;
    margin-left: 20px;
    box-shadow: 2px 3px 9px 2px rgba(0, 0, 0, 0.3);
  }

  h1 {
    font-family: 'Twinkle Star';
    font-size: 42px;
    width: 150px;
    margin-right: 30px
  }
`;

const Middle = styled.div`
  width: 90vw;
  max-width: 450px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;

  h1 {
    font-size: 26px;
    padding-bottom: 20px;
  }
`;

const Bottom = styled.div`
  width: 90vw;
  max-width: 450px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    height: 30px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  img:hover {
    transform: scale(1.3) rotate(0.015turn);
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
`;

const AboveLine = styled.div`
  width: 90vw;
  height: 190px;

  @media (min-width: 600px) {
    width: 450px;
  }
`;
