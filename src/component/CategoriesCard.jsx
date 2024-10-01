import React, { useMemo } from "react";
import useProductinfo from "../utils/UseProductinfo";
import ProductsList from "./ProductsList";
import { Link } from "react-router-dom";

function CategoriesCard() {

    const {data, error, loading} = useProductinfo("https://dummyjson.com/products");

    const filterCategories = useMemo(()=> {
        if(data && data.products) {
            const categories = data.products.map((product) => product.category);
            // console.log(categories)
            return [...new Set(categories)]
        }
        return [];

    }, [data]);

    if (loading) return <p className="loading">Loading</p>
    if(error) return <p className="error"> Error : {error.message}</p>
    return (
        <>
        
      <section className="categories-container">
        <div className="categories-card">
            <h2>Featured Categories</h2>
            <h3>Discover Your Favorite Products</h3>

            <div className="categories">
                {
                    filterCategories.map((category)=> {
                        const product = data.products.find((product)=> product.category === category);
                        return product ? (
                            <>
                            <Link to="/CategoriesProducts" className="categories-cardsection" key={category}>
                                <div className="categories-img">
                                    <img src={product.thumbnail}  />
                                </div>
                            <div className="categories-cardtitle">
                            <h3>{category}</h3>
                            </div>
                            </Link>
                        
                            </>
                        ) :null;
                    })
                }
            </div>
          </div>
      </section>
      <ProductsList/>
        </>
    )
}

export default CategoriesCard;


