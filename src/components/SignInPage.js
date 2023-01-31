import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const backUrl = process.env.REACT_APP_BACK_URL;

  function signIn(event) {
    event.preventDefault();

    setIsDisabled(true);

    const body = {
      email,
      password,
    };

    const promise = axios.post(`${backUrl}/login`, body);

    promise.then((response) => {
      const token = response.data;
      localStorage.setItem('token', token);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Login feito com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/home');
    });

    promise.catch(() => {
      setIsDisabled(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Confira os dados e tente novamente!',
        showConfirmButton: false,
        timer: 1800,
      });
    });
  }

  return (
    <Container>
      <h1>Livro de Receitas</h1>
      <form onSubmit={signIn}>
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
        <button type="submit" id="data-login">
          Login
        </button>
      </form>
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <SignUp id="data-login-to-signup">
          Primeira vez aqui? Cadastre-se!
        </SignUp>
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

const SignUp = styled.div`
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
