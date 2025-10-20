import { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { deleteProduct } from '../../../store/slices/productsSlice';
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
    const arr = [...products];
    if (sort === 'name_asc') arr.sort((a,b) => a.name.localeCompare(b.name));
    if (sort === 'count_asc') arr.sort((a,b) => a.count - b.count);
    if (sort === 'count_desc') arr.sort((a,b) => b.count - a.count);
    return arr;
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
