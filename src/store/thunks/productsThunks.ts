/*import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, removeProduct, updateProductApi, getProduct } from '../services/productsApi';
import type { Product, Comment } from '../../types/types';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await getProducts();
  return res.data;
});

export const addProduct = createAsyncThunk('products/add', async (product: Omit<Product, 'id'>) => {
  const res = await createProduct(product);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
  await removeProduct(id);
  return id;
});

export const updateProduct = createAsyncThunk('products/update', async (product: Product) => {
  const res = await updateProductApi(product);
  return res.data;
});

export const addComment = createAsyncThunk(
  'products/addComment',
  async ({ productId, comment }: { productId: number; comment: Comment }) => {
    const prod = (await getProduct(productId)).data;
    const newComments = [...prod.comments, comment];
    const updated = { ...prod, comments: newComments };
    const res = await updateProductApi(updated);
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  'products/deleteComment',
  async ({ productId, commentId }: { productId: number; commentId: number }) => {
    const prod = (await getProduct(productId)).data;
    const newComments = prod.comments.filter(c => c.id !== commentId);
    const updated = { ...prod, comments: newComments };
    const res = await updateProductApi(updated);
    return res.data;
  }
);
*/


