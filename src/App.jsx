import { useEffect, useState } from 'react';

import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import Skeleton from './Components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
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
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
