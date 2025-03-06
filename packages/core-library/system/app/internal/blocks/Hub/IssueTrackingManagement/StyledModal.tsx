import React, { useEffect } from 'react';

export interface StyledModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabelledBy?: string;
}

export const StyledModal: React.FC<StyledModalProps> = ({
  isOpen,
  onClose,
  children,
  ariaLabelledBy,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        data-testid="custom-modal-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          zIndex: 1200,
        }}
      />
      <div
        role="dialog"
        aria-labelledby={ariaLabelledBy}
        data-testid="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '16px',
          borderRadius: '8px',
          zIndex: 1300,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {children}
      </div>
    </>
  );
};