import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './Components/FullPizza';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

export const SearchContext = createContext();
function App() {
  const searchValue = useSelector((state) => state.filter.searchValue);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
