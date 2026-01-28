import { useParams, useNavigate } from 'react-router-dom';
import { flowers } from '../data/flowers';
import { useCart } from '../context/CartContext';
import './FlowerDetailPage.css';

export const FlowerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const flower = flowers.find((f) => f.id === id);

  if (!flower) {
    return (
      <div className="detail-page">
        <div className="not-found">
          <h2>Цветок не найден</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(flower);
    navigate('/cart');
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

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)} className="back-link">
        ← Назад
      </button>

      <div className="detail-container">
        <div className="detail-image-wrapper">
          <img src={flower.image} alt={flower.name} className="detail-image" />
          {!flower.available && (
            <div className="unavailable-overlay">Нет в наличии</div>
          )}
        </div>

        <div className="detail-info">
          <span className="detail-category">{getCategoryName(flower.category)}</span>
          <h1 className="detail-name">{flower.name}</h1>
          <p className="detail-description">{flower.description}</p>

          <div className="detail-price-section">
            <span className="detail-price">{flower.price} ₽</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!flower.available}
            className="detail-add-btn"
          >
            {flower.available ? 'Добавить в корзину' : 'Недоступно'}
          </button>

          <div className="detail-features">
            <h3>Особенности:</h3>
            <ul>
              <li>Свежие цветы напрямую от поставщиков</li>
              <li>Доставка в день заказа</li>
              <li>Гарантия свежести 7 дней</li>
              <li>Бесплатная открытка к букету</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
