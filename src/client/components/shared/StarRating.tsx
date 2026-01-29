import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  return (
    <div className="estrellas">
      {Array.from({ length: maxStars }, (_, index) => (
        <i
          key={index}
          className={index < rating ? 'bx bxs-star' : 'bx bx-star'}
          id={index < rating ? 'stars_y' : 'stars_g'}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
