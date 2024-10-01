import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/ThemeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Add other reducers here if you have more slices
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
