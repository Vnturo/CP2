import React, { createContext, useState, useContext } from 'react';


const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  return useContext(AppContext);
};
