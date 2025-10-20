import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, Comment } from '../../types/types';
import { api } from '../../api/api';


export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await api.get<Product[]>('/products');
  return res.data;
});

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: Omit<Product, 'id'>) => {
    const res = await api.post<Product>('/products', product);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: number) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: Product) => {
   
    const res = await api.put<Product>(`/products/${product.id}`, product);

    return res.data;
  }
);

export const addComment = createAsyncThunk(
  'products/addComment',
  async ({ productId, comment }: { productId: number; comment: Comment }) => {
    const prod = (await api.get<Product>(`/products/${productId}`)).data;
    const newComments = [...prod.comments, comment];
    const updated = { ...prod, comments: newComments };
    const res = await api.put<Product>(`/products/${productId}`, updated);
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  'products/deleteComment',
  async ({ productId, commentId }: { productId: number; commentId: number }) => {
    const prod = (await api.get<Product>(`/products/${productId}`)).data;
    const newComments = prod.comments.filter(c => c.id !== commentId);
    const updated = { ...prod, comments: newComments };
    const res = await api.put<Product>(`/products/${productId}`, updated);
    return res.data;
  }
);


interface ProductsState {
  items: Product[];
  loading: boolean;
  error?: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
       state.items = state.items.map(p => String(p.id) === String(action.payload.id) ? action.payload : p);
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items = state.items.map(p => String(p.id) === String(action.payload.id) ? action.payload : p);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items = state.items.map(p => String(p.id) === String(action.payload.id) ? action.payload : p);
      });
  }
});

export default productsSlice.reducer; 









/*

import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/types';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addComment,
  deleteComment,
} from '../thunks/productsThunks';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error?: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
       state.items = state.items.map(p => String(p.id) === String(action.payload.id) ? action.payload : p);
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items = state.items.map(p => String(p.id) === String(action.payload.id) ? action.payload : p);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items = state.items.map(p => String(p.id) === String(action.payload.id) ? action.payload : p);
      });
  }
});

export default productsSlice.reducer;




*/


