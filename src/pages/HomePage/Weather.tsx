import { useEffect } from 'react';
import { Card } from '../../ui/components';
import {
  useGetGeoLocationByCityMutation,
  //   useGetIconByIdMutation,
  useGetWeatherByCityMutation,
} from '../../services/Api';

const Weather = ({ city }: WeatherProps) => {
  const [getGeoLocation, geoLocationStatus] = useGetGeoLocationByCityMutation();
  const [getWeather, weatherStatus] = useGetWeatherByCityMutation();
  //   const [getIcon, iconStatus] = useGetIconByIdMutation();

  useEffect(() => {
    getGeoLocation(city);
  }, []);

  useEffect(() => {
    const lat = geoLocationStatus.data?.map((item) => item.lat)!;
    const lon = geoLocationStatus.data?.map((item) => item.lon)!;
    if (lat && lon !== undefined) {
      getWeather({ lat, lon });
    }
  }, [geoLocationStatus.isSuccess]);

  useEffect(() => {
    if (weatherStatus.data) {
      const iconId = weatherStatus.data?.weather[0].icon;
      if (iconId !== undefined) {
        // getIcon(iconId);
      }
    }
    return;
  }, [weatherStatus.isSuccess]);

  //   const weatherIcon = iconStatus.data;

  const weatherDetails = weatherStatus.data;
  const weatherType = weatherDetails?.weather.map((item) => item.main);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>Todays Weather</div>
      <div className="flex">
        <Card className="m-2 w-fit p-2">
          <div>Temperature</div>
          <div>{weatherDetails?.main.temp}°C</div>
        </Card>
        <Card className="m-2 w-fit p-2">
          <div>Feels Like</div>
          <div>{weatherDetails?.main.feels_like}°C</div>
        </Card>
        <Card className="m-2 w-fit p-2">
          <div>Max. Temperature</div>
          <div>{weatherDetails?.main.temp_max}°C</div>
        </Card>
        <Card className="m-2 w-fit p-2">
          <div>Min. Temperature</div>
          <div>{weatherDetails?.main.temp_min}°C</div>
        </Card>
        <Card className="m-2 w-fit p-2">
          <div>Humidity</div>
          <div>{weatherDetails?.main.humidity}%</div>
        </Card>
        <Card className="m-2 w-fit p-2">
          {/* <img src={weatherIcon!} alt="img" /> */}
          <div>{weatherType}</div>
        </Card>
      </div>
    </div>
  );
};

interface WeatherProps {
  city: string;
}

export default Weather;
