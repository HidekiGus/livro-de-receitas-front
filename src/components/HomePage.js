import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import frontUrl from '../utils/frontUrl.js';
import RecipeCard from './RecipeCard';
import Header from './Header';
import Footer from './Footer';
import { TailSpin } from 'react-loader-spinner';

export default function HomePage() {
  const token = localStorage.getItem('token');

  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);

  const backUrl = process.env.REACT_APP_BACK_URL;

  const navigate = useNavigate();

  const frases = ["Preparando receitas pra você", "Receitinhas chegando"];
  const aleatorio = Math.floor(Math.random() * frases.length);
  let fala = frases[aleatorio];

  useEffect(async () => {
    //if (token === null) {
    //  navigate('/');
    //}

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const promise = await axios.get(`${backUrl}/recipes`, config);
      setRecipes(promise.data);
      console.log(promise.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <RecipesContainer>
        {recipes === null && error === null ? (
        <WaitingScreen>            
            <TailSpin
            height="80"
            width="80"
            color="#ff6600"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
            <Loading>{fala}</Loading>
          </WaitingScreen>
        ) : recipes === null && error !== null ? (
          <h1>
            Ops! Parece que as receitas não deram certo, atualize a página!
          </h1>
        ) : recipes.length === 0 ? (
          <h1>Ainda não há receitas por aqui!</h1>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              key={index}
              onClick={() =>
                window.open(`${frontUrl}/recipes/${recipe._id}`, '_self')
              }
            />
          ))
        )}
      </RecipesContainer>
      <Footer />
    </>
  );
}

const RecipesContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10vh; //8vh from Footer + 2vh for spacing between last post and footer

  width: 100vw;
  height: fit-content;
  flex-wrap: wrap;
`;

const Loading = styled.h1`
  margin-top: 100px;
  font-size: 35px;
`

const WaitingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 250px;
`