import React from "react";
import useProductinfo from "../utils/UseProductinfo";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");
    const dispatch = useDispatch();

    // Get cart items from Redux state
    const cartItems = useSelector((state) => state.cart.cartItems);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Find the product using the ID from the URL
    const product = data?.products?.find((p) => p.id === parseInt(id));

    if (!product) {
        return <p>Product not found</p>;
    }

    // Check if the product is already in the cart
    const inCart = cartItems.some((item) => item.id === product.id);

    // Get the quantity of the product in the cart
    const quantity = cartItems.find((item) => item.id === product.id)?.quantity || 0;

    // Handle adding product to cart
    const handleAddToCart = () => {
        if (inCart) {
            dispatch(increaseQuantity(product.id)); 
        } else {
            dispatch(addToCart(product)); 
        }
    };

    // Calculate discounted price
    const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

    return (
        product.id && (
            <main className="productDetails">
                {/* Left Side: Product Info */}
                <Link to="/" style={{fontSize:"20px"}}>Home</Link>,
                <div className="flex-1">
                    <h1>{product.title}</h1>
                    <img src={product.thumbnail} alt={product.title} />

                    {/* Add to Cart Button */}
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        {inCart ? `Added (${quantity})` : "Add To Cart"}
                    </button>
                </div>

                {/* Right Side: Product Details */}
                <div className="product-details flex-1">
                    <div>
                        <span style={{fontSize:"30px"}}>Description:</span> {product.description}
                    </div>
                    <br />
                    <div  style={{fontSize:"30px"}}>
                        Category: <span>{product.category}</span>
                    </div>
                    <div  style={{fontSize:"30px"}}>
                        Price: <span>₹{(discountedPrice * 83).toFixed(2)}</span>
                        <span style={{ textDecoration: "line-through", marginLeft: "10px" }}>
                            ₹{(product.price * 83).toFixed(2)}
                        </span>
                    </div>
                    <div  style={{fontSize:"30px"}}>
                        Discounted Percentage: <span>{product.discountPercentage}%</span>
                    </div>
                    <div  style={{fontSize:"30px"}}>
                        Stock: <span>{product.stock}</span>
                    </div>
                    <br />
                    <div  style={{fontSize:"30px"}}>
                        <span>Reviews:</span>
                    </div>
                    <br />
                    <div>
                        {product.reviews?.map((review, index) => (
                            <div key={index} className="review">
                                <div>
                                    <span>Name:</span> {review.reviewerName}
                                </div>
                                <div>
                                    <span>Comment:</span> {review.comment}
                                </div>
                                <div>
                                    <span>Rating:</span>{" "}
                                    <Star className="inline-block" width="12" height="12" />{" "}
                                    {review.rating}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        )
    );
}

export default ProductDetails;
