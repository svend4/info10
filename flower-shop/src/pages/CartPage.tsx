import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Корзина пуста</h2>
          <p>Добавьте цветы из каталога, чтобы сделать заказ</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Корзина</h1>
        <button onClick={clearCart} className="clear-cart-btn">
          Очистить корзину
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.flower.id} className="cart-item">
              <img src={item.flower.image} alt={item.flower.name} className="cart-item-image" />

              <div className="cart-item-info">
                <h3>{item.flower.name}</h3>
                <p className="cart-item-price">{item.flower.price} ₽</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.flower.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.flower.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  {item.flower.price * item.quantity} ₽
                </p>

                <button
                  onClick={() => removeFromCart(item.flower.id)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Итого</h2>
          <div className="summary-row">
            <span>Товаров:</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
          </div>
          <div className="summary-row total">
            <span>Общая сумма:</span>
            <span className="total-price">{getTotalPrice()} ₽</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="checkout-btn">
            Оформить заказ
          </button>

          <button onClick={() => navigate('/')} className="continue-btn">
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
};
