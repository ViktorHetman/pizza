import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'raiting',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface filterSliceState {
  categoryId: number;
  currentPage: number;
  sort: Sort;
  searchValue: string;
}

const initialState: filterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности(DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const selectFilterValue = (state: RootState) => state.filter.searchValue;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
