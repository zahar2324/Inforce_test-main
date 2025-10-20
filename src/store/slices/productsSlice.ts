// src/store/slices/productsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
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
  error: undefined,
};

const updateItem = (items: Product[], updated: Product) =>
  items.map(p => (p.id === updated.id ? updated : p));

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    // Fetch products
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      //  Add product 
      .addCase(addProduct.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      //Delete product
      .addCase(deleteProduct.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.items = updateItem(state.items, action.payload);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add comment 
      .addCase(addComment.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.items = updateItem(state.items, action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete comment
      .addCase(deleteComment.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.items = updateItem(state.items, action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
