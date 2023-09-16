import { configureStore } from '@reduxjs/toolkit';
import { weathersApi, weathersGeoApi, weathersIconApi } from '../services/Api';

export const store = configureStore({
  reducer: {
    [weathersApi.reducerPath]: weathersApi.reducer,
    [weathersGeoApi.reducerPath]: weathersGeoApi.reducer,
    [weathersIconApi.reducerPath]: weathersIconApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weathersApi.middleware, weathersGeoApi.middleware, weathersIconApi.middleware),
});
