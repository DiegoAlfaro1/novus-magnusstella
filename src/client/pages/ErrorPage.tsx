import React from 'react';
import { useParams } from 'react-router-dom';

interface ErrorPageProps {
  code: '403' | '404';
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code }) => {
  const messages = {
    '403': {
      title: 'Acceso Prohibido',
      message: 'No tienes permisos para acceder a esta página.',
    },
    '404': {
      title: 'Página No Encontrada',
      message: 'La página que buscas no existe.',
    },
  };

  return (
    <div className="error-page">
      <h1>{code}</h1>
      <h2>{messages[code].title}</h2>
      <p>{messages[code].message}</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
};

export default ErrorPage;
