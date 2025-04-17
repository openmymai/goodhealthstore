// context/UIContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextProps {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  toggleCart: () => void;
  toggleMenu: () => void;
  openCart: () => void;
  closeCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

// สร้าง Context พร้อมค่าเริ่มต้น (อาจจะเป็น undefined หรือค่าเริ่มต้นที่เหมาะสม)
const UIContext = createContext<UIContextProps | undefined>(undefined);

// สร้าง Provider Component
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const value = {
    isCartOpen,
    isMenuOpen,
    toggleCart,
    toggleMenu,
    openCart,
    closeCart,
    openMenu,
    closeMenu,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// สร้าง Custom Hook เพื่อให้ใช้ง่ายขึ้น
export const useUI = (): UIContextProps => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
