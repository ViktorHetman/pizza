import { RootState } from '../store';

export const selectFilter = (state: RootState) => state.filter;

export const selectFilterValue = (state: RootState) => state.filter.searchValue;
