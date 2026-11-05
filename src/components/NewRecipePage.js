import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Swal from 'sweetalert2';
import { api, getAuthConfig } from '../services/api';

export default function NewRecipePage() {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipePortions, setRecipePortions] = useState('');
  // const [recipeImage, setRecipeImage] = useState('');
  const [recipeImageFile, setRecipeImageFile] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeMethod, setRecipeMethod] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  function cancelRecipe() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Quer cancelar a criação da receita?',
      showCancelButton: true,
      confirmButtonText: 'Sim, pode cancelar.',
      cancelButtonText: 'Não cancela, vou terminar agora!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      } else {
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
      cancelButtonText: 'Cancela, ainda não terminei!',
    }).then(async (result) => {
      if (!result.isConfirmed) {
        setIsDisabled(false);
        return;
      }

      setIsDisabled(true);
      try {
        if (!recipeImageFile) {
          throw new Error('Selecione um arquivo de imagem para a receita.');
        }

        /*
        await api.post(
          '/recipes',
          {
            title: recipeTitle,
            image: recipeImage,
            portions: Number(recipePortions),
            time: Number(recipeTime),
            ingredients: recipeIngredients,
            method: recipeMethod,
          },
          getAuthConfig()
        );
        */

        const formData = new FormData();
        formData.append('title', recipeTitle);
        formData.append('image', recipeImageFile);
        formData.append('portions', String(Number(recipePortions)));
        formData.append('time', String(Number(recipeTime)));
        formData.append('ingredients', recipeIngredients);
        formData.append('method', recipeMethod);

        await api.post('/recipes', formData, getAuthConfig());

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Receita criada com sucesso!',
          showConfirmButton: false,
          timer: 1800,
        });
        navigate('/');
      } catch (_error) {
        setIsDisabled(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title:
            'Algo deu errado! Confira os dados da receita e tente novamente!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  return (
    <>
      <Header />
      <Title>📃 Criar nova receita</Title>
      <NewRecipeContainer>
        <FieldContainer>
          <label htmlFor="recipe-title">🔠 Título da receita</label>
          <p>Escolha um título que encha os olhos!</p>
          <Input
            id="recipe-title"
            required
            type="text"
            disabled={isDisabled}
            placeholder="Ex: Bolo de chocolate com cobertura"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />
        </FieldContainer>

        <FieldContainer>
          <label htmlFor="recipe-time">⏲️ Duração</label>
          <p>Quanto tempo leva pra fazer a receita completa?</p>
          <Input
            id="recipe-time"
            required
            type="number"
            disabled={isDisabled}
            placeholder="Coloque o número de minutos"
            value={recipeTime}
            onChange={(e) => setRecipeTime(e.target.value)}
          />
        </FieldContainer>

        <FieldContainer>
          <label htmlFor="recipe-portions">🍽️ Porções</label>
          <p>
            Quantas pessoas essa receita serve se cada um comer uma boa quantia?
          </p>
          <Input
            id="recipe-portions"
            required
            type="number"
            disabled={isDisabled}
            placeholder="Coloque o número de porções"
            value={recipePortions}
            onChange={(e) => setRecipePortions(e.target.value)}
          />
        </FieldContainer>

        <FieldContainer>
          <label htmlFor="recipe-image">🖼️ Foto</label>
          <p>Escolha uma foto da sua receita (será ajustada automaticamente para 720x480)!</p>
          {/*
          <Input
            id="recipe-image"
            required
            type="url"
            disabled={isDisabled}
            placeholder="Coloque o link da foto"
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
          />
          */}
          <FileInput
            id="recipe-image"
            required
            type="file"
            accept="image/*"
            disabled={isDisabled}
            onChange={(e) =>
              setRecipeImageFile(
                e.target.files && e.target.files[0] ? e.target.files[0] : null
              )
            }
          />
        </FieldContainer>

        <FieldContainer>
          <label htmlFor="recipe-ingredients">🛒 Ingredientes</label>
          <p>
            Deixe somente um ingrediente em cada linha, não precisa usar
            pontuação no final.
          </p>
          <Textarea
            id="recipe-ingredients"
            required
            disabled={isDisabled}
            placeholder="Coloque todos os ingredientes, um por linha"
            value={recipeIngredients}
            onChange={(e) => setRecipeIngredients(e.target.value)}
          />
        </FieldContainer>

        <FieldContainer>
          <label htmlFor="recipe-method">🍳 Modo de fazer</label>
          <p>
            Descreva como fazer sua receita, escreva todos os detalhes! Um passo
            por linha, não precisa usar pontuação no final.
          </p>
          <Textarea
            id="recipe-method"
            required
            disabled={isDisabled}
            placeholder="Coloque todos os passos, um por linha"
            value={recipeMethod}
            onChange={(e) => setRecipeMethod(e.target.value)}
          />
        </FieldContainer>

        <ButtonsContainer>
          <CancelButton type="button" onClick={cancelRecipe}>
            ❌ Cancelar
          </CancelButton>
          <ConfirmButton type="button" onClick={createRecipe}>
            ✅ Criar receita
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

const NewRecipeContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10vh;

  width: 100vw;
  height: fit-content;
`;

const FieldContainer = styled.div`
  width: 90vw;
  height: fit-content;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 30px;
    padding-bottom: 10px;
  }

  p {
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

const FileInput = styled.input`
  width: 90vw;
  padding: 6px;
  border-radius: 8px;
  border: 2px solid black;
  background-color: white;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;

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
  font-size: 20px;
  font-family: inherit;
  cursor: pointer;

  border: 1px solid black;
  border-radius: 8px;
  background-color: lightgray;
  opacity: 0.6;
  box-shadow: 0px 1px 3px gray;
`;

const ConfirmButton = styled.button`
  width: 48%;
  height: 50px;
  font-size: 20px;
  font-family: inherit;
  cursor: pointer;

  border: 1px solid black;
  border-radius: 8px;
  background-color: #289e28;
  box-shadow: 0px 3px 4px gray;
`;
