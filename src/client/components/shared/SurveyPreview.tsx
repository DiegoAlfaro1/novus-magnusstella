import React from 'react';
import { Pregunta } from '../../types';

interface SurveyPreviewProps {
  preguntas: Pregunta[];
  brandName: string;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ preguntas, brandName }) => {
  return (
    <div className="survey-preview">
      <div className="preview-header">
        <h3>Vista Previa del Correo</h3>
      </div>
      <div className="email-template">
        <div className="email-header">
          <h2>Encuesta de Satisfacción - {brandName}</h2>
          <p>¡Gracias por tu compra! Nos encantaría conocer tu opinión.</p>
        </div>

        <div className="email-body">
          {preguntas.length === 0 ? (
            <p className="empty-preview">No hay preguntas configuradas para mostrar.</p>
          ) : (
            preguntas.map((pregunta, index) => (
              <div key={pregunta.id} className="preview-question">
                <p className="question-text">
                  <strong>
                    {index + 1}. {pregunta.texto || '[Texto de la pregunta]'}
                  </strong>
                </p>

                {pregunta.tipo === 'abierta' && (
                  <textarea
                    className="preview-textarea"
                    placeholder="Escribe tu respuesta aquí..."
                    disabled
                  />
                )}

                {pregunta.tipo === 'cerrada' && (
                  <div className="preview-options">
                    {pregunta.opciones && pregunta.opciones.length > 0 ? (
                      pregunta.opciones.map((opcion) => (
                        <div key={opcion.id} className="preview-option">
                          <input type="radio" name={`q${pregunta.id}`} disabled />
                          <label>{opcion.texto || '[Opción]'}</label>
                        </div>
                      ))
                    ) : (
                      <p className="empty-options">No hay opciones configuradas</p>
                    )}
                  </div>
                )}

                {pregunta.tipo === 'checkbox' && (
                  <div className="preview-options">
                    {pregunta.opciones && pregunta.opciones.length > 0 ? (
                      pregunta.opciones.map((opcion) => (
                        <div key={opcion.id} className="preview-option">
                          <input type="checkbox" disabled />
                          <label>{opcion.texto || '[Opción]'}</label>
                        </div>
                      ))
                    ) : (
                      <p className="empty-options">No hay opciones configuradas</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="email-footer">
          <button className="preview-submit-btn" disabled>
            Enviar Respuestas
          </button>
          <p className="footer-text">Gracias por tu tiempo y retroalimentación.</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyPreview;
