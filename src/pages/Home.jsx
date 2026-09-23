import { Link } from 'react-router-dom';
import { categories, dishes, features, heroImages, restaurantInfo } from '../data.js';
import DishCard from '../components/DishCard.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import Testimonials from '../components/Testimonials.jsx';

const arrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function Home() {
  const featured = dishes.slice(0, 3);

  return (
    <>
      <section className="hero">
        <HeroCarousel images={heroImages} />
        <div className="hero-inner wrap">
          <div className="eyebrow">Wood-Fire Coastal Grill · Since 2014</div>
          <h1>
            Cooked over <em>fire</em>,<br />plated with the sea.
          </h1>
          <p className="hero-sub">
            {restaurantInfo.name} is a live-fire kitchen on the harbor: whole fish, charred vegetables and
            dry-aged meat, cooked the way coastal towns have cooked for centuries.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/reserve">
              Reserve a table {arrow}
            </Link>
            <Link className="btn-ghost" to="/menu">View the menu</Link>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item"><b>18:00 – 23:00</b>Tuesday to Sunday</div>
            <div className="hero-meta-item"><b>Harbor Quay 12</b>Bristol Docks</div>
            <div className="hero-meta-item"><b>★ 4.8 / 850 reviews</b>Open table &amp; walk-ins</div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="wrap">
          <div className="category-row">
            {categories.map((cat) => (
              <Link key={cat.id} className="category-chip" to={`/menu?category=${cat.id}`}>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="menu">
        <div className="wrap">
          <div className="menu-top reveal">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>From The Fire</div>
            <h2 style={{ marginTop: 16 }}>Tonight's grill.</h2>
            <p>A short menu, changed daily. This is what's over the coals right now.</p>
          </div>
          <div className="menu-grid">
            {featured.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} style={{ '--d': `${i * 0.06}s` }} />
            ))}
          </div>
          <div className="menu-footer reveal">
            <Link className="btn-ghost" to="/menu" style={{ color: 'var(--ink)', borderColor: 'var(--line-strong)' }}>
              See full menu &amp; wine list
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="promo reveal">
            <div className="promo-copy">
              <div className="eyebrow">Chef's Table Nights</div>
              <h2>20% off the whole table, every Tuesday.</h2>
              <p>Book Tuesday before 7pm and the full table eats off the fire menu at 20% off, drinks included.</p>
              <Link className="btn-primary" to="/reserve" style={{ background: '#fff', color: 'var(--ember-deep)', marginTop: 20 }}>
                Claim Tuesday {arrow}
              </Link>
            </div>
            <div className="promo-media">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=70"
                alt="Fire-grilled sharing platter"
              />
              <div className="promo-badge"><b>20%</b><span>TUESDAYS</span></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={feature.id} className="feature reveal" style={{ '--d': `${i * 0.08}s` }}>
                <FeatureIcon index={i} />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

function FeatureIcon({ index }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3c2 3-2 4-2 7a2 2 0 1 0 4 0c1 2 0 4-2 6-3-1-5-4-5-7 0-2.5 2-4.5 5-6Z" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12c2-6 14-6 16 0-2 6-14 6-16 0Z" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="9" width="16" height="10" rx="2" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
