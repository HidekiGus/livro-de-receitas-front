import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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

    const promise = axios.post("http://localhost:4000/signup", body);

    promise.then(() => navigate("/"));

    promise.catch((error) => {
      setIsDisabled(false);
      if (error.response.status === 400) {
        alert("As senhas não são iguais!");
      } else if (error.response.status === 409) {
        alert("Este email já está sendo usado!");
      } else if (error.response.status === 422) {
        alert("Confira os dados e tente novamente!");
      }
    });
  };

  return (
    <Container>
      <h1>Livro de Receitas</h1>
      <form onSubmit={signUp}>
        <input required type="text" disabled={isDisabled} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input required type="text" disabled={isDisabled} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" disabled={isDisabled} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input required type="password" disabled={isDisabled} placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/" style={{ textDecoration: "none" }} >
        <Login>Já tem uma conta? Faça login!</Login>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0EA960;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  h1 {
    font-family: 'Patrick Hand';
    font-size: 70px;
    font-weight: 400;
    color: #FFFFFF;
    padding-bottom: 5vh;
    padding-top: 25vh;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 80vw;
    height: 8vh;
    
    border: 1px solid #D4D4D4;
    border-radius: 8px;
    font-family: 'Patrick Hand';
    font-weight: 400;
    font-size: 26px;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 10px;

    ::placeholder {
      color: #000000;
    }
  }

  button {
    width: 80vw;
    height: 7vh;
    border-radius: 8px;
    border: 1px solid #0B8049;
    background-color: #0B8049;
    font-family: 'Patrick Hand';
    font-weight: 700;
    font-size: 25px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Login = styled.div`
    font-family: 'Patrick Hand';
    font-weight: 400;
    font-size: 22px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 5vh;
`