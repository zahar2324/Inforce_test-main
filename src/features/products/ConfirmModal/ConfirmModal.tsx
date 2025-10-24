import React from 'react';
import './ConfirmModal.scss';
import type { ConfirmModalProps } from '../../../types/ui';

 

const ConfirmModal: React.FC<ConfirmModalProps> = ({ text, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <p className="confirm-modal__text">{text}</p>
        <div className="confirm-modal__buttons">
          <button className="btn btn--confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn btn--cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
