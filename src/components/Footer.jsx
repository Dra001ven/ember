import { restaurantInfo } from '../data.js';

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-row">
        <span>© 2026 {restaurantInfo.name} · Harbor Quay, Bristol</span>
        <span>Wood-fired since 2014</span>
      </div>
    </footer>
  );
}
