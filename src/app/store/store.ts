// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../product/productApi';
// import { cartApi } from './product/cartApi';
// import { authApi } from './auth/authApi';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    // [cartApi.reducerPath]: cartApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;