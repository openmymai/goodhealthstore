// context/StoreContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import type { Product, CartItem, WishlistItem } from '@/types/product'; // Adjust path

// --- LocalStorage Keys ---
const CART_STORAGE_KEY = 'organicStoreCart';
const WISHLIST_STORAGE_KEY = 'organicStoreWishlist';

// --- Cart Reducer ---
type CartAction =
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number | string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { productId: number | string; quantity: number };
    }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload; // Replace state with loaded data

    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newState = [...state];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          quantity: newState[existingItemIndex].quantity + quantity,
        };
        return newState;
      } else {
        // Item doesn't exist, add new item
        return [...state, { ...product, quantity }];
      }
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => item.id !== action.payload.productId);
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return state.filter((item) => item.id !== productId);
      }
      return state.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    }

    case 'CLEAR_CART':
      return []; // Reset to empty array

    default:
      return state;
  }
};

// --- Context Definition ---
interface StoreContextProps {
  // Cart State & Actions
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number | string) => void;
  updateCartQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean; // Moved from UIContext
  toggleCart: () => void; // Moved from UIContext
  openCart: () => void; // Moved from UIContext
  closeCart: () => void; // Moved from UIContext

  // Wishlist State & Actions
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  toggleWishlist: (product: Product) => void;
  wishlistCount: number;

  // Search (Conceptual - state might live elsewhere, but actions could be here)
  // searchTerm: string;
  // setSearchTerm: (term: string) => void;
  // searchResults: Product[]; // Or managed locally where search happens
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// --- Provider Component ---
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, dispatchCart] = useReducer(cartReducer, []);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart visibility state

  // --- Load initial state from localStorage ---
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        dispatchCart({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
      }
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Clear potentially corrupted data
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }
  }, []);

  // --- Save state to localStorage on change ---
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  // --- Cart Actions ---
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    // TODO: Add API call here in the future
    console.log('Adding to cart (client):', product.id, quantity);
    dispatchCart({ type: 'ADD_ITEM', payload: { product, quantity } });
    openCart(); // Optionally open cart on add
  }, []);

  const removeFromCart = useCallback((productId: number | string) => {
    // TODO: Add API call here
    console.log('Removing from cart (client):', productId);
    dispatchCart({ type: 'REMOVE_ITEM', payload: { productId } });
  }, []);

  const updateCartQuantity = useCallback(
    (productId: number | string, quantity: number) => {
      // TODO: Add API call here
      console.log('Updating cart quantity (client):', productId, quantity);
      dispatchCart({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity },
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    // TODO: Add API call here
    console.log('Clearing cart (client)');
    dispatchCart({ type: 'CLEAR_CART' });
    closeCart(); // Close cart when cleared
  }, []);

  // --- Cart Visibility Actions ---
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // --- Wishlist Actions ---
  const addToWishlist = useCallback((product: Product) => {
    // TODO: Add API call here
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev; // Already exists
      }
      console.log('Adding to wishlist (client):', product.id);
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number | string) => {
    // TODO: Add API call here
    console.log('Removing from wishlist (client):', productId);
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: number | string): boolean => {
      return wishlistItems.some((item) => item.id === productId);
    },
    [wishlistItems]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  // --- Derived State ---
  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  }, [cartItems]);

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  // --- Context Value ---
  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      toggleCart,
      openCart,
      closeCart,
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      wishlistCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      toggleCart,
      openCart,
      closeCart,
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      wishlistCount,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

// --- Custom Hook ---
export const useStore = (): StoreContextProps => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
