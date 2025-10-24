import { createAsyncThunk } from '@reduxjs/toolkit';
import { secureApi } from '../../api/secureApi';
import type { Product, Comment } from '../../types/types';

// ------------------- FETCH PRODUCTS -------------------
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await secureApi.get<Product[]>('/products');
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch products');
  }
});

// ------------------- ADD PRODUCT -------------------
export const addProduct = createAsyncThunk<
  Product,
  Omit<Product, 'id'>,
  { rejectValue: string }
>('products/add', async (product, { rejectWithValue }) => {
  try {
    const res = await secureApi.post<Product>('/products', product);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add product');
  }
});

// ------------------- DELETE PRODUCT -------------------
export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('products/delete', async (id, { rejectWithValue }) => {
  try {
    await secureApi.delete(`/products/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete product');
  }
});

// ------------------- UPDATE PRODUCT -------------------
export const updateProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>('products/update', async (product, { rejectWithValue }) => {
  try {
    const res = await secureApi.put<Product>(`/products/${product.id}`, product);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update product');
  }
});

// ------------------- ADD COMMENT -------------------
export const addComment = createAsyncThunk<
  Product,
  { productId: number; comment: Comment },
  { rejectValue: string }
>('products/addComment', async ({ productId, comment }, { rejectWithValue }) => {
  try {
    const resProd = await secureApi.get<Product>(`/products/${productId}`);
    const prod = resProd.data;

    const updated: Product = {
      ...prod,
      comments: [...prod.comments, comment],
    };

    const res = await secureApi.put<Product>(`/products/${productId}`, updated);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add comment');
  }
});

// ------------------- DELETE COMMENT -------------------
export const deleteComment = createAsyncThunk<
  Product,
  { productId: number; commentId: number },
  { rejectValue: string }
>('products/deleteComment', async ({ productId, commentId }, { rejectWithValue }) => {
  try {
    const resProd = await secureApi.get<Product>(`/products/${productId}`);
    const prod = resProd.data;

    const updated: Product = {
      ...prod,
      comments: prod.comments.filter((c: Comment) => c.id !== commentId),
    };

    const res = await secureApi.put<Product>(`/products/${productId}`, updated);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete comment');
  }
});
