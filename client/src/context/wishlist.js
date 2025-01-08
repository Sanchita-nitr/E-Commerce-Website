import { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the cart
const WishlistContext = createContext();

// CartProvider component
const WishlistProvider = ({ children }) => {
    // Initialize cart state inside the CartProvider component
    const [wishlist, setWishlist] = useState([]);

    // Load cart items from localStorage only once on component mount
    useEffect(() => {
        const existingWishlistItem = localStorage.getItem('wishlist');
        if (existingWishlistItem) {
            setWishlist(JSON.parse(existingWishlistItem));
        }
    }, []);

    // Update localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <WishlistContext.Provider value={[wishlist, setWishlist]}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the cart context
const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
