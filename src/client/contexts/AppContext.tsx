import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Brand, User } from '../types';

interface AppContextType {
  brand: Brand;
  setBrand: (brand: Brand) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [brand, setBrand] = useState<Brand>('LU1');
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    permisos: [
      { funcion: 'ver' },
      { funcion: 'editar' },
      { funcion: 'administracion' },
    ],
  });

  return (
    <AppContext.Provider value={{ brand, setBrand, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
