import { useEffect, useState } from 'react';
import { useGetGeoLocationByCityMutation, useGetWeatherByCityMutation } from '../../services/Api';
import { Card, Loading, Search } from '../../ui/components';
import Forecast from './Forecast';
import Weather from './Weather';
import { ConditionComponent } from '../../ui/components/ConditionComponent';

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

  const iconId = weatherStatus.data?.weather[0].icon;
  const WEATHER_ICON_URL = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  const temp = weatherStatus.data?.main.temp;

  const renderGeoLocation = () => {
    if (geoLocationStatus.isSuccess && weatherStatus.isSuccess) {
      return (
        <div className="flex justify-around items-center">
          {weatherStatus.data.weather.map((item) => {
            return (
              <Card key={item.id} className="flex justify-evenly items-center w-fit m-2 p-2">
                <img src={WEATHER_ICON_URL} alt="img" />
                <div className="flex flex-col">
                  <div className="text-3xl">{temp}°C</div>
                  <div>{item.main}</div>
                </div>
              </Card>
            );
          })}
          {geoLocationStatus.data.map((item) => (
            <Card key={item.name} className="m-2 w-fit p-2">
              <div className="text-2xl">City: {item.name}</div>
              <div className="text-2xl">State: {item.state}</div>
              <div className="text-2xl">Country: {item.country}</div>
            </Card>
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
      <ConditionComponent showIf={weatherStatus.isSuccess && geoLocationStatus.isSuccess}>
        <div className="flex flex-col justify-center">
          <Card className="flex items-center justify-center mx-auto w-192 my-2">{renderGeoLocation()}</Card>
          <Card className="my-2">
            <Weather geoLoc={geoLoc} />
          </Card>
          <Card className="flex my-2">
            <Forecast city={city} geoLoc={geoLoc} />
          </Card>
        </div>
      </ConditionComponent>
      <ConditionComponent showIf={weatherStatus.isLoading}>
        <Loading />
      </ConditionComponent>
      <ConditionComponent showIf={weatherStatus.isError || geoLocationStatus.isError}>
        <Card className="flex mt-2 w-72 p-5">
          <div>Failed to load Weather! Please check City you entered!</div>
        </Card>
      </ConditionComponent>
    </div>
  );
};

export default HomePage;
