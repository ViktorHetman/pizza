import { useEffect, useRef, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';

import Categories from '../Components/Categories';
import Sort, { list } from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas } from '../redux/slices/pizzasSlice';

import { selectFilter } from '../redux/slices/filterSlice';
import { selectPizza } from '../redux/slices/pizzasSlice';
import { selectFilterValue } from '../redux/slices/filterSlice';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const searchValue = useSelector(selectFilterValue);

  const changeCategoryHandler = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const changePageHandler = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage: String(currentPage), category, sortBy, order, search }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[1],
        }),
      );
      isSearch.current = true;
    }
    isMounted.current = true;
  }, [dispatch]);

  useEffect(() => {
    getPizzas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        searchValue,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage, navigate]);

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(10)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={changeCategoryHandler} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'rejected' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'pending' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={changePageHandler} />
    </div>
  );
};

export default Home;
