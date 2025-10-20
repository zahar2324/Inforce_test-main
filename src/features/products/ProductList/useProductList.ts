import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { deleteProduct } from '../../../store/thunks/productsThunks';
import type { Product } from '../../../types/types';
import { SORT_OPTIONS, SORT_LABELS, type SortOption } from '../../../constants/sortOptions';

export function useProductList(sort: SortOption) {
  const products = useAppSelector(s => s.products.items);
  const loading = useAppSelector(s => s.products.loading);
  const dispatch = useAppDispatch();

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sort) {
        case SORT_OPTIONS.NAME_ASC:
          return a.name.localeCompare(b.name);
        case SORT_OPTIONS.COUNT_ASC:
          return a.count - b.count;
        case SORT_OPTIONS.COUNT_DESC:
          return b.count - a.count;
        default:
          return 0;
      }
    });
  }, [products, sort]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteProduct(id));
  };

  const validateProduct = (product: Product) => {
    if (!product.name.trim()) return false;
    if (product.count < 0) return false;
    if (product.size.width < 0 || product.size.height < 0) return false;
    return true;
  };

  const sortOptions = Object.entries(SORT_LABELS).map(([value, label]) => ({
    value: value as SortOption,
    label,
  }));

  return { products, loading, sorted, handleDelete, validateProduct, sortOptions };
}
