import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HelpCard from '../components/shared/HelpCard';
import HelpSection from '../components/shared/HelpSection';
import { Brand, User, HelpTopic } from '../types';
import '../styles/ayuda.css';

const helpTopics: HelpTopic[] = [
  {
    id: 'login',
    titulo: 'Inicio de Sesión',
    descripcion: 'Aprende cómo acceder al sistema y recuperar tu contraseña',
    icono: '🔐',
  },
  {
    id: 'dashboard',
    titulo: 'Panel de Control',
    descripcion: 'Entiende las métricas y gráficos del dashboard',
    icono: '📊',
  },
  {
    id: 'resenas',
    titulo: 'Gestión de Reseñas',
    descripcion: 'Cómo ver, filtrar y administrar las reseñas de clientes',
    icono: '⭐',
  },
  {
    id: 'correos',
    titulo: 'Configuración de Correos',
    descripcion: 'Configura las encuestas y plantillas de correo electrónico',
    icono: '📧',
  },
  {
    id: 'usuarios',
    titulo: 'Administración de Usuarios',
    descripcion: 'Gestiona usuarios, permisos y ve el historial de cambios',
    icono: '👥',
  },
  {
    id: 'general',
    titulo: 'Ayuda General',
    descripcion: 'Información general sobre el sistema y preguntas frecuentes',
    icono: '❓',
  },
];

const HelpPage: React.FC = () => {
  const { marca, topic } = useParams<{ marca: Brand; topic?: string }>();
  const [user] = React.useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  const currentTopic = helpTopics.find((t) => t.id === topic);

  const renderTopicContent = () => {
    if (!topic || !currentTopic) {
      return (
        <div className="help-hub">
          <div className="help-header">
            <h1>Centro de Ayuda</h1>
            <p>Selecciona un tema para obtener más información</p>
          </div>
          <div className="help-cards-grid">
            {helpTopics.map((helpTopic) => (
              <HelpCard key={helpTopic.id} topic={helpTopic} brand={marca!} />
            ))}
          </div>
        </div>
      );
    }

    const content = getTopicContent(topic);
    return <HelpSection title={currentTopic.titulo} content={content} />;
  };

  return (
    <Layout titulo="Ayuda" user={user}>
      <div className="ayuda-container">{renderTopicContent()}</div>
    </Layout>
  );
};

