import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brand } from '../../types';

interface BrandSelectorProps {
  currentBrand: Brand;
  currentPath: string;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({ currentBrand, currentPath }) => {
  const navigate = useNavigate();

  const getBrandLogo = (brand: Brand, version: number) => {
    const logos: Record<Brand, string> = {
      LU1: `/logos/Logo_Luuna_${version}.png`,
      NO1: `/logos/Logo_Nooz_${version}.png`,
      MA1: `/logos/Logo_Mappa_${version}.png`,
    };
    return logos[brand] || logos.LU1;
  };

  const getBrandName = (brand: Brand) => {
    const names: Record<Brand, string> = {
      LU1: 'Luuna',
      NO1: 'Nooz',
      MA1: 'Mappa',
    };
    return names[brand];
  };

  const handleBrandChange = (newBrand: Brand) => {
    const newPath = currentPath.replace(/\/(LU1|NO1|MA1)/, `/${newBrand}`);
    navigate(newPath);
  };

  return (
    <div className="dropdown dropdown-marca">
      <button className="dropbtn dropbtn-marca">
        <img
          className="brand-logo default-brand"
          src={getBrandLogo(currentBrand, 3)}
          width="196"
          height="61"
          alt={`Logo de ${getBrandName(currentBrand)}`}
        />
      </button>
      <i className="bx bxs-chevron-down icono"></i>
      <div className="dropdown-content dropdown-content-marca">
        <a onClick={() => handleBrandChange('LU1')}>
          <img
            className="select-brand"
            data-value="LU1"
            src={getBrandLogo('LU1', 2)}
            width="150"
            height="50"
            alt="Logo de Luuna"
          />
        </a>
        <a onClick={() => handleBrandChange('NO1')}>
          <img
            className="select-brand"
            data-value="NO1"
            src={getBrandLogo('NO1', 2)}
            width="150"
            height="50"
            alt="Logo de Nooz"
          />
        </a>
        <a onClick={() => handleBrandChange('MA1')}>
          <img
            className="select-brand"
            data-value="MA1"
            src={getBrandLogo('MA1', 2)}
            width="150"
            height="50"
            alt="Logo de Mappa"
          />
        </a>
      </div>
    </div>
  );
};

export default BrandSelector;
