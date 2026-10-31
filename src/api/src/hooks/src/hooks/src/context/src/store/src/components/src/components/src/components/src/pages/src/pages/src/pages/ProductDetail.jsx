import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { useCartStore } from '../store/cartStore';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fetchFn = useCallback((signal) => fetchProduct(id, signal), [id]);
  const { loading, error, data: product } = useFetch(fetchFn, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) {
    return (
      <div style={{ padding: '1rem' }}>
        <h3>Product Not Found</h3>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Catalog</button>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #007bff', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px' }}>
      <button onClick={() => navigate('/products')}>← Back to Catalog</button>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}