import React from "react";
import useProductinfo from "../utils/UseProductinfo";
import CategoriesCard from "./CategoriesCard";
import homeimage from "../assets/homeimage.jpg"

function HomePage() {
  const { data, error, loading } = useProductinfo("https://dummyjson.com/products");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="homepage-container">
        <img src={homeimage} alt="" />
      </div>
      <CategoriesCard/>
    </>
  );
}

export default HomePage;




