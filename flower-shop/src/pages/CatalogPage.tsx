import { useState } from 'react';
import { flowers } from '../data/flowers';
import { FlowerCard } from '../components/FlowerCard';
import type { FilterCategory } from '../types';
import './CatalogPage.css';

export const CatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const filteredFlowers = flowers.filter((flower) => {
    const matchesSearch = flower.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || flower.category === selectedCategory;
    const matchesPrice = flower.price >= priceRange[0] && flower.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Каталог цветов</h1>
        <p>Выберите идеальный букет для любого случая</p>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск цветов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Все
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'roses' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('roses')}
          >
            Розы
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'tulips' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('tulips')}
          >
            Тюльпаны
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'orchids' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('orchids')}
          >
            Орхидеи
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'mixed' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('mixed')}
          >
            Микс
          </button>
        </div>

        <div className="price-filter">
          <label>
            Цена: {priceRange[0]} - {priceRange[1]} ₽
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="price-slider"
            />
          </label>
        </div>
      </div>

      <div className="flowers-grid">
        {filteredFlowers.length > 0 ? (
          filteredFlowers.map((flower) => (
            <FlowerCard key={flower.id} flower={flower} />
          ))
        ) : (
          <div className="no-results">
            <p>Цветы не найдены. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </div>
  );
};
