import { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className={activeIndex === idx ? 'active' : ''}
            onClick={() => setActiveIndex(idx)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
