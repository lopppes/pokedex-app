import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/user.slice';
import profoaklogin from '../images/profoaklogin.png';

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    updateButtonAndInput();
  }, [inputValue]);

  const updateButtonAndInput = () => {
    const loginButton = document.getElementById('login-button');
    const loginInput = document.getElementById('login-input');

    if (inputValue.trim()) {
      loginButton?.classList.add('active-login-button');
      loginButton?.removeAttribute('disabled');
      loginInput?.classList.add('active-login-input');
    } else {
      loginButton?.classList.remove('active-login-button');
      loginButton?.setAttribute('disabled', 'disabled');
      loginInput?.classList.remove('active-login-input');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      dispatch(updateUser(trimmedValue));
      navigate('/pokedex');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
      <p>ユキナリ</p>
      <h1>Professor Oak</h1>
      <p>Aah, Olá! sou um pesquisador Pokémon.</p>
      <p>E você, qual é o seu nome?</p>
        <form onSubmit={handleSubmit}>
          <input
            className='input-login'
            type="text"
            placeholder='Nome:'
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            id='login-input'
          />
          <button className='button-login' id='login-button' disabled>
            <i className='bx bxs-right-arrow'></i>
          </button>
        </form>
      </div>
      <img src={profoaklogin} alt="Professor Oak" />
    </div>
  );
};

export default Login;
