import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FilterModal from '../components/shared/FilterModal';
import { Brand, User, DashboardData } from '../types';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

const DashboardPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
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
        </div>

        <div className="top-graficas">
          <div id="promedio-mes-div" className="graphContainer">
            <Line data={dashboardData.promedioPuntajes} />
          </div>

          <div id="tasaContestacion" className="graphContainer">
            <Line data={dashboardData.tasaDeRespuesta} />
          </div>
        </div>

        <div className="bottom-graficas">
          <div id="respuesta-enviada-div" className="graphContainer">
            <Bar data={dashboardData.encuestasEnviadas} />
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
      </div>
    </Layout>
  );
};

export default DashboardPage;
