import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './features/products/ProductList/ProductList';
import ProductDetails from './features/products/ProductDetails/ProductDetails';
import { useAppDispatch } from './hooks/hooks';
import { fetchProducts } from './store/thunks/productsThunks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return ( 
    <div>
      <nav>
        <Link className='home' to="/">Products <span>{`<`}</span></Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;
