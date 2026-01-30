import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Brand, User } from '../types';

const EmailsPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
  const [user] = React.useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  return (
    <Layout titulo="Correos" user={user}>
      <div className="cat-search">
        <h2>Gestión de Correos</h2>
        <p>Esta página contendrá la funcionalidad de gestión de correos electrónicos.</p>
        <p>Marca actual: {marca}</p>
      </div>
    </Layout>
  );
};

export default EmailsPage;
