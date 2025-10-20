import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { fetchProducts, addComment, deleteComment } from '../../../store/thunks/productsThunks';
import { api } from '../../../api/api';
import type { Comment } from '../../../types/types';

export function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const products = useAppSelector(s => s.products.items);
  const loading = useAppSelector(s => s.products.loading);
  const error = useAppSelector(s => s.products.error);

  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${productId}`);
      if (!res.data) console.error('Продукт не знайдено!');
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (products.length === 0 && !loading) dispatch(fetchProducts());
  }, [dispatch, products.length, loading]);

  const product = products.find(p => String(p.id) === id);

  const handleAddComment = async () => {
    if (!newComment || !product) return;
    const comment: Comment = {
      id: Date.now(),
      productId: product.id,
      description: newComment,
      date: new Date().toLocaleString(),
    };
    await dispatch(addComment({ productId: product.id, comment }));
    setNewComment('');
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!product) return;
    await dispatch(deleteComment({ productId: product.id, commentId }));
  };

  return {
    product,
    loading,
    error,
    showEdit,
    setShowEdit,
    newComment,
    setNewComment,
    handleAddComment,
    handleDeleteComment,
  };
}
