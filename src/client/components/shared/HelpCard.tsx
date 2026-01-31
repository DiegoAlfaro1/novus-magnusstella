import React from 'react';
import { Link } from 'react-router-dom';
import { Brand, HelpTopic } from '../../types';

interface HelpCardProps {
  topic: HelpTopic;
  brand: Brand;
}

const HelpCard: React.FC<HelpCardProps> = ({ topic, brand }) => {
  return (
    <Link to={`/ayuda/${brand}/${topic.id}`} className="help-card">
      <div className="help-card-icon">{topic.icono || '📄'}</div>
      <h3>{topic.titulo}</h3>
      <p>{topic.descripcion}</p>
    </Link>
  );
};

export default HelpCard;
