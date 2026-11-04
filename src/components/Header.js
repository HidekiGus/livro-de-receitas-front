import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <h1 onClick={() => navigate('/')}>Livro de Receitas</h1>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100vw;
  height: 10vh;
  min-height: 60px;
  background: linear-gradient(to right, #ff6600, rgb(250, 69, 49), #ff6600);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.2);

  h1 {
    font-family: 'Patrick hand';
    font-size: 50px;
    color: black;
    cursor: pointer;
  }
`;
