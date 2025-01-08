import { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// CartProvider component
const CartProvider = ({ children }) => {
    // Initialize cart state inside the CartProvider component
    const [cart, setCart] = useState([]);

    // Load cart items from localStorage only once on component mount
    useEffect(() => {
        const existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem));
        }
    }, []);

    // Update localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
