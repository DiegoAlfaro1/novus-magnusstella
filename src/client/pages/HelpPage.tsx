import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Brand, User } from '../types';
import '../styles/ayuda.css';

const HelpPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
  const [user] = React.useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  return (
    <Layout titulo="Ayuda" user={user}>
      <div className="cat-search">
        <h2>Centro de Ayuda</h2>
        <p>Esta página contendrá la documentación y ayuda para los usuarios.</p>
        <p>Marca actual: {marca}</p>
      </div>
    </Layout>
  );
};

export default HelpPage;
