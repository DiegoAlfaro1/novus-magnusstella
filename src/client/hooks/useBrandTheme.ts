import { useEffect } from 'react';
import { Brand } from '../types';

export const useBrandTheme = (brand: Brand) => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Brand-specific color schemes
    const brandColors: Record<Brand, { primary: string; secondary: string; nav: string }> = {
      LU1: {
        primary: '#4a7ba7', // Blue for Luuna
        secondary: '#668bbb',
        nav: '#2e3d50',
      },
      NO1: {
        primary: '#fff1d4', // Cream for Nooz
        secondary: '#ffe4a3',
        nav: '#8b7355',
      },
      MA1: {
        primary: '#1a1a1a', // Black for Mappa
        secondary: '#333333',
        nav: '#000000',
      },
    };

    const colors = brandColors[brand];
    
    // Apply brand colors as CSS variables
    root.style.setProperty('--brand-primary', colors.primary);
    root.style.setProperty('--brand-secondary', colors.secondary);
    root.style.setProperty('--nav-color', colors.nav);
    root.style.setProperty('--edit-color', colors.nav);
    root.style.setProperty('--sidebar-color', colors.nav);
    root.style.setProperty('--highlight', colors.secondary);
    
  }, [brand]);
};
