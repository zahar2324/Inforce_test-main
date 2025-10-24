import React from 'react';
import { useAddProductModal } from './useAddProductModal';
import './AddProductModal.scss';
import type { AddProductModalProps } from '../../../types/ui';
import { sanitizeInput, validateProductName } from '../../../utils/validation';

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, product }) => {
  const {
    name, setName,
    count, setCount,
    imageUrl, setImageUrl,
    weight, setWeight,
    width, setWidth,
    height, setHeight,
    error,
    handleSubmit,
    handleNumberChange
  } = useAddProductModal(onClose, product);

  const handleConfirm = () => {

    if (!validateProductName(name)) {
      alert('Invalid product name (1-100 characters, letters, numbers, -_.() allowed)');
      return;
    }
    handleSubmit();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">{product ? 'Edit Product' : 'Add Product'}</h2>
        {error && <p className="modal__error">{error}</p>}

        <div className="modal__form">
          <label>Name:
            <input value={name} onChange={e => setName(sanitizeInput(e.target.value))} />
          </label>

          <label>Count:
            <input
              type="number"
              value={count}
              min={0}
              onChange={e => handleNumberChange(+e.target.value, setCount)}
            />
          </label>

          <label>Image URL:
            <input value={imageUrl} onChange={e => setImageUrl(sanitizeInput(e.target.value))} />
          </label>

          <label>Weight:
            <input value={weight} onChange={e => setWeight(sanitizeInput(e.target.value))} />
          </label>

          <label>Width:
            <input
              type="number"
              value={width}
              min={0}
              onChange={e => handleNumberChange(+e.target.value, setWidth)}
            />
          </label>

          <label>Height:
            <input
              type="number"
              value={height}
              min={0}
              onChange={e => handleNumberChange(+e.target.value, setHeight)}
            />
          </label>
        </div>

        <div className="modal__buttons">
          <button className="btn btn--confirm" onClick={handleConfirm}>Confirm</button>
          <button className="btn btn--cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
