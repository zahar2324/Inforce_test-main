import React from 'react';
import AddProductModal from '../AddProductModal/AddProductModal';
import { useProductDetails } from './useProductDetails';
import './ProductDetails.scss';

const ProductDetails: React.FC = () => {
  const {
    product,
    loading,
    error,
    showEdit,
    setShowEdit,
    newComment,
    setNewComment,
    handleAddComment,
    handleDeleteComment,
  } = useProductDetails();

  if (loading) return <p className="product-loading">Loading...</p>;
  if (error) return <p className="product-error">Error: {error}</p>;
  if (!product) return <p className="product-notfound">Product not found</p>;

  return (
    <div className="product-details">
      <h1 className="product-details__title">Product Details</h1>
      <h2 className="product-details__name">{product.name}</h2>

      {product.imageUrl && (
        <img
          className="product-details__image"
          src={product.imageUrl}
          alt={product.name}
        />
      )}

      <p className="product-details__info"><strong>Count:</strong> {product.count}</p>
      <p className="product-details__info"><strong>Weight:</strong> {product.weight}</p>
      <p className="product-details__info"><strong>Size:</strong> {product.size.width} x {product.size.height}</p>

      <button className="product-details__edit-btn" onClick={() => setShowEdit(true)}>
        Edit Product
      </button>

      <h3 className="product-details__comments-title">Comments</h3>
      <ul className="product-details__comments-list">
        {product.comments.map(c => (
          <li key={c.id} className="product-details__comment">
            <span>{c.description} ({c.date})</span>
            <button
              className="product-details__comment-delete"
              onClick={() => handleDeleteComment(c.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="product-details__add-comment">
        <input
          type="text"
          placeholder="Add comment"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          className="product-details__input"
        />
        <button className="product-details__add-btn" onClick={handleAddComment}>Add Comment</button>
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
