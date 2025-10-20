// src/store/thunks/productsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, removeProduct, updateProductApi, getProduct } from '../services/productsApi';
import type { Product, Comment } from '../../types/types';

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await getProducts();
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch products');
  }
});

export const addProduct = createAsyncThunk<
  Product,
  Omit<Product, 'id'>,
  { rejectValue: string }
>('products/add', async (product, { rejectWithValue }) => {
  try {
    const res = await createProduct(product);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add product');
  }
});

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('products/delete', async (id, { rejectWithValue }) => {
  try {
    await removeProduct(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete product');
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>('products/update', async (product, { rejectWithValue }) => {
  try {
    const res = await updateProductApi(product);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update product');
  }
});

export const addComment = createAsyncThunk<
  Product,
  { productId: number; comment: Comment },
  { rejectValue: string }
>('products/addComment', async ({ productId, comment }, { rejectWithValue }) => {
  try {
    const prod = (await getProduct(productId)).data;
    const updated = { ...prod, comments: [...prod.comments, comment] };
    const res = await updateProductApi(updated);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add comment');
  }
});

export const deleteComment = createAsyncThunk<
  Product,
  { productId: number; commentId: number },
  { rejectValue: string }
>('products/deleteComment', async ({ productId, commentId }, { rejectWithValue }) => {
  try {
    const prod = (await getProduct(productId)).data;
    const updated = { ...prod, comments: prod.comments.filter(c => c.id !== commentId) };
    const res = await updateProductApi(updated);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete comment');
  }
});
