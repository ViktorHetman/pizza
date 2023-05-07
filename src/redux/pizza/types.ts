export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: [number, number, number];
  types: [number, number];
};

export type SearchPizzaParams = {
  currentPage: string;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

export enum Status {
  LOADING = 'pending',
  SUCCESS = 'fulfilled',
  ERROR = 'rejected',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
