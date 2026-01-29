import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ReviewCard from '../components/shared/ReviewCard';
import FilterModal from '../components/shared/FilterModal';
import { Brand, User, Review } from '../types';
import '../styles/resenas.css';

const mockReviews: Review[] = [
  {
    id: 1,
    title: 'Excelente producto',
    itemcode: 'PROD001',
    estrellas: 5,
    resena_descrip: 'Me encantó el producto, muy cómodo y de buena calidad',
    fecha: '2024-01-15',
    visibilidad: 1,
  },
  {
    id: 2,
    title: 'Buena compra',
    itemcode: 'PROD002',
    estrellas: 4,
    resena_descrip: 'Cumple con lo esperado, recomendado',
    fecha: '2024-01-14',
    visibilidad: 1,
  },
  {
    id: 3,
    title: 'Regular',
    itemcode: 'PROD003',
    estrellas: 3,
    resena_descrip: 'Es aceptable pero esperaba más por el precio',
    fecha: '2024-01-13',
    visibilidad: 0,
  },
];

const ReviewsPage: React.FC = () => {
  const { marca } = useParams<{ marca: Brand }>();
  const [reviews] = useState<Review[]>(mockReviews);
  const [user] = useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  return (
    <Layout titulo="Reseñas" user={user}>
      <div id="search-autocomplete" className="form-outline">
        <div className="cat-search">
          <FilterModal title="Filtros" buttonText="Filtros" modalId="myModal2">
            <form>
              <div className="input-product">
                <div className="inputFilter">
                  <label htmlFor="orden">Ordenar por: </label>
                  <select name="orden">
                    <option value="ascendente">Puntaje más bajo</option>
                    <option value="descendente">Puntaje más alto</option>
                  </select>
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
                  Submit
                </button>
              </div>
            </form>
          </FilterModal>
        </div>

        <input
          type="search"
          id="buscar"
          className="form-control"
          placeholder="Busca tu producto"
        />
        <button type="button" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div id="respuesta_ajax" className="respuesta_ajax">
        <div className="item-boxes">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} brand={marca || 'LU1'} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReviewsPage;
