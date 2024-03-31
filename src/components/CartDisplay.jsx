import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../public/App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/carts?limit=5');
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>; 
  }

  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1> 
      {cartItems.map(cart => (
        <div key={cart.id} className="cart"> 
          <h2 className="cart-id">Cart ID: {cart.id}</h2>
          <h3 className="products-title">Products:</h3> 
          <ul className="product-list"> 
            {cart.products.map(product => (
              <li key={product.id} className="product"> 
                <div className="product-title">{product.title}</div> 
                <div className="product-price">Price: ${product.price}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;