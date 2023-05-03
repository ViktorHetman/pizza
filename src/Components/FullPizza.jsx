import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FullPizza() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getPizzaById = async () => {
      try {
        const { data } = await axios.get('https://6446a21fee791e1e2904f499.mockapi.io/items/' + id);
        setPizza(data);
      } catch (e) {
        alert('Ошибка при получении пиццы');
      }
    };
    getPizzaById();
  }, [id]);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4> от {pizza.price} ₴</h4>
    </div>
  );
}

export default FullPizza;
