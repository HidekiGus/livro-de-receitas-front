import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import frontUrl from '../utils/frontUrl.js';
import RecipeCard from './RecipeCard';
import Header from './Header';
import Footer from './Footer';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';

export default function HomePage() {
  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const backUrl = process.env.REACT_APP_BACK_URL;
  const navigate = useNavigate();

  const frases = ["Preparando receitas pra você", "Receitinhas chegando"];
  const aleatorio = Math.floor(Math.random() * frases.length);
  let fala = frases[aleatorio];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const promise = await axios.get(`${backUrl}/recipes`, config);
        setRecipes(promise.data);
      } catch (error) {
        setError(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch recipes!',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [backUrl]);

  function getToken() {
    return localStorage.getItem('token');
  }


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
        ) : error ? (
          <h1>Ops! Parece que as receitas não deram certo, atualize a página!</h1>
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
  margin-bottom: 2vh; //8vh from Footer + 2vh for spacing between last post and footer

  width: 100vw;
  height: fit-content;
  flex-wrap: wrap;
`;

const Loading = styled.h1`
  margin-top: 80px;
  font-size: 35px;
  max-width: 80vw;
  text-align: center;
`

const WaitingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25vh;
`