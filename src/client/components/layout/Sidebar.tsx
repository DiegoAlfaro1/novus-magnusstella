import React from 'react';
import { Link } from 'react-router-dom';
import { Brand, Permission } from '../../types';

interface SidebarProps {
  brand: Brand;
  permisos: Permission[];
}

const Sidebar: React.FC<SidebarProps> = ({ brand, permisos }) => {
  const hasPermission = (permission: string) => {
    return permisos.some((p) => p.funcion === permission);
  };

  const ver = hasPermission('ver');
  const editar = hasPermission('editar');
  const administrar = hasPermission('administracion');

  return (
    <nav className="side_bar close">
      <header>
        <i className="bx bx-chevron-right toggle" id="toggle-sidebar"></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            {ver && (
              <>
                <li className="nav-link">
                  <Link to={`/graphics/dashboard/${brand}`}>
                    <i className="bx bx-line-chart icon"></i>
                    <span className="text nav-text">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link to={`/reviews/resenas/${brand}`}>
                    <i className="bx bx-star icon"></i>
                    <span className="text nav-text">Reseñas</span>
                  </Link>
                </li>
              </>
            )}
            {editar && (
              <li className="nav-link">
                <Link to={`/emails/correos/${brand}`}>
                  <i className="bx bx-envelope icon"></i>
                  <span className="text nav-text">Correos</span>
                </Link>
              </li>
            )}
            {administrar && (
              <li className="nav-link">
                <Link to={`/usuarios/1/${brand}`}>
                  <i className="bx bxs-user-plus icon"></i>
                  <span className="text nav-text">Usuarios</span>
                </Link>
              </li>
            )}
          </ul>

          <ul className="menu-links bottom-icons">
            <li className="nav-link">
              <Link to={`/ayuda/${brand}`}>
                <i className="bx bx-help-circle icon"></i>
                <span className="text nav-text">Ayuda</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/users/logout">
                <i className="bx bx-exit icon"></i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
