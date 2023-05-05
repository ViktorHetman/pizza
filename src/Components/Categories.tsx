import React from 'react';

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (idx: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, setCategoryId }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => (
          <li
            key={idx}
            className={categoryId === idx ? 'active' : ''}
            onClick={() => setCategoryId(idx)}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
