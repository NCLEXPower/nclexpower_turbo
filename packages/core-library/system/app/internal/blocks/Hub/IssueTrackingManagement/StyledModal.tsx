import React, { useEffect } from 'react';
import { customModalBackdrop, customModalContent } from './style';

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
        style={customModalBackdrop}
      />
      <div
        role="dialog"
        aria-labelledby={ariaLabelledBy}
        data-testid="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={customModalContent}
      >
        {children}
      </div>
    </>
  );
};