import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, type) => {
    if (type === 'increase') {
      dispatch(increaseQuantity(id));
    } else if (type === 'decrease') {
      dispatch(decreaseQuantity(id));
    }
  };

  const calculateDiscountedSubtotal = () =>
    cartItems.reduce((total, item) => {
      const discountPrice = item.price - (item.price * item.discountPercentage / 100);
      return total + discountPrice * item.quantity * 83; // Convert to INR
    }, 0).toFixed(2);

  return (
    <div className="shopping-cart">
      <Link to="/" className="back-button">Back to Home</Link>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            const discountPrice = item.price - (item.price * item.discountPercentage / 100);

            return (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  <p>Price: ₹{(discountPrice * 83).toFixed(2)}
                    <span style={{marginLeft: "10px", color : "red", textDecoration : "line-through"}}>
                      ₹{(item.price * 83).toFixed(2)}
                    </span>
                  </p>
                  <p>Quantity: 
                    <button onClick={() => handleUpdateQuantity(item.id, 'decrease')} disabled={item.quantity <= 1}>-</button>
                    {item.quantity}
                    <button onClick={() => handleUpdateQuantity(item.id, 'increase')}>+</button>
                  </p>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="cart-summary">
        <p>Subtotal: ₹{calculateDiscountedSubtotal()}</p>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
