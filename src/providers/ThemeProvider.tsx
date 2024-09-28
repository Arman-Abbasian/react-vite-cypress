import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the theme types
type Theme = 'light' | 'dark';

// Define the state shape
interface ThemeState {
  theme: Theme;
}

// Define the actions
type Action = { type: 'TOGGLE_THEME' };

// Initial state
const initialState: ThemeState = {
  theme: 'light', // default theme
};

// Create the reducer
const themeReducer = (state: ThemeState, action: Action): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

// Create the context
const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Create a provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
