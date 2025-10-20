import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './features/products/ProductList';
import ProductDetails from './features/products/ProductDetails';
import { useAppDispatch } from './hooks/hooks';
import { fetchProducts } from './features/products/productsSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return ( 
    <div>
      <nav>
        <Link to="/">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;
