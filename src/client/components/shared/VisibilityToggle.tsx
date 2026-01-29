import React from 'react';

interface VisibilityToggleProps {
  checked: boolean;
  disabled?: boolean;
  id: string | number;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ checked, disabled = false, id }) => {
  return (
    <div className="switch-checkbox deshabilitado">
      <input
        type="checkbox"
        disabled={disabled}
        id={`visibilidadCheckbox_${id}`}
        checked={checked}
        readOnly
      />
      <label htmlFor="visibilidadCheckbox" className="text"></label>
    </div>
  );
};

export default VisibilityToggle;
