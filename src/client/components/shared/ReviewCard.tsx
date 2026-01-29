import React from 'react';
import { Link } from 'react-router-dom';
import { Review, Brand } from '../../types';
import StarRating from './StarRating';
import VisibilityToggle from './VisibilityToggle';

interface ReviewCardProps {
  review: Review;
  brand: Brand;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, brand }) => {
  return (
    <div className="item-container">
      <Link id="nombre-resena" to={`/reviews/resenas_completas/${brand}/${review.id}`}>
        {review.title}
      </Link>
      <img src={`/images/${brand}/${review.itemcode}.jpg`} className="img_producto" alt={review.itemcode} />
      <p id="item" style={{ fontWeight: 'bold' }}>
        {review.itemcode}
      </p>
      <StarRating rating={review.estrellas} />
      <p id="sub_question">{review.resena_descrip}</p>
      <div className="switch-checkbox deshabilitado">
        <p id="fecha">{review.fecha}</p>
        <VisibilityToggle checked={review.visibilidad === 0} disabled={true} id={review.id} />
      </div>
    </div>
  );
};

export default ReviewCard;
