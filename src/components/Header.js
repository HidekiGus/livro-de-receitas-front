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
  background: linear-gradient(to right, #FF6600, #e6e6e6, #FF6600 );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.2);

  h1 {
    font-family: 'Patrick hand';
    font-size: 50px;
    color: black;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
`;
