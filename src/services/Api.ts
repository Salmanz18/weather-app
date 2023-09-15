import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, baseUrlGeo } from '../utils/BaseUrl';
import { WeatherData } from './Api/models/WeatherModel/WeatherData';
import { GeoLocation } from './Api/models/GeoLocationModel/GeoLocation';
import { Forecast } from './Api/models/ForecastModel/Forecast';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weathersApi = createApi({
  reducerPath: 'weathersApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.mutation<WeatherData, { lat: number[]; lon: number[] }>({
      query: ({ lat, lon }) => ({
        url: `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        method: 'GET',
      }),
    }),
    getForecastByCity: builder.mutation<Forecast, { lat: number[]; lon: number[]; cnt: number }>({
      query: ({ lat, lon, cnt }) => ({
        url: `/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=${cnt}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetWeatherByCityMutation, useGetForecastByCityMutation } = weathersApi;

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
