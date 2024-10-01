import React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, getQuantity } from "../redux/cartSlice";

function ProductItem({ product }) {
    
    const dispatch = useDispatch()

    const cartItems = useSelector(state => state.cart.cartItems);
  
    const inCart = cartItems.some(item => item.id === product.id);
  
    const quantity = cartItems.find(item => item.id === product.id)?.quantity || 0;
  
    const handleAddToCart = (e) => {
      e.stopPropagation();
      if (inCart) {
        dispatch(increaseQuantity(product.id)); 
      } else {
        dispatch(addToCart(product));
      }
    };

    const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

    return (
        
        <div className="product-item">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <ul className="product-details">
                <li className="product-title">{product.title}</li>
                <li className="product-category">{product.category}</li>
                <li className="discount-price">₹{(discountedPrice* 83).toFixed(2)}</li>
                <li className="product-amount">₹{(product.price * 83).toFixed(2)}</li>
                <button  className="view-details">
                    <Link to={`/productdetails/${product.id}`} className="view-detailsLink">View Details </Link>
                </button>
            </ul>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
        {inCart ? `Added (${quantity})` : "Add To Cart"}
      </button>
        </div>
    );
}

export default ProductItem;
