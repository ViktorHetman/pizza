function Categories({ categoryId, setCategoryId }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];

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
}

export default Categories;
