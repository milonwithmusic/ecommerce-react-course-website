import ProductCard from "../components/ProductCard";
import { getProductById } from "../data/products";

const Home = () => {
  const products = getProductById();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopHub</h1>
        <p className="text-lg md:text-xl">Discover Amazing Things!</p>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
