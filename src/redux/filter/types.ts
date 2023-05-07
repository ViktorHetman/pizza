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
