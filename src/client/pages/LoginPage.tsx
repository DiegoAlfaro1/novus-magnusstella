import React, { useState } from 'react';
import PasswordInput from '../components/shared/PasswordInput';
import '../styles/login_syles.css';

const LoginPage: React.FC = () => {
  const [error] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
  };

  return (
    <div>
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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
