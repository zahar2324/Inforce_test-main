
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/types';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addComment,
  deleteComment
} from '../thunks/productsThunks';


import { initialState } from '../../types/types';



const updateItem = (items: Product[], updated: Product) =>
  items.map(p => (p.id === updated.id ? updated : p));

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    
      .addCase(fetchProducts.pending, state => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        console.log('hi')
        console.log('Fetched products:', action.payload);
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
        state.items = updateItem(state.items, action.payload);
      })
   
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items = updateItem(state.items, action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items = updateItem(state.items, action.payload);
      });
  },
});

export default productsSlice.reducer;

