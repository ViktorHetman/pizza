import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка корзины...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Загрузка страницы...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
