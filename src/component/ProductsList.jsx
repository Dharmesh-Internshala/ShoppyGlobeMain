import React from "react";
import useProductinfo from "../utils/UseProductinfo";
import ProductItem from "./ProductItems";

function ProductsList() {
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Ensure data exists and has products before rendering
    if (!data || !data.products) {
        return <div>No products available</div>;
    }

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="productitem-container">
                {data.products.map((product, id) => (
                    <ProductItem key={id} product = {product}></ProductItem>   
                ))}
                </div>
        </div>
    );
}

export default ProductsList;
