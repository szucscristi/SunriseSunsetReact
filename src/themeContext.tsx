import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

interface Theme {
  backgroundColor: string;
  textColor: string;
}

const lightTheme: Theme = {
  backgroundColor: '#fff',
  textColor: '#000',
};

const darkTheme: Theme = {
  backgroundColor: '#000',
  textColor: '#fff',
};

interface ThemeContextProps {
  isDarkTheme: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  isDarkTheme: false,
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
