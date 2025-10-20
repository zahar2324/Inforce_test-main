/*import { api } from '../../api/api';
import type { Product } from '../../types/types';

export const getProducts = () => api.get<Product[]>('/products');
export const createProduct = (product: Omit<Product, 'id'>) => api.post<Product>('/products', product);
export const removeProduct = (id: number) => api.delete(`/products/${id}`);
export const updateProductApi = (product: Product) => api.put<Product>(`/products/${product.id}`, product);
export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);
*/