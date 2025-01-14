// import { createContext, useContext, useEffect, useState } from 'react';

// // Create a context for the cart
// const WishlistContext = createContext();

// // CartProvider component
// const WishlistProvider = ({ children }) => {
//     // Initialize cart state inside the CartProvider component
//     const [wishlist, setWishlist] = useState([]);

//     // Load cart items from localStorage only once on component mount
//     useEffect(() => {
//         const existingWishlistItem = localStorage.getItem('wishlist');
//         if (existingWishlistItem) {
//             setWishlist(JSON.parse(existingWishlistItem));
//         }
//     }, []);

//     // Update localStorage whenever the cart changes
//     useEffect(() => {
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//     }, [wishlist]);

//     return (
//         <WishlistContext.Provider value={[wishlist, setWishlist]}>
//             {children}
//         </WishlistContext.Provider>
//     );
// };

// // Custom hook to use the cart context
// const useWishlist = () => useContext(WishlistContext);

// export { WishlistProvider, useWishlist };
import { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the wishlist
const WishlistContext = createContext();

// WishlistProvider component
const WishlistProvider = ({ children }) => {
    // Initialize wishlist state
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist items from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure window is available
            const existingWishlistItem = localStorage.getItem('wishlist');
            if (existingWishlistItem) {
                try {
                    setWishlist(JSON.parse(existingWishlistItem));
                } catch (error) {
                    console.error('Error parsing wishlist from localStorage:', error);
                }
            }
        }
    }, []);

    // Sync wishlist to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure window is available
            try {
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
            } catch (error) {
                console.error('Error saving wishlist to localStorage:', error);
            }
        }
    }, [wishlist]);

    return (
        <WishlistContext.Provider value={[wishlist, setWishlist]}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the wishlist context
const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export { WishlistProvider, useWishlist };

