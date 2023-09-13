import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, baseUrlGeo } from '../utils/BaseUrl';
import { WeatherData } from './Api/models/WeatherData';
import { GeoLocation } from './Api/models/GeoLocation';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weathersApi = createApi({
  reducerPath: 'weathersApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.mutation<WeatherData, { lat: number[]; lon: number[] }>({
      query: ({ lat, lon }) => ({
        url: `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetWeatherByCityMutation } = weathersApi;

export const weathersGeoApi = createApi({
  reducerPath: 'weathersGeoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlGeo }),
  endpoints: (builder) => ({
    getGeoLocationByCity: builder.mutation<GeoLocation[], string>({
      query: (city) => ({
        url: `/direct?q=${city}&appid=${API_KEY}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGeoLocationByCityMutation } = weathersGeoApi;
