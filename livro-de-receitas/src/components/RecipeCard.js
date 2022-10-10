import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';
import Swal from 'sweetalert2';

export default function RecipeCard({ recipe }) {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const navigate = useNavigate();

  function like(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(
      `${process.env.BACK_URL}/like/${recipe.id}`,
      {},
      config
    );
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
            <h1>Rende: {recipe.portions} porções</h1>
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
              navigator.clipboard.writeText(
                `${process.env.FRONT_URL}/recipes/${recipe.id}`
              );
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
  background-color: #0c7845;
  margin-top: 20px;
  border: 1px solid;
  border-radius: 8px;

  @media (min-width: 600px) {
    width: 450px;
  }
`;

const Top = styled.div`
  width: 90vw;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    height: 100px;
    width: 160px;
    border: 1px solid black;
    border-radius: 8px;
  }

  h1 {
    font-size: 25px;
    width: 150px;
  }
  @media (min-width: 600px) {
    width: 450px;

    img {
      height: 120px;
      width: 200px;
    }

    h1 {
      font-size: 32px;
    }
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
    font-size: 23px;
    padding-bottom: 20px;
  }

  @media (min-width: 600px) {
    width: 450px;
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

  @media (min-width: 600px) {
    width: 450px;
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
