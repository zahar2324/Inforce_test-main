import React from 'react';
import './ProductListSkeleton.scss';

interface ProductListSkeletonProps {
  rows?: number; 
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className="product-list__skeleton-row">
          <td><div className="skeleton skeleton-text" /></td>
          <td><div className="skeleton skeleton-text" /></td>
          <td><div className="skeleton skeleton-button" /></td>
        </tr>
      ))}
    </>
  );
};

export default ProductListSkeleton;
