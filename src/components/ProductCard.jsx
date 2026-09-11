import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-1">${product.price}</p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product.id)}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Add to Cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
