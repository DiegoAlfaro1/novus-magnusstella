import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DataTable, { Column } from '../components/shared/DataTable';
import { Brand, User, HistorialUsuario } from '../types';
import { Bar } from 'react-chartjs-2';
import '../styles/usuarios.css';

const mockHistorial: HistorialUsuario[] = [
  {
    id: 1,
    usuario_id: 1,
    accion: 'Usuario creado',
    fecha: '2024-01-15 10:30:00',
    usuario_modificador: 'Admin',
  },
  {
    id: 2,
    usuario_id: 1,
    accion: 'Permisos actualizados',
    fecha: '2024-01-20 14:15:00',
    usuario_modificador: 'Admin',
  },
  {
    id: 3,
    usuario_id: 2,
    accion: 'Usuario creado',
    fecha: '2024-01-10 09:00:00',
    usuario_modificador: 'Admin',
  },
  {
    id: 4,
    usuario_id: 3,
    accion: 'Usuario creado',
    fecha: '2024-01-08 16:45:00',
    usuario_modificador: 'Admin',
  },
  {
    id: 5,
    usuario_id: 3,
    accion: 'Estado cambiado a inactivo',
    fecha: '2024-01-25 11:20:00',
    usuario_modificador: 'Admin',
  },
];

const userActivityData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Usuarios Creados',
      data: [3, 5, 2, 4, 6, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Usuarios Modificados',
      data: [2, 3, 4, 2, 3, 5],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ],
};

const UserChangeLogPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
  const [historial] = useState<HistorialUsuario[]>(mockHistorial);
  const [user] = useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  const columns: Column<HistorialUsuario>[] = [
    { key: 'id', header: 'ID' },
    { key: 'usuario_id', header: 'ID Usuario' },
    { key: 'accion', header: 'Acción' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'usuario_modificador', header: 'Modificado por' },
  ];

  return (
    <Layout titulo="Historial de Usuarios" user={user}>
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h2>Historial de Cambios de Usuarios</h2>
          <Link to={`/usuarios/1/${marca}`} className="btn-secondary">
            Volver a Usuarios
          </Link>
        </div>

        <div className="dashboard-graphs-row">
          <div className="graphContainer" style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
            <h3>Actividad de Usuarios</h3>
            <Bar data={userActivityData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>

        <DataTable data={historial} columns={columns} />
      </div>
    </Layout>
  );
};

export default UserChangeLogPage;
