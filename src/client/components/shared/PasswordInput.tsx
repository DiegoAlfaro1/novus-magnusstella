import React, { useState } from 'react';

interface PasswordInputProps {
  name: string;
  id: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ name, id, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="passwordInput">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        id={id}
        placeholder={placeholder}
      />
      <button type="button" id="togglePasswordBtn" onClick={togglePassword} aria-label="Toggle password visibility">
        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default PasswordInput;
