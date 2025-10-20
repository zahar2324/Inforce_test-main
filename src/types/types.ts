export interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

export interface Size {
  width: number;
  height: number;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: Comment[];
}



export interface ProductsState {
  items: Product[];
  loading: boolean;
  error?: string;
}

export const initialState: ProductsState = {
  items: [],
  loading: false,
};