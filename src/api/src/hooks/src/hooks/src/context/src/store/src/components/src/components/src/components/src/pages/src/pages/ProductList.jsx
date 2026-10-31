import React, { useCallback } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { fetchProducts } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { ProductCard } from '../components/ProductCard';

export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchFn = useCallback((signal) => fetchProducts(signal), []);
  const { loading, error, data } = useFetch(fetchFn, [fetchFn]);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const handleSearchChange = (e) => {
    const newQ = e.target.value;
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (newQ) {
        nextParams.set('q', newQ);
      } else {
        nextParams.delete('q');
      }
      return nextParams;
    });
  };

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (newCat) {
        nextParams.set('category', newCat);
      } else {
        nextParams.delete('category');
      }
      return nextParams;
    });
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  const products = data?.products || [];

  // Derive categories dynamically from loaded products
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  // Derived filtered products during render
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === '' || product.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      {/* Nested outlet renders ProductDetail if navigating /products/:id */}
      <Outlet />

      <h2>Product Catalog</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearchChange}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found matching your filters.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}