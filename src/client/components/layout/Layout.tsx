import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Brand, User } from '../../types';
import { useSidebarToggle, useDarkMode } from '../../hooks/useLayout';
import { useBrandTheme } from '../../hooks/useBrandTheme';

interface LayoutProps {
  children: ReactNode;
  titulo: string;
  user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, titulo, user }) => {
  const { marca } = useParams<{ marca: Brand }>();
  const brand = marca || 'LU1';

  useSidebarToggle();
  useDarkMode();
  useBrandTheme(brand);

  return (
    <>
      <Navbar titulo={titulo} brand={brand} />
      <Sidebar brand={brand} permisos={user?.permisos || []} />
      <div className="main-content">{children}</div>
    </>
  );
};

export default Layout;
