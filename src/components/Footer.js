import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import fullHeart from '../assets/heart.svg';
import house from '../assets/house.svg';
import plus from '../assets/plus.svg';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <FooterContainer>
        <Line />
        <Images>
          <img onClick={() => navigate('/recipes/new')} src={plus} />
          <img onClick={() => navigate('/home')} src={house} />
          <img onClick={() => navigate('/liked')} src={fullHeart} />
        </Images>
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.div`
  width: 100vw;
  height: 8vh;
  background-color: #0c7845;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: fixed;
  bottom: 0;

  img {
    width: 5vh;
    transform: ;
  }

  img:hover {

  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  position: absolute;
  top: 0;
`;

const Images = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
