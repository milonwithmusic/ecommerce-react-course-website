import { useNavigate, useParams } from "react-router";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { getProductById } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  console.log(product);
  console.log(product?.image);
  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail text-amber-500 text-xl">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-content">
          <h1 className="product-detail-name">{product.name}</h1>
        </div>
        <div className="product-detail-price">${product.price}</div>
        <div className="product-detail-description">{product.description}</div>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart {productQuantityLabel}
        </button>
      </div>
    </div>
  );
}
