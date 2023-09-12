import { useWeatherQuery, useGeolocationQuery } from './services/Api';

const App = () => {
  const weatherData = useWeatherQuery();
  const geolocationData = useGeolocationQuery();

  const renderWeather = () => {
    if (weatherData.isLoading) {
      return <h2>Loading weather...</h2>;
    }

    if (weatherData.isError) {
      return <h2>Something went wrong fetching weather data!</h2>;
    }

    if (weatherData.isSuccess) {
      const temperatureInCelsius = weatherData.data.main.temp - 273.15;
      return <div className="mt-2">{temperatureInCelsius.toFixed(2)}°C</div>;
    }
    return null;
  };

  const renderGeolocation = () => {
    if (geolocationData.isLoading) {
      return <h2>Loading geolocation data...</h2>;
    }

    if (geolocationData.isError) {
      return <h2>Something went wrong fetching geolocation data!</h2>;
    }

    if (geolocationData.isSuccess) {
      return (
        <div className="mt-2">
          {geolocationData.data.map((item) => (
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

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">Delhi Weather:</div>
      <div className="flex justify-center">{renderWeather()}</div>
      <div className="flex justify-center mt-2">Delhi Geolocation:</div>
      <div className="flex justify-center">{renderGeolocation()}</div>
    </div>
  );
};

export default App;
