// src/context/CartContext.tsx
'use client';

import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from 'react';

// --- Types ---
export interface CartItem {
  id: number;
  name: string;
  price: number; // Store price as number
  quantity: number;
  imageUrl?: string | null;
  slug: string;
  stock: number; // Available stock for reference
}

interface CartState {
  items: CartItem[];
  // Add other cart state like total amount, count etc. later if needed
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'LOAD_CART'; payload: CartItem[] } // Action to load from storage
  | { type: 'CLEAR_CART' };

// --- Initial State ---
const initialState: CartState = {
  items: [],
};

// --- Reducer ---
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Item exists, update quantity (ensure not exceeding stock)
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + action.payload.quantity;
            // Optional: Clamp quantity to stock available
            // const finalQuantity = Math.min(newQuantity, item.stock);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      } else {
        // Item is new, add it
        newItems = [...state.items, action.payload];
      }
      return { ...state, items: newItems };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, items: newItems };
    }

    case 'UPDATE_QUANTITY': {
      // Ensure quantity is at least 1
      const newQuantity = Math.max(1, action.payload.quantity);
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: newQuantity }
          : item
      );
      // Optional: Add logic to remove item if quantity becomes 0 after update (though button prevents < 1)
      return { ...state, items: newItems };
    }

    case 'LOAD_CART': {
      return { ...state, items: action.payload };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};

// --- Context ---
interface CartContextType {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// --- Provider ---
interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'goodHealthCart';

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // Basic validation of loaded data structure (can be more robust)
        if (Array.isArray(parsedCart)) {
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        } else {
          console.warn('Invalid cart data found in localStorage.');
          localStorage.removeItem(CART_STORAGE_KEY); // Clear invalid data
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem(CART_STORAGE_KEY); // Clear potentially corrupted data
    }
  }, []); // Empty dependency array means run only once on mount

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    // Avoid saving the initial empty state before loading from storage
    if (state !== initialState) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [state]); // Run whenever the state object changes

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
