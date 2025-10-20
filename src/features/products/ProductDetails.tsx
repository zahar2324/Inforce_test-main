import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import AddProductModal from './AddProductModal';
import { fetchProducts, addComment, deleteComment, updateProduct } from './productsSlice';
import type { Comment } from '../../types/types';
import { api } from '../../api/api';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const products = useAppSelector(s => s.products.items);
  const loading = useAppSelector(s => s.products.loading);
  const error = useAppSelector(s => s.products.error);

  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState('');




    // --- Fetch single product ---
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${productId}`);
      if (!res.data) {
        console.error("Продукт не знайдено!");
      }
    };
    fetchProduct();
  }, [productId]);
  // --- Fetch products if store is empty ---
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  //const product = products.find(p => String(p.id) === id);
  const product = products.find(p => String(p.id) === id);
  if (!product) return <p>Product not found</p>;

  const handleAddComment = async () => {
    if (!newComment) return;
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
    await dispatch(deleteComment({ productId: product.id, commentId }));
  };

  const handleEditProduct = async (updatedProduct: typeof product) => {
    await dispatch(updateProduct(updatedProduct));
    setShowEdit(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      )}
      <p><strong>Count:</strong> {product.count}</p>
      <p><strong>Weight:</strong> {product.weight}</p>
      <p><strong>Size:</strong> {product.size.width} x {product.size.height}</p>

      <button onClick={() => setShowEdit(true)} style={{ marginBottom: '20px' }}>
        Edit Product
      </button>

      <h3>Comments</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {product.comments.map(c => (
          <li
            key={c.id}
            style={{
              background: '#f0f0f0',
              margin: '5px 0',
              padding: '6px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{c.description} ({c.date})</span>
            <button
              onClick={() => handleDeleteComment(c.id)}
              style={{ backgroundColor: '#e53935', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
        <input
          type="text"
          placeholder="Add comment"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddComment} style={{ padding: '6px 12px' }}>Add Comment</button>
      </div>

      {showEdit && (
        <AddProductModal
          onClose={() => setShowEdit(false)}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductDetails;
