import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';

import Header from './Header';
import Footer from './Footer';

import frontUrl from '../utils/frontUrl';
import { api, getAuthConfig, getToken } from '../services/api';

export default function RecipePage() {
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [recipeData, setRecipeData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const res = await api.get(`/recipes/${id}`, getAuthConfig());
        setIsLiked(Boolean(res.data?.isLiked));
        setRecipeData(res.data || {});
      } catch (_error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível carregar os dados da receita!',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  const recipeId = recipeData._id || recipeData.id || id;

  async function like(e) {
    e.preventDefault();
    try {
      const res = await api.post(`/like/${recipeId}`, {}, getAuthConfig());
      setIsLiked(Boolean(res.data));
    } catch (_error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não foi possível curtir a receita!',
      });
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(`${frontUrl}/recipes/${recipeId}`);
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Link copiado pra área de transferência!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <RecipeContainer>
          <AboveLine>
            <Top>
              <img src={recipeData.image} alt={recipeData.title} />
            </Top>
            <TopMiddle>
              <h1>{recipeData.title}</h1>
            </TopMiddle>
            <TopBottom>
              <p>⏲️ {recipeData.time} minutos</p>
              <p>Rende: {recipeData.portions} porções</p>
            </TopBottom>
            <BottomMiddle>
              <h2>🛒 Ingredientes</h2>
              {Array.isArray(recipeData.ingredients) && (
                <ul>
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li key={`${ingredient}-${index}`}>
                      {typeof ingredient === 'object'
                        ? ingredient.description
                        : ingredient}
                    </li>
                  ))}
                </ul>
              )}
              <h2>🥣 Modo de preparo</h2>
              {Array.isArray(recipeData.method) && (
                <ol>
                  {recipeData.method.map((step, index) => (
                    <li key={`${step}-${index}`}>
                      {typeof step === 'object' ? step.description : step}
                    </li>
                  ))}
                </ol>
              )}
            </BottomMiddle>
          </AboveLine>
          <Line />
          <Bottom>
            {getToken() !== null && (
              <img
                src={isLiked ? fullHeart : emptyHeart}
                onClick={like}
                alt={isLiked ? 'Receita curtida' : 'Curtir receita'}
              />
            )}

            <img
              src={link}
              onClick={copyLink}
              alt="Copiar link da receita"
            />
          </Bottom>
        </RecipeContainer>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.main`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
`;

const RecipeContainer = styled.article`
  font-family: 'Patrick hand';
  width: 90vw;
  height: fit-content;
  background-color: #0c7845;
  margin-top: 20px;
  border: 1px solid;
  border-radius: 8px;
`;

const Top = styled.div`
  width: 90vw;
  height: 30vh;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 90%;
    width: 90%;
    object-fit: cover;
    object-position: center;
    border: 1px solid black;
    border-radius: 8px;
  }
`;

const TopMiddle = styled.div`
  width: 90vw;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    padding: 10px;
    width: 90%;
    overflow-y: auto;
  }

  @media (min-width: 600px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const TopBottom = styled.div`
  width: 90vw;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;

  padding: 10px 0;

  p {
    font-size: 24px;
    font-weight: bold;
  }
`;

const BottomMiddle = styled.div`
  width: 90vw;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;

  padding-left: 20px;

  h2 {
    font-size: 40px;
    padding: 15px 0 15px 10px;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
  }

  ol {
    list-style-type: decimal;
    list-style-position: inside;
    padding-bottom: 20px;
  }

  li {
    font-size: 30px;
    padding-bottom: 10px;
    max-width: 80vw;
  }

  @media (min-width: 600px) {
    h2 {
      padding-bottom: 40px;
    }

    ol {
      padding-bottom: 40px;
    }

    ul {
      padding-bottom: 40px;
    }

    li {
      padding-bottom: 15px;
    }
  }
`;

const Bottom = styled.div`
  width: 90vw;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    height: 30px;
    cursor: pointer;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
`;

const AboveLine = styled.div`
  width: 90vw;
  height: fit-content;
`;
