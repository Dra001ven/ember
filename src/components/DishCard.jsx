import { useCart } from '../CartContext.jsx';

export default function DishCard({ dish, style, showCart = false }) {
  const { quantities, addItem, setQuantity } = useCart();
  const qty = quantities[dish.id] || 0;

  return (
    <div className="dish reveal" style={style}>
      <div className="dish-media">
        <img src={dish.img} alt={dish.name} loading="lazy" />
      </div>
      <div className="dish-body">
        <div className="dish-row">
          <span className="dish-name">{dish.name}</span>
          <span className="dish-price">{dish.price}</span>
        </div>
        <p className="dish-desc">{dish.desc}</p>
        <div className="dish-foot">
          <span className="dish-tag">{dish.tag}</span>
          <span className="dish-rating">
            <span className="star">★</span> {dish.rating.toFixed(1)} ({dish.reviews})
          </span>
        </div>

        {showCart && (
          <div className="dish-cart-row">
            {qty === 0 ? (
              <button type="button" className="add-to-cart" onClick={() => addItem(dish.id)}>
                Add to cart
              </button>
            ) : (
              <div className="qty-stepper">
                <button type="button" onClick={() => setQuantity(dish.id, qty - 1)} aria-label={`Remove one ${dish.name}`}>
                  −
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQuantity(dish.id, qty + 1)} aria-label={`Add one more ${dish.name}`}>
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
