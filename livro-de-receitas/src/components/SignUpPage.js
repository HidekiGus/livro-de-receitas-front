import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  function signUp(event) {
    event.preventDefault();

    setIsDisabled(true);

    const body = {
      name,
      email,
      password,
      confirmPassword,
    };

    const promise = axios.post('http://localhost:4000/signup', body);

    promise.then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Prontinho! Cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate('/');
    });

    promise.catch((error) => {
      setIsDisabled(false);
      if (error.response.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'As senhas não são iguais!',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (error.response.status === 409) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Este email já está sendo usado!',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (error.response.status === 422) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Confira os dados e tente novamente!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  return (
    <Container>
      <h1>Livro de Receitas</h1>
      <form onSubmit={signUp}>
        <input
          required
          type="text"
          disabled={isDisabled}
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="text"
          disabled={isDisabled}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          disabled={isDisabled}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="password"
          disabled={isDisabled}
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Login>Já tem uma conta? Faça login!</Login>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0ea960;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  h1 {
    font-family: 'Patrick Hand';
    font-size: 70px;
    font-weight: 400;
    color: #ffffff;
    padding-bottom: 5vh;
    padding-top: 25vh;
    @media (max-width: 450px) {
      font-size: 12vw;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 70vw;
    height: 8vh;

    border: 1px solid #d4d4d4;
    border-radius: 8px;
    font-family: 'Patrick Hand';
    font-weight: 400;
    font-size: 26px;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 10px;

    @media (min-width: 600px) {
      width: 500px;
    }

    ::placeholder {
      color: #000000;
    }
  }

  button {
    width: 70vw;
    height: 7vh;
    border-radius: 8px;
    border: 1px solid #0c7845;
    background-color: #0c7845;
    font-family: 'Patrick Hand';
    font-weight: 700;
    font-size: 25px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 600px) {
      width: 500px;
      font-size: 40px;
      padding-bottom: 10px;
    }
  }
`;

const Login = styled.div`
  font-family: 'Patrick Hand';
  font-weight: 400;
  font-size: 22px;
  text-align: center;
  color: #ffffff;
  margin-top: 5vh;

  @media (min-width: 600px) {
    font-size: 30px;
  }
`;
