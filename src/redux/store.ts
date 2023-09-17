import { configureStore } from '@reduxjs/toolkit';
import { weathersApi, weathersGeoApi } from '../services/Api';

export const store = configureStore({
  reducer: {
    [weathersApi.reducerPath]: weathersApi.reducer,
    [weathersGeoApi.reducerPath]: weathersGeoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weathersApi.middleware, weathersGeoApi.middleware),
});
