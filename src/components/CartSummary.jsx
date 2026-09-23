import { useCart } from '../CartContext.jsx';

export default function CartSummary() {
  const { items, totalCount, totalPrice, setQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <aside className="cart-panel cart-panel-empty">
        <div className="eyebrow">Your order</div>
        <p>Your cart is empty. Add a dish to start your order.</p>
      </aside>
    );
  }

  return (
    <aside className="cart-panel">
      <div className="cart-panel-head">
        <div className="eyebrow">Your order · {totalCount} item{totalCount === 1 ? '' : 's'}</div>
        <button type="button" className="cart-clear" onClick={clearCart}>Clear</button>
      </div>
      <ul className="cart-items">
        {items.map(({ dish, qty }) => (
          <li key={dish.id} className="cart-item">
            <img src={dish.img} alt={dish.name} />
            <div className="cart-item-info">
              <span className="cart-item-name">{dish.name}</span>
              <span className="cart-item-price">{dish.price} × {qty}</span>
            </div>
            <div className="qty-stepper qty-stepper-sm">
              <button type="button" onClick={() => setQuantity(dish.id, qty - 1)} aria-label={`Remove one ${dish.name}`}>−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQuantity(dish.id, qty + 1)} aria-label={`Add one more ${dish.name}`}>+</button>
            </div>
            <button type="button" className="cart-item-remove" onClick={() => removeItem(dish.id)} aria-label={`Remove ${dish.name} from cart`}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Total</span>
        <span>£{totalPrice.toFixed(2)}</span>
      </div>
      <button type="button" className="btn-primary cart-checkout">Checkout</button>
      <p className="cart-hint">Estimate for dine-in ordering. Tax and service added at the table.</p>
    </aside>
  );
}
