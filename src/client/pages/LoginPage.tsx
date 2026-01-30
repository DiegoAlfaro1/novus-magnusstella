import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/shared/PasswordInput';
import '../styles/login_syles.css';

const LoginPage: React.FC = () => {
  const [error] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
  };

  const handleEnterApp = () => {
    // TODO: Remove in production - this is for demo/development only
    // Navigate to dashboard with default brand
    navigate('/graphics/dashboard/LU1');
  };

  return (
    <div className="login-page-container">
      <div className="title-web-app">
        <h1>MagnusStellaCore</h1>
      </div>
      <div className="login-box box">
        <div className="login-title title">
          <h4>Log-In</h4>
        </div>
        {error && (
          <div className="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="credential-input">
            <label htmlFor="name">Nombre de usuario:</label>
            <input
              type="email"
              name="name"
              id="username"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="credential-input">
            <label htmlFor="password">Contraseña:</label>
            <PasswordInput
              name="password"
              id="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="ingresar-btn">
            <button type="submit" className="btn">
              Ingresar
            </button>
          </div>
          <div className="demo-access">
            <p>O accede a la demo:</p>
            <button type="button" className="btn demo-btn" onClick={handleEnterApp}>
              Entrar a la Aplicación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
