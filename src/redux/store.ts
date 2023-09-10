import { configureStore } from '@reduxjs/toolkit';
import { weathersApi } from '../services/Api';

export const store = configureStore({
  reducer: {
    [weathersApi.reducerPath]: weathersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weathersApi.middleware),
});
