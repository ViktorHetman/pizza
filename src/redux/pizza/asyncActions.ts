import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://6446a21fee791e1e2904f499.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
