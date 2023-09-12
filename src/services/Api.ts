import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, baseUrlGeo } from '../utils/BaseUrl';
import { WeatherData } from './Api/models/WeatherData';
import { GeoLocation } from './Api/models/GeoLocation';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weathersApi = createApi({
  reducerPath: 'weathersApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    weather: builder.query<WeatherData, void>({
      query: () => `/weather?lat=28.644800&lon=77.216721&appid=${API_KEY}`,
    }),
  }),
});

export const { useWeatherQuery } = weathersApi;

export const weathersGeoApi = createApi({
  reducerPath: 'weathersGeoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlGeo }),
  endpoints: (builder) => ({
    geolocation: builder.query<GeoLocation[], void>({
      query: () => `/direct?q=Delhi&appid=${API_KEY}`,
    }),
  }),
});

export const { useGeolocationQuery } = weathersGeoApi;
