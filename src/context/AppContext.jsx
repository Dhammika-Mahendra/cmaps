import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showAdminBoundaries, setShowAdminBoundaries] = useState(false);
  const [showColomboCity, setShowColomboCity] = useState(false);
  const [showAdminColors, setShowAdminColors] = useState(false);
  const [showColomboColors, setShowColomboColors] = useState(false);
  const [showLGBoundaries, setShowLGBoundaries] = useState(false);
  const [showAdminLabels, setShowAdminLabels] = useState(false);
  const [showLGLabels, setShowLGLabels] = useState(false);
  const [showColomboLabels, setShowColomboLabels] = useState(false);
  const [showBusRoutes, setShowBusRoutes] = useState(false);

  const value = {
    showAdminBoundaries,
    setShowAdminBoundaries,
    showLGBoundaries,
    setShowLGBoundaries,
    showColomboCity,
    setShowColomboCity,
    showAdminColors,
    setShowAdminColors,
    showColomboColors,
    setShowColomboColors,
    showAdminLabels,
    setShowAdminLabels,
    showLGLabels,
    setShowLGLabels,
    showColomboLabels,
    setShowColomboLabels,
    showBusRoutes,
    setShowBusRoutes
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
