import { useEffect } from 'react';
import { useGetForecastByCityMutation, useGetGeoLocationByCityMutation } from '../../services/Api';
import { Card } from '../../ui/components';

const Forecast = ({ city }: ForecastProps) => {
  const [getGeoLocation, geoLocationStatus] = useGetGeoLocationByCityMutation();
  const [getForecast, forecastStatus] = useGetForecastByCityMutation();

  const DEFAULT_FORECAST_COUNT = 8;

  useEffect(() => {
    getGeoLocation(city);
  }, []);

  useEffect(() => {
    const lat = geoLocationStatus.data?.map((item) => item.lat)!;
    const lon = geoLocationStatus.data?.map((item) => item.lon)!;
    const cnt = DEFAULT_FORECAST_COUNT;
    if (lat && lon !== undefined) {
      getForecast({ lat, lon, cnt });
    }
  }, [geoLocationStatus.isSuccess]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Forecast:</p>
      <div className="flex flex-wrap justify-center items-center mx-auto w-192">
        {forecastStatus.data?.list.map((item) => {
          return (
            <Card key={item.dt} className="m-2 w-fit p-2">
              <div>{item.dt_txt}</div>
              <div>Max. Temp: {item.main.temp_max}°C</div>
              <div>Min. Temp: {item.main.temp_min}°C</div>
              <div>Feels Like: {item.main.feels_like}°C</div>
              <div>Humidity: {item.main.humidity}%</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

interface ForecastProps {
  city: string;
}

export default Forecast;
