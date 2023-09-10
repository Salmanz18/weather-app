import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utils/BaseUrl';
import { WeatherData } from './Api/models/WeatherData';

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
