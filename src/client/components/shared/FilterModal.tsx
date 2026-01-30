import React, { useState, ReactNode } from 'react';

interface FilterModalProps {
  title: string;
  children: ReactNode;
  buttonText?: string;
  modalId?: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  title,
  children,
  buttonText = 'Filtros',
  modalId = 'myModal',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button id={`open${modalId}Btn`} onClick={openModal}>
        {buttonText}
      </button>
      {isOpen && (
        <div id={modalId} className="modal" style={{ display: 'block' }} onClick={handleBackdropClick}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
