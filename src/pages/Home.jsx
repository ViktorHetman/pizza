import { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';
import { list } from '../Components/Sort';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeCategoryHandler = (id) => {
    dispatch(setCategoryId(id));
  };

  const changePageHandler = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://6446a21fee791e1e2904f499.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, navigate]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(10)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={changeCategoryHandler} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} setCurrentPage={changePageHandler} />
    </div>
  );
}

export default Home;
