import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Brand, User } from '../types';

const UsersPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
  const [user] = React.useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  return (
    <Layout titulo="Usuarios" user={user}>
      <div className="cat-search">
        <h2>Gestión de Usuarios</h2>
        <p>Esta página contendrá la funcionalidad de administración de usuarios.</p>
        <p>Marca actual: {marca}</p>
      </div>
    </Layout>
  );
};

export default UsersPage;
