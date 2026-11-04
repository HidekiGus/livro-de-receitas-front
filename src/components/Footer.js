import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fullHeart from '../assets/heart.svg';
import house from '../assets/house.svg';
import plus from '../assets/plus.svg';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <Images>
        <img
          onClick={() => navigate('/recipes/new')}
          src={plus}
          alt="Criar nova receita"
        />
        <img
          onClick={() => navigate('/')}
          src={house}
          alt="Página inicial"
        />
        <img
          onClick={() => navigate('/liked')}
          src={fullHeart}
          alt="Receitas curtidas"
        />
      </Images>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 90vw;
  height: 8vh;
  background-color: #ff6600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50px;

  position: fixed;
  bottom: 15px;
  left: 5vw;

  img {
    width: 5vh;
    cursor: pointer;
  }
`;

const Images = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
