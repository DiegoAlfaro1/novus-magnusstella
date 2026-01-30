import React from 'react';

interface SurveyResultPageProps {
  type: 'exitosa' | 'repetida';
}

const SurveyResultPage: React.FC<SurveyResultPageProps> = ({ type }) => {
  const messages = {
    exitosa: {
      title: '¡Gracias por tu opinión!',
      message: 'Tu encuesta ha sido registrada exitosamente.',
    },
    repetida: {
      title: 'Encuesta ya registrada',
      message: 'Ya habías completado esta encuesta anteriormente.',
    },
  };

  return (
    <div className="survey-result">
      <h1>{messages[type].title}</h1>
      <p>{messages[type].message}</p>
    </div>
  );
};

export default SurveyResultPage;
