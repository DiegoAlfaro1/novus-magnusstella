import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import QuestionEditor from '../components/shared/QuestionEditor';
import SurveyPreview from '../components/shared/SurveyPreview';
import { Brand, User, Pregunta } from '../types';
import '../styles/correos.css';

const mockPreguntas: Pregunta[] = [
  {
    id: 1,
    texto: '¿Qué tan satisfecho estás con tu compra?',
    tipo: 'cerrada',
    orden: 1,
    opciones: [
      { id: 1, pregunta_id: 1, texto: 'Muy satisfecho', orden: 1 },
      { id: 2, pregunta_id: 1, texto: 'Satisfecho', orden: 2 },
      { id: 3, pregunta_id: 1, texto: 'Neutral', orden: 3 },
      { id: 4, pregunta_id: 1, texto: 'Insatisfecho', orden: 4 },
      { id: 5, pregunta_id: 1, texto: 'Muy insatisfecho', orden: 5 },
    ],
  },
  {
    id: 2,
    texto: '¿Qué aspectos te gustaron más? (selecciona todos los que apliquen)',
    tipo: 'checkbox',
    orden: 2,
    opciones: [
      { id: 6, pregunta_id: 2, texto: 'Calidad del producto', orden: 1 },
      { id: 7, pregunta_id: 2, texto: 'Precio', orden: 2 },
      { id: 8, pregunta_id: 2, texto: 'Servicio al cliente', orden: 3 },
      { id: 9, pregunta_id: 2, texto: 'Tiempo de entrega', orden: 4 },
    ],
  },
  {
    id: 3,
    texto: '¿Tienes algún comentario adicional?',
    tipo: 'abierta',
    orden: 3,
  },
];

const EmailsPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
  const [preguntas, setPreguntas] = useState<Pregunta[]>(mockPreguntas);
  const [user] = useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  const handleSave = () => {
    alert('Encuesta guardada exitosamente (mock)');
  };

  const getBrandName = (brand: Brand): string => {
    const names: Record<Brand, string> = {
      LU1: 'Luna',
      NO1: 'Nova',
      MA1: 'Magnus',
    };
    return names[brand];
  };

  return (
    <Layout titulo="Correos" user={user}>
      <div className="correos-container">
        <div className="correos-header">
          <h2>Configuración de Correos y Encuestas</h2>
          <button onClick={handleSave} className="ingresar-btn">
            Guardar Cambios
          </button>
        </div>

        <div className="two-column-layout">
          <div className="editor-column">
            <QuestionEditor preguntas={preguntas} onUpdate={setPreguntas} />
          </div>

          <div className="preview-column">
            <SurveyPreview preguntas={preguntas} brandName={getBrandName(marca!)} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailsPage;
