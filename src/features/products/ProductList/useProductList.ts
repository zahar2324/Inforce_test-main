import { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { deleteProduct } from '../../../store/thunks/productsThunks';
import type { Product } from '../../../types/types';

const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'count_asc', label: 'Count (Asc)' },
  { value: 'count_desc', label: 'Count (Desc)' }
];

export function useProductList() {
  const products = useAppSelector(s => s.products.items);
  const loading = useAppSelector(s => s.products.loading);
  const dispatch = useAppDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sort, setSort] = useState('name_asc');

  const sorted = useMemo(() => {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'count_asc':
        return a.count - b.count;
      case 'count_desc':
        return b.count - a.count;
      default:
        return 0;
    }
  });
}, [products, sort]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteProduct(id));
    setDeleteId(null);
  };

  const validateProduct = (product: Product) => {
    if (!product.name.trim()) return false;
    if (product.count < 0) return false;
    if (product.size.width < 0 || product.size.height < 0) return false;
    return true;
  };

  return {
    products,
    loading,
    showAdd,
    setShowAdd,
    deleteId,
    setDeleteId,
    sort,
    setSort,
    sorted,
    handleDelete,
    sortOptions,
    validateProduct,
  };
}
