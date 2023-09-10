import { useWeatherQuery } from './services/Api';

const App = () => {
  const { data, error, isLoading, isSuccess } = useWeatherQuery();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">Delhi Weather:</div>
      <div className="flex justify-center">
        {isLoading ? (
          <h2>...Loading</h2>
        ) : error ? (
          <h2>Something went wrong!</h2>
        ) : isSuccess ? (
          <div className="mt-2">{data.main.temp}</div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
