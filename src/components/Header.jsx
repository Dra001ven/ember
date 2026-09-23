import { NavLink } from 'react-router-dom';
import { restaurantInfo } from '../data.js';
import { useCart } from '../CartContext.jsx';

const navItems = [
  { to: '/about', label: 'Story' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reserve', label: 'Reserve' },
];

const themeIcon = { light: '☀︎', dark: '☾', auto: '◐' };
const themeLabel = { light: 'Light theme', dark: 'Dark theme', auto: 'Auto theme' };

export default function Header({ theme, onToggleTheme }) {
  const { totalCount } = useCart();

  return (
    <header>
      <nav>
        <NavLink className="logo" to="/">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="var(--ember-deep)" />
              <path
                d="M16 7c2.4 3.4-2.2 4.6-2.2 8.2a2.4 2.4 0 1 0 4.8 0c1.2 2.4 0 4.8-2.6 7.3-3.6-1.2-6-4.8-6-8.4 0-3 2.4-5.4 6-7.1Z"
                fill="var(--ember)"
              />
              <path d="M8 24.5c2.6-1.6 5.2-1.6 8 0s5.4 1.6 8 0" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="logo-word">{restaurantInfo.name}</span>
        </NavLink>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            title={themeLabel[theme]}
            aria-label={`Switch theme (currently ${themeLabel[theme]})`}
          >
            {themeIcon[theme]}
          </button>
          <NavLink to="/menu" className="cart-link" aria-label={`View cart, ${totalCount} item${totalCount === 1 ? '' : 's'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="19" cy="21" r="1.4" fill="currentColor" stroke="none" />
              <path d="M2.5 3h2.4l2.1 12.2a2 2 0 0 0 2 1.7h8.6a2 2 0 0 0 2-1.6l1.5-7.6H6.2" />
            </svg>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </NavLink>
          <NavLink className="nav-cta" to="/reserve">Book a table</NavLink>
        </div>
      </nav>
    </header>
  );
}
