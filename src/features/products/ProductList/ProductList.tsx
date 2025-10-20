import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import AddProductModal from '../AddProductModal/AddProductModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { SORT_OPTIONS, type SortOption } from '../../../constants/sortOptions';
import { useProductList } from './useProductList';

import './ProductList.scss';
import ProductListSkeleton from './ProductListSceleton/ProductListSkeleton';

const ProductList: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>(SORT_OPTIONS.NAME_ASC);

  const { sorted, loading, handleDelete, sortOptions } = useProductList(sort);
 

  return (
    <div className="product-list">
      <h1 className="product-list__title">Products</h1>

      <div className="product-list__controls">
        <button className="product-list__add-btn" onClick={() => setShowAdd(true)}>Add Product</button>
        <select
          className="product-list__sort"
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
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
  {loading ? (
    <ProductListSkeleton rows={5} />
  ) : (
    sorted.map(p => (
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
    ))
  )}
</tbody>
        </table>
      )}

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} />}
      {deleteId !== null && (
        <ConfirmModal
          text="Delete this product?"
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => { await handleDelete(deleteId); setDeleteId(null); }}
        />
      )}
    </div>
  );
};

export default ProductList;
