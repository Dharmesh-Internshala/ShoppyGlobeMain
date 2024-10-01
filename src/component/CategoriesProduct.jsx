import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProductinfo from "../utils/UseProductinfo";

const CategoriesProduct = () => {
    const { category } = useParams();
    const [filterCategory, setFilterCategory] = useState(category || "All");
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");

    useEffect(() => {
        setFilterCategory(category || "All");
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredProducts = filterCategory === "All"
        ? data?.products || []
        : (data?.products || []).filter(product => product.category === filterCategory);

    const uniqueCategories = data?.products
        ? ["All", ...new Set(data.products.map(product => product.category))]
        : [];

    return (
        <div className="container">
            {/* Back to Home Link */}
            <Link to="/" className="back-home">
                Home
            </Link>

            {/* Navigation Section for Categories */}
            <div className="categories-nav">
                {uniqueCategories.map((categories) => (
                    <button
                        key={categories}
                        onClick={() => setFilterCategory(categories)}
                        className={`category-button ${filterCategory === categories ? "active" : ""}`}
                    >
                        {categories.charAt(0).toUpperCase() + categories.slice(1)}
                    </button>
                ))}
            </div>

            {/* Product List */}
            <div className="product-grid">
                {filteredProducts.map((product) => {
                    // Calculate discount price
                    const discountPrice = product.price - (product.price * product.discountPercentage / 100);
    
                    return (
                        <div key={product.id} className="product-card">
                            <Link to={`/productdetails/${product.id}`}>
                                <img src={product.thumbnail} alt={product.title} className="product-image" />
                            </Link>
                            <div className="product-info">
                                <p className="product-category">{product.category}</p>
                                <h3 className="product-title">{product.title}</h3>
                                {/* Display Discounted Price */}
                                <h3 className="discount-price">₹{(discountPrice * 83).toFixed(2)}</h3>
                                {/* Original price for reference */}
                                <p className="product-price">
                                    <span style={{ textDecoration: 'line-through', color: 'red' }}>₹{(product.price * 83).toFixed(2)}</span>
                                </p>
                                <Link to={`/productdetails/${product.id}`} style={{color: "blue", cursor:"pointer", fontSize:"18px"}}>View Details</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesProduct;
