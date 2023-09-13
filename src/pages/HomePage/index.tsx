import { useEffect } from 'react';
import { useGetGeoLocationByCityMutation, useGetWeatherByCityMutation } from '../../services/Api';
import { Card } from '../../ui/components/Card';
import { Search } from '../../ui/components/Search';
import Loading from '../../ui/components/Loading';

const HomePage = () => {
  const [getGeoLocation, geoLocationStatus] = useGetGeoLocationByCityMutation();
  const [getWeather, weatherStatus] = useGetWeatherByCityMutation();

  useEffect(() => {
    const lat = geoLocationStatus.data?.map((item) => item.lat)!;
    const lon = geoLocationStatus.data?.map((item) => item.lon)!;
    if (lat && lon !== undefined) {
      getWeather({ lat, lon });
    }
  }, [geoLocationStatus.isSuccess]);

  const renderWeather = () => {
    if (weatherStatus.isSuccess) {
      const temperatureInCelsius = weatherStatus.data.main.temp - 273.15;
      const feelsLikeTemperatureInCelsius = weatherStatus.data.main.feels_like - 273.15;
      const maxTemperatureInCelsius = weatherStatus.data.main.temp_max - 273.15;
      const minTemperatureInCelsius = weatherStatus.data.main.temp_min - 273.15;
      return (
        <div className="mt-2">
          <div>Temp: {temperatureInCelsius.toFixed(2)}°C</div>
          <div>Feels like: {feelsLikeTemperatureInCelsius.toFixed(2)}°C</div>
          <div>Max: {maxTemperatureInCelsius.toFixed(2)}°C</div>
          <div>Min: {minTemperatureInCelsius.toFixed(2)}°C</div>
          <div>Humidity: {weatherStatus.data.main.humidity}%</div>
        </div>
      );
    }
    return null;
  };

  const renderGeolocation = () => {
    if (geoLocationStatus.isSuccess) {
      return (
        <div className="mt-2">
          {geoLocationStatus.data.map((item) => (
            <div key={item.name}>
              <div>Latitude: {item.lat}</div>
              <div>Longitude: {item.lon}</div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleSearch = (city: string) => {
    getGeoLocation(city);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-2">
        <Search placeholder="Enter City" onSearch={handleSearch} />
      </div>
      <div>
        {weatherStatus.isSuccess && (
          <Card className="flex flex-col mt-2 w-72">
            <div className="flex justify-center">Weather:</div>
            <div className="flex justify-center">{renderWeather()}</div>
            <div className="flex justify-center mt-2">Geolocation:</div>
            <div className="flex justify-center">{renderGeolocation()}</div>
          </Card>
        )}

        {weatherStatus.isLoading && <Loading />}

        {weatherStatus.isError ||
          (geoLocationStatus.isError && (
            <Card className="flex mt-2 w-72">
              <div>Failed to load Weather! Please check City!</div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
