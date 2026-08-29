//import React from 'react'
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products"

const Home = () => {
    const products = getProducts();

  return (
    <div className="page">
        <div className="home-hero">
            <h1 className="home-title">Welcome to ShopHub</h1>
            <p className="home-subtitle">Discover Amazing things!</p>

        </div>
        <div className="container">
            <h2 className="page-title">Our Products</h2>
            <div className="product-grid">
                {products.map((product)=>(
        <ProductCard product={product}/>
                ))}

            </div>
        </div>
    </div>
  )
}

export default Home