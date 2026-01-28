import { Link } from 'react-router-dom';
import type { Flower } from '../types';
import { useCart } from '../context/CartContext';
import './FlowerCard.css';

interface FlowerCardProps {
  flower: Flower;
}

export const FlowerCard = ({ flower }: FlowerCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(flower);
  };

  return (
    <Link to={`/flower/${flower.id}`} className="flower-card">
      <div className="flower-image-wrapper">
        <img src={flower.image} alt={flower.name} className="flower-image" />
        {!flower.available && (
          <div className="unavailable-badge">Нет в наличии</div>
        )}
      </div>

      <div className="flower-info">
        <h3 className="flower-name">{flower.name}</h3>
        <p className="flower-category">{getCategoryName(flower.category)}</p>
        <div className="flower-footer">
          <span className="flower-price">{flower.price} ₽</span>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!flower.available}
          >
            {flower.available ? 'В корзину' : 'Недоступно'}
          </button>
        </div>
      </div>
    </Link>
  );
};

const getCategoryName = (category: string): string => {
  const categories: Record<string, string> = {
    roses: 'Розы',
    tulips: 'Тюльпаны',
    orchids: 'Орхидеи',
    mixed: 'Микс',
  };
  return categories[category] || category;
};
