import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { addProduct, updateProduct } from '../../../store/thunks/productsThunks';
import type { Product } from '../../../types/types';

export function useAddProductModal(onClose: () => void, product?: Product) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(product?.name || '');
  const [count, setCount] = useState(product?.count || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [width, setWidth] = useState(product?.size.width || 100);
  const [height, setHeight] = useState(product?.size.height || 100);
  const [error, setError] = useState('');

  const handleNumberChange = (value: number, setter: (val: number) => void) => {
    setter(Math.max(0, value));
  };

  const validateUrl = (url: string) => {
    if (!url) return true; 
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!name || count <= 0) {
      setError('Please enter valid name and count');
      return;
    }

    if (!validateUrl(imageUrl)) {
      setError('Please enter a valid image URL');
      return;
    }

    const payload: Omit<Product, 'id'> | Product = {
      name,
      count,
      imageUrl,
      weight,
      size: { width, height },
      comments: product?.comments || [],
    };

    if (product) {
      await dispatch(updateProduct({ ...payload, id: product.id }));
    } else {
      await dispatch(addProduct(payload as Omit<Product, 'id'>));
    }

    onClose();
  };

  return {
    name, setName,
    count, setCount,
    imageUrl, setImageUrl,
    weight, setWeight,
    width, setWidth,
    height, setHeight,
    error,
    handleSubmit,
    handleNumberChange,
  };
}
