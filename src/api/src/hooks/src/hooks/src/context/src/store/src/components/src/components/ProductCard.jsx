import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <h3>{product.title}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/products/${product.id}`}>View Details</Link>
        <button onClick={() => addItem(product)}>Add to Cart</button>
      </div>
    </div>
  );
}