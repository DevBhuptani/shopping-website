import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shoppingReducer from './slices/shoppingSlice';
import userReducer from './slices/userSlice';

const rootReducer = {
  auth: authReducer,
  shopping: shoppingReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
