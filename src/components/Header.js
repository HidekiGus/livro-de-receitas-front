import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <h1>Livro de Receitas</h1>
      </HeaderContainer>
      <Line />
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: #0c7845;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Patrick hand';
    font-size: 50px;
    color: black;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
`;