const getTopicContent = (topic: string): React.ReactNode => {
  switch (topic) {
    case 'login':
      return (
        <div>
          <h3>Acceso al Sistema</h3>
          <p>
            Para acceder al sistema, ingresa tu correo electrónico y contraseña en la página de inicio de
            sesión.
          </p>
          <h3>Recuperar Contraseña</h3>
          <p>
            Si olvidaste tu contraseña, haz clic en "¿Olvidaste tu contraseña?" en la página de inicio de
            sesión y sigue las instrucciones.
          </p>
          <h3>Permisos</h3>
          <p>
            El acceso al sistema está controlado por permisos. Contacta a un administrador si necesitas
            permisos adicionales.
          </p>
        </div>
      );
    case 'dashboard':
      return (
        <div>
          <h3>Vista General</h3>
          <p>
            El panel de control muestra métricas clave sobre las reseñas y encuestas de tus clientes.
          </p>
          <h3>Gráficos Disponibles</h3>
          <ul>
            <li>
              <strong>Promedio de Puntajes:</strong> Muestra la evolución del promedio de calificaciones a lo
              largo del tiempo.
            </li>
            <li>
              <strong>Tasa de Respuesta:</strong> Porcentaje de encuestas respondidas.
            </li>
            <li>
              <strong>Encuestas Enviadas:</strong> Cantidad total de encuestas enviadas por mes.
            </li>
            <li>
              <strong>Distribución por Calificación:</strong> Cantidad de reseñas por cada nivel de
              estrellas.
            </li>
          </ul>
          <h3>Filtros</h3>
          <p>
            Utiliza los filtros para ver datos específicos por producto, categoría o rango de fechas.
          </p>
        </div>
      );
    case 'resenas':
      return (
        <div>
          <h3>Ver Reseñas</h3>
          <p>
            Las reseñas se muestran en tarjetas con información clave: producto, calificación, fecha y
            descripción.
          </p>
          <h3>Filtrar Reseñas</h3>
          <p>
            Usa el botón de filtros para buscar por producto, categoría, rango de fechas o calificación.
          </p>
          <h3>Visibilidad</h3>
          <p>
            Puedes cambiar la visibilidad de una reseña para ocultar o mostrar en el sitio web. Esto no
            elimina la reseña del sistema.
          </p>
          <h3>Ver Detalle</h3>
          <p>
            Haz clic en el título de cualquier reseña para ver el detalle completo, incluyendo las respuestas
            a todas las preguntas de la encuesta.
          </p>
        </div>
      );
    case 'correos':
      return (
        <div>
          <h3>Configuración de Encuestas</h3>
          <p>
            En esta sección puedes crear y editar las preguntas que se enviarán a los clientes por correo
            electrónico.
          </p>
          <h3>Tipos de Preguntas</h3>
          <ul>
            <li>
              <strong>Cerradas:</strong> Preguntas con opciones de respuesta predefinidas (una sola
              selección).
            </li>
            <li>
              <strong>Abiertas:</strong> Preguntas donde el cliente puede escribir texto libre.
            </li>
            <li>
              <strong>Checkbox:</strong> Preguntas con opciones múltiples (varias selecciones).
            </li>
          </ul>
          <h3>Vista Previa</h3>
          <p>
            La vista previa muestra cómo se verá el correo electrónico que recibirán los clientes con todas
            las preguntas configuradas.
          </p>
        </div>
      );
    case 'usuarios':
      return (
        <div>
          <h3>Gestión de Usuarios</h3>
          <p>
            En esta sección puedes ver todos los usuarios del sistema, crear nuevos usuarios y editar los
            existentes.
          </p>
          <h3>Crear Usuario</h3>
          <p>
            Haz clic en el botón "Crear Usuario" para agregar un nuevo usuario al sistema. Deberás completar
            el formulario con la información requerida.
          </p>
          <h3>Editar Usuario</h3>
          <p>
            Haz clic en el botón de editar en la fila del usuario para modificar su información o permisos.
          </p>
          <h3>Permisos</h3>
          <p>Los permisos disponibles son:</p>
          <ul>
            <li>
              <strong>Ver:</strong> Permite visualizar información.
            </li>
            <li>
              <strong>Editar:</strong> Permite modificar información.
            </li>
            <li>
              <strong>Administración:</strong> Acceso completo para gestionar usuarios y configuraciones.
            </li>
          </ul>
          <h3>Historial de Cambios</h3>
          <p>
            Puedes ver un registro detallado de todos los cambios realizados a los usuarios en la sección de
            historial.
          </p>
        </div>
      );
    case 'general':
      return (
        <div>
          <h3>Preguntas Frecuentes</h3>
          <p>
            <strong>¿Cómo cambio mi marca?</strong>
            <br />
            Usa el selector de marca en la barra lateral para cambiar entre diferentes marcas.
          </p>
          <p>
            <strong>¿Con qué frecuencia se actualizan los datos?</strong>
            <br />
            Los datos se actualizan en tiempo real cuando hay nuevas reseñas o respuestas.
          </p>
          <p>
            <strong>¿Puedo exportar los datos?</strong>
            <br />
            Actualmente no hay función de exportación, pero se agregará en futuras versiones.
          </p>
          <h3>Soporte Técnico</h3>
          <p>
            Si tienes problemas técnicos o preguntas que no se cubren en esta documentación, contacta al
            equipo de soporte.
          </p>
        </div>
      );
    default:
      return <p>Contenido no disponible para este tema.</p>;
  }
};

export default HelpPage;
