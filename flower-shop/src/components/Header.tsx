import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export const Header = () => {
  const { getItemsCount } = useCart();
  const itemsCount = getItemsCount();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🌸 Flower Shop
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Каталог</Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 Корзина
            {itemsCount > 0 && (
              <span className="cart-badge">{itemsCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
