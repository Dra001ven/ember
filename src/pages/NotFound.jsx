import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}>
      <div className="eyebrow" style={{ justifyContent: 'center' }}>404</div>
      <h2 style={{ marginTop: 16 }}>This table isn't set.</h2>
      <p style={{ color: 'var(--ink-muted)', marginTop: 10 }}>The page you're looking for doesn't exist.</p>
      <Link className="btn-primary" to="/" style={{ marginTop: 24, display: 'inline-flex' }}>Back to the fire</Link>
    </section>
  );
}
