import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  // Computed derived value during render
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products to add items</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{ margin: '0 0.5rem' }}>{item.quantity}</span>
                <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={clear}>Clear Cart</button>
      </div>
    </div>
  );
}