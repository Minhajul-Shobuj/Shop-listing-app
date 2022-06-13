import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../slices/shopSlies';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
