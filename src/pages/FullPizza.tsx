import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPizzaById = async () => {
      try {
        const { data } = await axios.get('https://6446a21fee791e1e2904f499.mockapi.io/items/' + id);
        setPizza(data);
      } catch (e) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    };
    getPizzaById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4> от {pizza.price} ₴</h4>
      <Link to={'/'}>
        <button className="button button--outline button--add">
          <span>Назад!</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
