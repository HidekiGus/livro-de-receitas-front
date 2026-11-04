import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';
import Swal from 'sweetalert2';
import frontUrl from '../utils/frontUrl';
import { api, getAuthConfig, getToken } from '../services/api';

const fontFamilyPrimary = "'Patrick hand'";
const fontFamilySecondary = "'Twinkle Star'";
const backgroundColor = 'rgba(238, 238, 238, 0.91)';
const boxShadowColor = 'rgba(0, 0, 0, 0.33)';
const lineColor = 'rgba(0, 0, 0, 0.4)';
const imgFilter =
  'invert(54%) sepia(34%) saturate(6920%) hue-rotate(359deg) brightness(99%) contrast(108%)';

export default function RecipeCard({ recipe }) {
  const [isLiked, setIsLiked] = useState(Boolean(recipe.isLiked));
  const navigate = useNavigate();
  const recipeId = recipe._id || recipe.id;

  async function like(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!getToken()) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Faça login para curtir receitas!',
        showConfirmButton: false,
        timer: 1800,
      });
      navigate('/login');
      return;
    }

    try {
      const res = await api.post(`/like/${recipeId}`, {}, getAuthConfig());
      setIsLiked(Boolean(res.data));
    } catch (_error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Não foi possível curtir a receita!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  function copyShareLink(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(`${frontUrl}/recipes/${recipeId}`);
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Link copiado pra área de transferência!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <RecipeContainer>
      <AboveLine onClick={() => navigate(`/recipes/${recipeId}`)}>
        <Top>
          <img src={recipe.image} alt={recipe.title} />
          <h2>{recipe.title}</h2>
        </Top>
        <Middle>
          <p>⏲️ {recipe.time} minutos</p>
          <p>{recipe.portions} porções</p>
        </Middle>
      </AboveLine>
      <Line />
      <Bottom>
        <Image
          $isLiked={isLiked}
          src={isLiked ? fullHeart : emptyHeart}
          onClick={like}
          alt={isLiked ? 'Descurtir receita' : 'Curtir receita'}
        />

        <img
          src={link}
          onClick={copyShareLink}
          alt="Copiar link da receita"
        />
      </Bottom>
    </RecipeContainer>
  );
}

const RecipeContainer = styled.article`
  font-family: ${fontFamilyPrimary};
  width: 90vw;
  max-width: 450px;
  height: 230px;
  background-color: ${backgroundColor};
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 1px 2px 10px 1px ${boxShadowColor};
`;

const Top = styled.div`
  width: 90vw;
  height: 150px;
  max-width: 480px;

  display: flex;
  align-items: center;

  img {
    height: 117px;
    width: 100%;
    max-width: 208px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
    margin-left: 20px;
    box-shadow: 1px 1px 3px 1px ${boxShadowColor};
  }

  h2 {
    font-family: ${fontFamilySecondary};
    font-size: 42px;
    width: 150px;
    margin-right: 30px;
  }

  @media (max-width: 800px) {
    h2 {
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

  p {
    font-size: 26px;
    padding-bottom: 20px;
  }
`;

const Image = styled.img`
  height: ${(props) => (props.$isLiked ? '36px' : '30px')};
  width: ${(props) => (props.$isLiked ? '36px' : '30px')};
`;

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
    filter: ${imgFilter};
  }

  img:hover {
    transform: scale(1.3) rotate(0.015turn);
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${lineColor};
`;

const AboveLine = styled.div`
  width: 90vw;
  height: 190px;
  cursor: pointer;

  @media (min-width: 600px) {
    width: 450px;
  }
`;
