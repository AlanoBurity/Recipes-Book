import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/Context';
import logo from '../images/logo.png';
import './Login.css';

function Login() {
  const history = useHistory();
  const { email,
    setEmail,
    password,
    setPassword } = useContext(context);

  const handleChangeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const validateEmailAndPassword = () => {
    const passwordMinLength = 6;
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return !(filter.test(email) && password.length > passwordMinLength);
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    const inProgressRecipes = {
      cocktails: {
      },
      meals: {
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push('/foods');
  };

  return (
    <div className="loginPageBody">
      <div />
      <form className="formLogin">
        <img src={ logo } className="logo" alt="logo" />
        <input
          className="inputEmail"
          placeholder="Digite o Email"
          type="email"
          data-testid="email-input"
          onChange={ handleChangeEmail }
          value={ email }
        />
        <input
          className="inputPassword"
          placeholder="Digite a Senha"
          type="password"
          data-testid="password-input"
          onChange={ handleChangePassword }
          value={ password }
        />
        <button
          className="bttnLogin"
          type="button"
          data-testid="login-submit-btn"
          disabled={ validateEmailAndPassword() }
          onClick={ () => handleSubmit() }
        >
          Entrar

        </button>
      </form>
    </div>);
}

export default Login;
