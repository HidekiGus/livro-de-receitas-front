import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';
import backUrl from '../utils/backUrl';
import Swal from 'sweetalert2';

export default function Recipe({ recipe }) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [isShowingAlert, setShowingAlert] = useState(false);

  function like(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    const promise = axios.post(`${backUrl}/like/${recipe.id}`, {}, config);
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
      <div />
      <RecipeContainer>
        <Top>
          <img src={recipe.image} />
          <h1>{recipe.title}</h1>
        </Top>
        <Middle>
          <h1>⏲️ {recipe.time} minutos</h1>
          <h1>Rende: {recipe.portions} porções</h1>
        </Middle>
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
              navigator.clipboard.writeText('dingoubeu');
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
  height: 230px;
  background-color: #0ea960;
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
    border-radius: 8px;
  }

  h1 {
    font-size: 25px;
    width: 150px;
  }
`;

const Middle = styled.div`
  width: 90vw;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;

  h1 {
    font-size: 20px;
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
