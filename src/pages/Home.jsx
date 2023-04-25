import React, { useEffect, useState } from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import PizzaBlock from '../Components/PizzaBlock';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://6446a21fee791e1e2904f499.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, idx) => <Skeleton key={idx} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
}

export default Home;
