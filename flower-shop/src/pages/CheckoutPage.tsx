import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      phone: '',
      address: '',
    };

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Введите имя (минимум 2 символа)';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = 'Введите адрес доставки (минимум 5 символов)';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.address;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert(
      `Заказ оформлен!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nАдрес: ${formData.address}\nСумма: ${getTotalPrice()} ₽\n\nСпасибо за заказ!`
    );

    clearCart();
    navigate('/');
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Контактные данные</h2>

          <div className="form-group">
            <label htmlFor="name">Имя *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'error' : ''}
              placeholder="Иван Иванов"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон *</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'error' : ''}
              placeholder="+7 (999) 123-45-67"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес доставки *</label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={errors.address ? 'error' : ''}
              placeholder="ул. Цветочная, д. 1, кв. 1"
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="comment">Комментарий к заказу</label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              placeholder="Пожелания к доставке..."
              rows={4}
            />
          </div>

          <button type="submit" className="submit-btn">
            Подтвердить заказ
          </button>
        </form>

        <div className="order-summary">
          <h2>Ваш заказ</h2>

          <div className="order-items">
            {items.map((item) => (
              <div key={item.flower.id} className="order-item">
                <img src={item.flower.image} alt={item.flower.name} />
                <div className="order-item-info">
                  <h4>{item.flower.name}</h4>
                  <p>{item.quantity} шт. × {item.flower.price} ₽</p>
                </div>
                <span className="order-item-total">
                  {item.quantity * item.flower.price} ₽
                </span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Итого:</span>
            <span className="total-amount">{getTotalPrice()} ₽</span>
          </div>

          <div className="delivery-info">
            <h3>Условия доставки</h3>
            <ul>
              <li>Бесплатная доставка от 3000 ₽</li>
              <li>Доставка в день заказа</li>
              <li>Оплата при получении</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
