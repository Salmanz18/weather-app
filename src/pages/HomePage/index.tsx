import { useEffect, useState } from 'react';
import { useGetGeoLocationByCityMutation, useGetWeatherByCityMutation } from '../../services/Api';
import { Card, Loading, Search } from '../../ui/components';
import Forecast from './Forecast';
import Weather from './Weather';

const HomePage = () => {
  const [getGeoLocation, geoLocationStatus] = useGetGeoLocationByCityMutation();
  const [getWeather, weatherStatus] = useGetWeatherByCityMutation();

  const [city, setCity] = useState('');
  const [geoLoc, setGeoLoc] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    const lat = geoLocationStatus.data?.map((item) => Number(item.lat))!;
    const lon = geoLocationStatus.data?.map((item) => Number(item.lon))!;
    if (lat && lon !== undefined) {
      setGeoLoc({ lat: lat[0], lon: lon[0] });
      getWeather({ lat: lat[0], lon: lon[0] });
    }
    return;
  }, [geoLocationStatus.isSuccess]);

  const handleSearch = (city: string) => {
    getGeoLocation(city);
    setCity(city);
  };

  const renderGeoLocation = () => {
    if (geoLocationStatus.isSuccess && weatherStatus.isSuccess) {
      return (
        <div className="flex flex col justify-center items-center">
          <Card>{weatherStatus.data.weather.map((item) => item.main)}</Card>
          {geoLocationStatus.data.map((item) => (
            <div key={item.name}>
              <Card className="m-2 w-72 p-2">
                <div>City: {item.name}</div>
                <div>State: {item.state}</div>
                <div>Country: {item.country}</div>
                <div>Latitude: {item.lat}</div>
                <div>Longitude: {item.lon}</div>
              </Card>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-2">
        <Search placeholder="Enter City" onSearch={handleSearch} />
      </div>
      {weatherStatus.isSuccess && geoLocationStatus.isSuccess && (
        <div className="flex flex-col justify-center">
          <Card className="flex items-center justify-center mx-auto w-192 my-2">{renderGeoLocation()}</Card>
          <Card className="my-2">
            <Weather geoLoc={geoLoc} />
          </Card>
          <Card className="flex my-2">
            <Forecast city={city} geoLoc={geoLoc} />
          </Card>
        </div>
      )}
      {weatherStatus.isLoading && <Loading />}
      {(weatherStatus.isError || geoLocationStatus.isError) && (
        <Card className="flex mt-2 w-72">
          <div>Failed to load Weather! Please check City you entered!</div>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
