import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, dishes } from '../data.js';
import DishCard from '../components/DishCard.jsx';
import CartSummary from '../components/CartSummary.jsx';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
      const matchesQuery = dish.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const selectCategory = (id) => {
    if (id === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: id });
    }
  };

  return (
    <section style={{ paddingTop: 48 }}>
      <div className="wrap">
        <div className="menu-top reveal">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Full Menu</div>
          <h2 style={{ marginTop: 16 }}>Everything over the fire.</h2>
          <p>Filter by course, add what you like, and it lands in your order on the right.</p>
        </div>

        <div className="menu-controls reveal">
          <div className="category-row">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-chip${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => selectCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="menu-search"
            placeholder="Search dishes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search dishes"
          />
        </div>

        <div className="menu-layout">
          {filtered.length > 0 ? (
            <div className="menu-grid">
              {filtered.map((dish, i) => (
                <DishCard key={dish.id} dish={dish} style={{ '--d': `${(i % 6) * 0.06}s` }} showCart />
              ))}
            </div>
          ) : (
            <p className="menu-empty">No dishes match "{query}" in this category.</p>
          )}

          <CartSummary />
        </div>
      </div>
    </section>
  );
}
