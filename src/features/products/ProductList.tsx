import React, { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { deleteProduct } from './productsSlice';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import ConfirmModal from './ConfirmModal';

const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'count_asc', label: 'Count (Asc)' },
  { value: 'count_desc', label: 'Count (Desc)' }
];

const ProductList: React.FC = () => {
  const products = useAppSelector(s => s.products.items);
  const loading = useAppSelector(s => s.products.loading);
  const dispatch = useAppDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sort, setSort] = useState('name_asc');

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === 'name_asc') arr.sort((a,b) => a.name.localeCompare(b.name));
    if (sort === 'count_asc') arr.sort((a,b) => a.count - b.count);
    if (sort === 'count_desc') arr.sort((a,b) => b.count - a.count);
    return arr;
  }, [products, sort]);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ marginTop:'10px', marginBottom:'10px', display:'flex', gap:'10px', alignItems:'center' }}>
  <button onClick={() => setShowAdd(true)}>Add Product</button>
  <select value={sort} onChange={e => setSort(e.target.value)}>
    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
</div>

      {loading ? <p>Loading...</p> :
        <table>
          <thead>
            <tr><th>Name</th><th>Count</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.id}>
                <td><Link to={`/product/${p.id}`}>{p.name}</Link></td>
                <td>{p.count}</td>
                <td>
                  <button onClick={() => setDeleteId(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} />}
      {deleteId !== null && <ConfirmModal
        text="Delete this product?"
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => { await dispatch(deleteProduct(deleteId)); setDeleteId(null); }}
      />}
    </div>
  );
};

export default ProductList;
