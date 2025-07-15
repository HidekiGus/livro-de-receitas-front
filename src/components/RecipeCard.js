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
    const promise = axios.post(`${backUrl}/like/${recipe._id}`, {}, config);
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
      <RecipeContainer>
        <AboveLine onClick={() => navigate(`/recipes/${recipe.title}`)}>
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
            <Image isLiked={isLiked} src={fullHeart} onClick={like} />
          ) : (
            <Image isLiked={isLiked} src={emptyHeart} onClick={like} />
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
              navigator.clipboard.writeText(`${frontUrl}/recipes/${recipe._id}`);
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
  background-color: #E6E6E6;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  box-shadow: 3px 5px 9px 2px rgba(0, 0, 0, 0.35);
`;

const Top = styled.div`
  position: relative;
  width: 90vw;
  height: 150px;
  max-width: 480px;

  display: flex;
  align-items: center;

  img {
    position: relative;
    top: -16px;
    left 0;
    height: 117px;
    width: 208px;
    max-width: 208px;
    border: 1px solid #FF6600;
    border-radius: 24px;
    box-shadow: 2px 3px 9px 2px rgba(0, 0, 0, 0.3);
  }

  h1 {
  position: absolute;
    top: 20px;
    left: 215px;
    font-family: 'Twinkle Star';
    font-size: 42px;
    width: 150px;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 24px;
    }
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

const Image = styled.img`
  height: ${props => props.isLiked ? "36px" : "30px"};
  width: ${props => props.isLiked ? "36px" : "30px"};
`

const Bottom = styled.div`
  width: 90vw;
  max-width: 450px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    height: 38px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    filter: invert(54%) sepia(34%) saturate(6920%) hue-rotate(359deg) brightness(99%) contrast(108%);
  }

  img:hover {
    transform: scale(1.3) rotate(0.015turn);
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const AboveLine = styled.div`
  width: 90vw;
  height: 190px;

  @media (min-width: 600px) {
    width: 450px;
  }
`;
