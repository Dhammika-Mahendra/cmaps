import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showAdminBoundaries, setShowAdminBoundaries] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  const value = {
    showAdminBoundaries,
    setShowAdminBoundaries,
    showLabels,
    setShowLabels,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
