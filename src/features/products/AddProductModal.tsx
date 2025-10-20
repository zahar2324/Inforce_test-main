import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { addProduct, updateProduct } from './productsSlice';
import type { Product } from '../../types/types';

interface AddProductModalProps {
  onClose: () => void;
  product?: Product; // optional для edit
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, product }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(product?.name || '');
  const [count, setCount] = useState(product?.count || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [width, setWidth] = useState(product?.size.width || 100);
  const [height, setHeight] = useState(product?.size.height || 100);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name || count <= 0) {
      setError('Please enter valid name and count');
      return;
    }

    const payload: Omit<Product, 'id'> | Product = {
      name,
      count,
      imageUrl,
      weight,
      size: { width, height },
      comments: product?.comments || []
    };

    if (product) {
      // редагування існуючого продукту
      await dispatch(updateProduct({ ...payload, id: product.id }));
    } else {
      // додавання нового продукту
      await dispatch(addProduct(payload as Omit<Product, 'id'>));
    }

    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: 'white', padding: '20px', borderRadius: '8px',
        minWidth: '350px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label>Name: <input value={name} onChange={e => setName(e.target.value)} /></label>
          <label>Count: <input type="number" value={count} onChange={e => setCount(+e.target.value)} /></label>
          <label>Image URL: <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} /></label>
          <label>Weight: <input value={weight} onChange={e => setWeight(e.target.value)} /></label>
          <label>Width: <input type="number" value={width} onChange={e => setWidth(+e.target.value)} /></label>
          <label>Height: <input type="number" value={height} onChange={e => setHeight(+e.target.value)} /></label>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onClose} style={{ backgroundColor: '#e53935', color: 'white' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
