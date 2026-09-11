import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    const existingCart = cartItems.find((item) => item.id === productId);

    if (existingCart) {
      const currentQuantity = existingCart.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item,
      );
      setCartItems(updatedCartItems);
    } else {
      //cartItems.push({ id: productId, quantity: 1 });
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts(){
    return cartItems.map(item=>({
      ...item,
      product:getProductById(item.id)
    })).filter(item=>item.product);
  }

  return(    
    <CartContext.Provider value={{cartItems, addToCart, getCartItemsWithProducts}}>{children}</CartContext.Provider>
  ); 
}

export default CartProvider;
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
