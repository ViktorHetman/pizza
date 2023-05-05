import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: [number, number, number];
  types: [number, number];
};

interface PizzaSliceState {
  items: PizzaItem[];
  status: 'pending' | 'fulfilled' | 'rejected';
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://6446a21fee791e1e2904f499.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: 'pending',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'pending';
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'rejected';
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
