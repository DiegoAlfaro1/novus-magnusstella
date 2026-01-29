import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import StarRating from '../components/shared/StarRating';
import { Brand, User } from '../types';
import '../styles/resenas_completas.css';

const ReviewDetailPage: React.FC = () => {
  const { marca, id } = useParams<{ marca: Brand; id: string }>();
  const [user] = React.useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  const mockReview = {
    id: parseInt(id || '1'),
    title: 'Excelente producto',
    itemcode: 'PROD001',
    estrellas: 5,
    resena_descrip: 'Me encantó el producto, muy cómodo y de buena calidad. Lo recomiendo totalmente.',
    fecha: '2024-01-15',
    visibilidad: 1,
    cliente: 'Juan Pérez',
    email: 'juan@example.com',
  };

  return (
    <Layout titulo="Detalle de Reseña" user={user}>
      <div className="review-detail">
        <h2>{mockReview.title}</h2>
        <div className="review-info">
          <p><strong>Producto:</strong> {mockReview.itemcode}</p>
          <p><strong>Cliente:</strong> {mockReview.cliente}</p>
          <p><strong>Fecha:</strong> {mockReview.fecha}</p>
          <StarRating rating={mockReview.estrellas} />
        </div>
        <div className="review-description">
          <h3>Descripción</h3>
          <p>{mockReview.resena_descrip}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewDetailPage;
