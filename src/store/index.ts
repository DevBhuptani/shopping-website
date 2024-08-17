import { configureStore } from '@reduxjs/toolkit';
import shoppingSlice from './slices/shoppingSlice';

const rootReducer = {
  shopping: shoppingSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
