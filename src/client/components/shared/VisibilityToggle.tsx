import React from 'react';

interface VisibilityToggleProps {
  checked: boolean;
  disabled?: boolean;
  id: string | number;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ checked, disabled = false, id }) => {
  const inputId = `visibilidadCheckbox_${id}`;
  
  return (
    <div className="switch-checkbox deshabilitado">
      <input
        type="checkbox"
        disabled={disabled}
        id={inputId}
        checked={checked}
        readOnly
      />
      <label htmlFor={inputId} className="text"></label>
    </div>
  );
};

export default VisibilityToggle;
