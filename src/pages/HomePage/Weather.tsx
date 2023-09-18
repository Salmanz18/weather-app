import { useEffect } from 'react';
import { Card } from '../../ui/components';
import { useGetWeatherByCityMutation } from '../../services/Api';

const Weather = ({ geoLoc }: WeatherProps) => {
  const [getWeather, weatherStatus] = useGetWeatherByCityMutation();

  useEffect(() => {
    getWeather({ lat: geoLoc.lat, lon: geoLoc.lon });
  }, [geoLoc]);

  const weatherDetails = weatherStatus.data;

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl">Todays Weather</p>
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
      </div>
    </div>
  );
};

interface WeatherProps {
  geoLoc: {
    lat: number;
    lon: number;
  };
}

export default Weather;
