import React from 'react';
import { useLocation } from 'react-router-dom';
import { Brand } from '../../types';
import BrandSelector from './BrandSelector';

interface NavbarProps {
  titulo: string;
  brand: Brand;
}

const Navbar: React.FC<NavbarProps> = ({ titulo, brand }) => {
  const location = useLocation();

  return (
    <nav>
      <div className="nav-bar">
        <div className="darkLight-profile">
          <div className="dark-light">
            <i className="bx bx-moon moon"></i>
            <i className="bx bx-sun sun"></i>
          </div>
        </div>

        <span className="titulo">
          <strong>{titulo}</strong>
        </span>

        <BrandSelector currentBrand={brand} currentPath={location.pathname} />
      </div>
    </nav>
  );
};

export default Navbar;
