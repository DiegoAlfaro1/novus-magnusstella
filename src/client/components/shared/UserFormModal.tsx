import React, { useState, useEffect } from 'react';
import { Brand, Usuario, Permission } from '../../types';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<Usuario>) => void;
  user?: Usuario | null;
  brand: Brand;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSave, user, brand }) => {
  const [formData, setFormData] = useState<Partial<Usuario>>({
    nombre: '',
    correo: '',
    marca: brand,
    permisos: [],
    estado: 'activo',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        nombre: '',
        correo: '',
        marca: brand,
        permisos: [],
        estado: 'activo',
      });
    }
  }, [user, brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handlePermissionChange = (funcion: Permission['funcion'], checked: boolean) => {
    const newPermisos = checked
      ? [...(formData.permisos || []), { funcion }]
      : (formData.permisos || []).filter((p) => p.funcion !== funcion);
    setFormData({ ...formData, permisos: newPermisos });
  };

  const hasPermission = (funcion: Permission['funcion']) => {
    return formData.permisos?.some((p) => p.funcion === funcion) || false;
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{user ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Permisos:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={hasPermission('ver')}
                  onChange={(e) => handlePermissionChange('ver', e.target.checked)}
                />
                Ver
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={hasPermission('editar')}
                  onChange={(e) => handlePermissionChange('editar', e.target.checked)}
                />
                Editar
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={hasPermission('administracion')}
                  onChange={(e) => handlePermissionChange('administracion', e.target.checked)}
                />
                Administración
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value as 'activo' | 'inactivo' })}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="ingresar-btn">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
