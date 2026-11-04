import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import emptyHeart from '../assets/heart-outline.svg';
import fullHeart from '../assets/heart.svg';
import link from '../assets/link-outline.svg';

import Header from './Header';
import Footer from './Footer';

import frontUrl from '../utils/frontUrl.js';

export default function RecipePage() {
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState();
  const [recipeData, setRecipeData] = useState({});
  const backUrl = process.env.REACT_APP_BACK_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const token = getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${backUrl}/recipes/${id}`, config);
        setRecipeDataFromRes(res);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch recipe data!',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [id]);

  function getToken() {
    return localStorage.getItem('token');
  }

  function setRecipeDataFromRes(res) {
    setIsLiked(res.data.isLiked);
    setRecipeData(res.data);
  }

  async function like(e) {
    e.preventDefault();
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`${backUrl}/like/${recipeData.id}`, {}, config);
      setIsLiked(res.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to like the recipe!',
      });
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <RecipeContainer>
          <AboveLine onClick={() => navigate(`/recipes/${recipeData._id}`)}>
            <Top>
              <img src={recipeData.image} alt={recipeData.title} />
            </Top>
            <TopMiddle>
              <h1>{recipeData.title}</h1>
            </TopMiddle>
            <TopBottom>
              <h1>⏲️ {recipeData.time} minutos</h1>
              <h1>Rende: {recipeData.portions} porções</h1>
            </TopBottom>
            <BottomMiddle>
              <h1>🛒 Ingredientes</h1>
              {recipeData.ingredients === undefined ? (
                ''
              ) : (
                <ul>
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              <h1>🥣 Modo de preparo</h1>
              {recipeData.method === undefined ? (
                ''
              ) : (
                <ol>
                  {recipeData.method.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ol>
              )}
            </BottomMiddle>
          </AboveLine>
          <Line />
          <Bottom>
            {getToken() === null ? (
              ''
            ) : isLiked ? (
              <img src={fullHeart} onClick={like} alt="Liked" />
            ) : (
              <img src={emptyHeart} color="red" onClick={like} alt="Not Liked" />
            )}

            <img
              src={link}
              onClick={() => {
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Link copiado pra área de transferência!',
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigator.clipboard.writeText(
                  `${frontUrl}/recipes/${recipeData.id}`
                );
              }}
              alt="Copy Link"
            />
          </Bottom>
        </RecipeContainer>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh; //8vh from Footer + 2vh for spacing between last post and footer
`;

const RecipeContainer = styled.div`
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

  /* @media (min-width: 600px) {
    img {
      height: 120px;
      width: 200px;
    }
  } */
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
`

const TopBottom = styled.div`
  width: 90vw;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;

  padding: 10px 0;

  h1 {
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

  h1 {
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
    h1 {
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
