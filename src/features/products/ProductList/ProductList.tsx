import React from 'react';
import { Link } from 'react-router-dom';
import AddProductModal from '../AddProductModal/AddProductModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useProductList } from './useProductList';

import './ProductList.scss';

const ProductList: React.FC = () => {
  const {
    sorted,
    loading,
    showAdd,
    setShowAdd,
    deleteId,
    setDeleteId,
    sort,
    setSort,
    handleDelete,
    sortOptions
  } = useProductList();

  return (
    <div className="product-list">
      <h1 className="product-list__title">Products</h1>

      <div className="product-list__controls">
        <button className="product-list__add-btn" onClick={() => setShowAdd(true)}>Add Product</button>
        <select
          className="product-list__sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="product-list__loading">Loading...</p>
      ) : (
        <table className="product-list__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.id}>
                <td><Link className="product-list__link" to={`/product/${p.id}`}>{p.name}</Link></td>
                <td>{p.count}</td>
                <td>
                  <button
                    className="product-list__delete-btn"
                    onClick={() => setDeleteId(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} />}
      {deleteId !== null && (
        <ConfirmModal
          text="Delete this product?"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => handleDelete(deleteId)}
        />
      )}
    </div>
  );
};

export default ProductList;
