import { useEffect } from 'react';
import { useGetGeoLocationByCityMutation, useGetWeatherByCityMutation } from '../../services/Api';
import { Card, Loading, Search } from '../../ui/components';

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

  const handleSearch = (city: string) => {
    getGeoLocation(city);
  };

  const renderGeoLocation = () => {
    if (geoLocationStatus.isSuccess) {
      return geoLocationStatus.data.map((item) => (
        <div key={item.name}>
          <Card className="m-2 w-72 p-2">
            <div>City: {item.name}</div>
            <div>State: {item.state}</div>
            <div>Country: {item.country}</div>
            <div>Latitude: {item.lat}</div>
            <div>Longitude: {item.lon}</div>
          </Card>
        </div>
      ));
    }
    return null;
  };

  const renderWeather = () => {
    if (weatherStatus.isSuccess) {
      const { main } = weatherStatus.data;
      return (
        <div className="flex">
          <Card className="m-2 w-fit p-2">
            <div>Temperature</div>
            <div>{main.temp}°C</div>
          </Card>
          <Card className="m-2 w-fit p-2">
            <div>Feels Like</div>
            <div>{main.feels_like}°C</div>
          </Card>
          <Card className="m-2 w-fit p-2">
            <div>Max. Temperature</div>
            <div>{main.temp_max}°C</div>
          </Card>
          <Card className="m-2 w-fit p-2">
            <div>Min. Temperature</div>
            <div>{main.temp_min}°C</div>
          </Card>
          <Card className="m-2 w-fit p-2">
            <div>Humidity</div>
            <div>{main.humidity}%</div>
          </Card>
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
          <div className="flex items-center justify-center mt-2">{renderGeoLocation()}</div>
          <div className="flex">{renderWeather()}</div>
          {/*TODO:  Future Forcast */}
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
