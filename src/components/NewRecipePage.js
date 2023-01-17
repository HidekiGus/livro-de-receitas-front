import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Swal from 'sweetalert2';
import backUrl from '../utils/backUrl.js';

export default function NewRecipePage() {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipePortions, setRecipePortions] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeMethod, setRecipeMethod] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  function cancelRecipe() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Quer cancelar a criação da receita?',
      showCancelButton: true,
      confirmButtonText: 'Sim, pode cancelar.',
      denyButtonText: 'Não cancela, vou terminar agora!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/home');
      } else if (result.isDenied) {
        setIsDisabled(false);
      }
    });
  }

  function createRecipe() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Confirma a criação da receita?',
      showCancelButton: true,
      confirmButtonText: 'Confirmo! Pode criar!',
      denyButtonText: 'Cancela, ainda não terminei!',
    }).then((result) => {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (result.isConfirmed) {
        const promise = axios.post(
          `${backUrl}/recipes`,
          {
            title: recipeTitle,
            image: recipeImage,
            portions: recipePortions,
            time: recipeTime,
            ingredients: recipeIngredients,
            method: recipeMethod,
          },
          config
        );

        promise
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Receita criada com sucesso!',
              showConfirmButton: false,
              timer: 1800,
            });
            navigate('/home');
          })
          .catch(() =>
            Swal.fire({
              position: 'center',
              icon: 'error',
              title:
                'Algo deu errado! Confira os dados da receita e tente novamente!',
              showConfirmButton: false,
              timer: 2000,
            })
          );
      } else if (result.isDenied) {
        setIsDisabled(false);
      }
    });
  }

  return (
    <>
      <Header />
      <Title>📃 Criar nova receita</Title>
      <NewRecipeContainer>
        <TitleContainer>
          <h1>🔠 Título da receita</h1>
          <h2>Escolha um título que encha os olhos!</h2>
          <Input
            required
            type="text"
            disabled={isDisabled}
            placeholder="Ex: Bolo de chocolate com cobertura"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />
        </TitleContainer>
        <TimeContainer>
          <h1>⏲️ Duração</h1>
          <h2>Quanto tempo leva pra fazer a receita completa?</h2>
          <Input
            required
            type="number"
            disabled={isDisabled}
            placeholder="Coloque o número de minutos"
            value={recipeTime}
            onChange={(e) => setRecipeTime(e.target.value)}
          />
        </TimeContainer>
        <PortionsContainer>
          <h1>🍽️ Porções</h1>
          <h2>
            Quantas pessoas essa receita serve se cada um comer uma boa quantia?
          </h2>
          <Input
            required
            type="number"
            disabled={isDisabled}
            placeholder="Coloque o número de porções"
            value={recipePortions}
            onChange={(e) => setRecipePortions(e.target.value)}
          />
        </PortionsContainer>
        <ImageContainer>
          <h1>🖼️ Foto</h1>
          <h2>Escolha uma foto do melhor ângulo da sua receita!</h2>
          <Input
            required
            type="text"
            disabled={isDisabled}
            placeholder="Coloque o link da foto"
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
          />
        </ImageContainer>
        <IngredientsContainer>
          <h1>🛒 Ingredientes</h1>
          <h2>
            Deixe somente um ingrediente em cada linha, não precisa usar
            pontuação no final.
          </h2>
          <Textarea
            required
            type="text"
            disabled={isDisabled}
            placeholder="Coloque todos os ingredientes, um por linha"
            value={recipeIngredients}
            onChange={(e) => setRecipeIngredients(e.target.value)}
          />
        </IngredientsContainer>
        <MethodContainer>
          <h1>🍳 Modo de fazer</h1>
          <h2>
            Descreva como fazer sua receita, escreva todos os detalhes! Um passo
            por linha, não precisa usar pontuação no final.
          </h2>
          <Textarea
            required
            type="text"
            disabled={isDisabled}
            placeholder="Coloque todos os passos, um por linha"
            value={recipeMethod}
            onChange={(e) => setRecipeMethod(e.target.value)}
          />
        </MethodContainer>
        <ButtonsContainer>
          <CancelButton onClick={() => cancelRecipe()}>
            <h1>❌ Cancelar</h1>
          </CancelButton>
          <ConfirmButton onClick={() => createRecipe()}>
            <h1>✅ Criar receita</h1>
          </ConfirmButton>
        </ButtonsContainer>
      </NewRecipeContainer>
      <Footer />
    </>
  );
}

const Title = styled.h1`
  font-size: 40px;

  padding: 4vh 8vw;

  @media (min-width: 600px) {
    padding-left: 25vw;
  }
`;

const NewRecipeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10vh; //8vh from Footer + 2vh for spacing between last post and footer

  width: 100vw;
  height: fit-content;
`;

const TitleContainer = styled.div`
  width: 80vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 30px;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    color: grey;
    padding-bottom: 10px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const Input = styled.input`
  width: 90vw;
  height: 30px;

  border-radius: 8px;

  box-shadow: 0px 2px 4px gray;
  ::placeholder {
    color: gray;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const TimeContainer = styled.div`
  width: 90vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 30px;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    color: grey;
    padding-bottom: 10px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const PortionsContainer = styled.div`
  width: 90vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 30px;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    color: grey;
    padding-bottom: 10px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const ImageContainer = styled.div`
  width: 90vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 30px;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    color: grey;
    padding-bottom: 10px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const IngredientsContainer = styled.div`
  width: 90vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 30px;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    color: grey;
    padding-bottom: 10px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const MethodContainer = styled.div`
  width: 90vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    font-size: 30px;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    color: grey;
    padding-bottom: 10px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const Textarea = styled.textarea`
  width: 90vw;
  height: 90px;

  border-radius: 8px;

  border: 2px solid black;
  box-shadow: 0px 2px 4px gray;
  ::placeholder {
    color: gray;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const ButtonsContainer = styled.div`
  width: 90vw;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding-top: 30px;

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const CancelButton = styled.button`
  width: 48%;
  height: 50px;

  border: 1px solid black;
  border-radius: 8px;
  background-color: lightgray;

  opacity: 0.6;

  box-shadow: 0px 1px 3px gray;

  h1 {
    font-size: 20px;
  }
`;

const ConfirmButton = styled.button`
  width: 48%;
  height: 50px;

  border: 1px solid black;
  border-radius: 8px;
  background-color: #289e28;

  box-shadow: 0px 3px 4px gray;

  h1 {
    font-size: 20px;
  }
`;
