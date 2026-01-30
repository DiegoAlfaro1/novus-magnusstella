import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Brand } from '../../types';

interface CategorySelectorProps {
  basePath: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ basePath }) => {
  const { marca, categoria } = useParams<{ marca: Brand; categoria?: string }>();
  const navigate = useNavigate();

  const categories: Record<Brand, string[]> = {
    LU1: ['Colchon', 'Almohadas', 'Cama'],
    NO1: ['Blancos', 'Almohadas', 'Cama'],
    MA1: ['Maletas', 'Bolsas', 'Accesorios'],
  };

  const handleCategoryClick = (category: string) => {
    navigate(`${basePath}/${marca}/${category}`);
  };

  const handleAllClick = () => {
    navigate(`${basePath}/${marca}`);
  };

  if (!marca) return null;

  return (
    <div className="dropdown category">
      <button className="dropbtn cat-btn">Categoría</button>
      <div className="dropdown-content cat-content">
        <a 
          href="#" 
          role="button"
          onClick={(e) => { e.preventDefault(); handleAllClick(); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAllClick(); } }}
        >
          Todo
        </a>
        {categories[marca]?.map((cat) => (
          <a 
            key={cat} 
            href="#"
            role="button"
            onClick={(e) => { e.preventDefault(); handleCategoryClick(cat); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCategoryClick(cat); } }}
          >
            {cat}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
