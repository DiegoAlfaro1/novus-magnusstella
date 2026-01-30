import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FilterModal from '../components/shared/FilterModal';
import CategorySelector from '../components/shared/CategorySelector';
import { Brand, User, DashboardData } from '../types';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const mockDashboardData: DashboardData = {
  promedioPuntajes: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Promedio de Puntajes',
        data: [4.2, 4.5, 4.3, 4.6, 4.4, 4.7],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  },
  tasaDeRespuesta: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Tasa de Respuesta (%)',
        data: [65, 70, 68, 75, 72, 78],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  },
  encuestasEnviadas: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Encuestas Enviadas',
        data: [120, 150, 130, 180, 160, 200],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  },
  numAVGEstrella: 4.5,
  porcentaje: 90,
};

// Additional mock data for new charts
const reviewsByRating = {
  labels: ['5 Estrellas', '4 Estrellas', '3 Estrellas', '2 Estrellas', '1 Estrella'],
  datasets: [
    {
      label: 'Distribución de Reseñas',
      data: [145, 98, 45, 23, 12],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)',
      ],
    },
  ],
};

const topProducts = {
  labels: ['Colchón Premium', 'Almohada Gel', 'Base Ajustable', 'Protector', 'Sábanas'],
  datasets: [
    {
      label: 'Top 5 Productos',
      data: [89, 76, 65, 54, 48],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const customerSentiment = {
  labels: ['Positivo', 'Neutral', 'Negativo'],
  datasets: [
    {
      label: 'Sentimiento del Cliente',
      data: [243, 45, 35],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 99, 132, 0.8)',
      ],
    },
  ],
};

const monthlyGrowth = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Crecimiento Mensual (%)',
      data: [5, 12, 8, 15, 10, 18],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ],
};

const DashboardPage: React.FC = () => {
  const { marca, categoria } = useParams<{ marca: Brand; categoria?: string }>();
  const [dashboardData] = useState<DashboardData>(mockDashboardData);
  const [user] = useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  return (
    <Layout titulo="Dashboard" user={user}>
      <div className="graficas">
        <div className="cat-search">
          <FilterModal title="Filtros">
            <form>
              <div className="input-product">
                <div className="inputFilter">
                  <label htmlFor="producto">Buscar Producto</label>
                  <input
                    id="buscar"
                    name="producto"
                    className="input is-info"
                    type="text"
                    placeholder="Buscar Producto..."
                  />
                </div>

                <div className="inputFilter">
                  <label htmlFor="startDate">Fecha de inicio</label>
                  <input type="date" name="startDate" id="dateFilter" />
                </div>

                <div className="inputFilter">
                  <label htmlFor="endDate">Fecha final</label>
                  <input type="date" name="endDate" id="dateFilter" />
                </div>

                <button type="submit" className="ingresar-btn">
                  Filtrar
                </button>
              </div>
            </form>
          </FilterModal>

          <CategorySelector basePath="/graphics/dashboard" />

          {categoria && (
            <div className="cat-tittle">
              <h1>{categoria}</h1>
            </div>
          )}
        </div>

        <div className="top-graficas">
          <div id="promedio-mes-div" className="graphContainer">
            <Line data={dashboardData.promedioPuntajes} options={{ maintainAspectRatio: true }} />
          </div>

          <div id="tasaContestacion" className="graphContainer">
            <Line data={dashboardData.tasaDeRespuesta} options={{ maintainAspectRatio: true }} />
          </div>
        </div>

        <div className="bottom-graficas">
          <div id="respuesta-enviada-div" className="graphContainer">
            <Bar data={dashboardData.encuestasEnviadas} options={{ maintainAspectRatio: true }} />
          </div>

          <div id="promedioEstrellaNumero" className="graphContainer">
            <h3>Calificación promedio</h3>
            <div id="estrella-numero">
              <div id="divison">
                <img
                  src="/images/Estrella vacia 11.png"
                  className="avatar"
                  alt="Avatar"
                  id="estrella1"
                />
                <img
                  src="/images/Estrella reyena 11.png"
                  className="avatar"
                  alt="Avatar"
                  id="estrella2"
                  style={{ '--cut-value': `${dashboardData.porcentaje}%` } as React.CSSProperties}
                />
              </div>
              <h1>{dashboardData.numAVGEstrella}</h1>
            </div>
          </div>
        </div>

        <div className="additional-graficas">
          <div className="graphContainer">
            <h3>Distribución por Calificación</h3>
            <Doughnut data={reviewsByRating} options={{ maintainAspectRatio: true }} />
          </div>

          <div className="graphContainer">
            <h3>Top 5 Productos Más Reseñados</h3>
            <Bar data={topProducts} options={{ maintainAspectRatio: true, indexAxis: 'y' }} />
          </div>
        </div>

        <div className="additional-graficas">
          <div className="graphContainer">
            <h3>Sentimiento del Cliente</h3>
            <Pie data={customerSentiment} options={{ maintainAspectRatio: true }} />
          </div>

          <div className="graphContainer">
            <h3>Crecimiento de Reseñas</h3>
            <Bar data={monthlyGrowth} options={{ maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
