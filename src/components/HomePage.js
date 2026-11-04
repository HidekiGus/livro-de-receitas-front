import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import Header from './Header';
import Footer from './Footer';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { api, getAuthConfig } from '../services/api';

const LOADING_MESSAGES = [
  'Preparando receitas pra você',
  'Receitinhas chegando',
];

export default function HomePage() {
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadingMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
    return LOADING_MESSAGES[randomIndex];
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('/recipes', getAuthConfig());
        setRecipes(response.data);
      } catch (err) {
        setError(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível carregar as receitas!',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Header />
      <RecipesContainer>
        {loading ? (
          <WaitingScreen>
            <TailSpin
              height="80"
              width="80"
              color="#ff6600"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
            />
            <Loading>{loadingMessage}</Loading>
          </WaitingScreen>
        ) : error ? (
          <StatusMessage>
            Ops! Parece que as receitas não deram certo, atualize a página!
          </StatusMessage>
        ) : !recipes || recipes.length === 0 ? (
          <StatusMessage>Ainda não há receitas por aqui!</StatusMessage>
        ) : (
          recipes.map((recipe) => {
            const recipeId = recipe._id || recipe.id;
            return <RecipeCard recipe={recipe} key={recipeId} />;
          })
        )}
      </RecipesContainer>
      <Footer />
    </>
  );
}

const RecipesContainer = styled.main`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10vh;

  width: 100vw;
  height: fit-content;
  flex-wrap: wrap;
`;

const Loading = styled.p`
  margin-top: 80px;
  font-size: 35px;
  max-width: 80vw;
  text-align: center;
`;

const StatusMessage = styled.p`
  margin-top: 20vh;
  font-size: 30px;
  max-width: 80vw;
  text-align: center;
`;

const WaitingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25vh;
`;
