import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DataTable, { Column } from '../components/shared/DataTable';
import UserFormModal from '../components/shared/UserFormModal';
import { Brand, User, Usuario } from '../types';
import '../styles/usuarios.css';

const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    marca: 'LU1',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }],
    fecha_creacion: '2024-01-15',
    estado: 'activo',
  },
  {
    id: 2,
    nombre: 'María García',
    correo: 'maria@example.com',
    marca: 'NO1',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
    fecha_creacion: '2024-01-10',
    estado: 'activo',
  },
  {
    id: 3,
    nombre: 'Carlos López',
    correo: 'carlos@example.com',
    marca: 'MA1',
    permisos: [{ funcion: 'ver' }],
    fecha_creacion: '2024-01-08',
    estado: 'inactivo',
  },
];

const UsersPage: React.FC = () => {
  const { marca, page } = useParams<{ marca: Brand; page: string }>();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useState<User>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [{ funcion: 'ver' }, { funcion: 'editar' }, { funcion: 'administracion' }],
  });

  const currentPage = parseInt(page || '1', 10);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsuarios = usuarios.slice(startIndex, endIndex);

  const columns: Column<Usuario>[] = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'correo', header: 'Correo Electrónico' },
    { key: 'marca', header: 'Marca' },
    {
      key: 'permisos',
      header: 'Permisos',
      render: (usuario) => usuario.permisos.map((p) => p.funcion).join(', '),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (usuario) => (
        <span className={`estado-badge ${usuario.estado}`}>
          {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (usuario) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(usuario);
          }}
          className="btn-edit"
        >
          Editar
        </button>
      ),
    },
  ];

  const handleEdit = (usuario: Usuario) => {
    setSelectedUser(usuario);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSave = (userData: Partial<Usuario>) => {
    if (selectedUser) {
      setUsuarios(usuarios.map((u) => (u.id === selectedUser.id ? { ...u, ...userData } : u)));
    } else {
      const newUser: Usuario = {
        id: Math.max(0, ...usuarios.map((u) => u.id)) + 1,
        nombre: userData.nombre || '',
        correo: userData.correo || '',
        marca: userData.marca || marca || 'LU1',
        permisos: userData.permisos || [],
        fecha_creacion: new Date().toISOString().split('T')[0],
        estado: userData.estado || 'activo',
      };
      setUsuarios([...usuarios, newUser]);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/usuarios/${newPage}/${marca}`);
  };

  const handleViewChangelog = () => {
    navigate(`/usuarios/registro/${marca}`);
  };

  return (
    <Layout titulo="Usuarios" user={user}>
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h2>Gestión de Usuarios</h2>
          <div className="header-actions">
            <button onClick={handleViewChangelog} className="btn-secondary">
              Ver Historial
            </button>
            <button onClick={handleCreate} className="ingresar-btn">
              Crear Usuario
            </button>
          </div>
        </div>

        <DataTable data={paginatedUsuarios} columns={columns} />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Anterior
            </button>
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Siguiente
            </button>
          </div>
        )}

        <UserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          user={selectedUser}
          brand={marca!}
        />
      </div>
    </Layout>
  );
};

export default UsersPage;
