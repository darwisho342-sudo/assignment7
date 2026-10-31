import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>Welcome to the Shop</h1>
      <p>Explore our catalog of products and enjoy seamless shopping.</p>
      <Link to="/products">Browse Catalog</Link>
    </div>
  );
}