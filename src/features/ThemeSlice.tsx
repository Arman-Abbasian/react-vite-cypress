// src/store/slices/themeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the theme types
export type Theme = 'light' | 'dark';

// Define the state shape
interface ThemeState {
  theme: Theme;
}

// Initial state
const initialState: ThemeState = {
  theme: 'light', // default theme
};

// Create the slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

// Export actions and reducer
export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
