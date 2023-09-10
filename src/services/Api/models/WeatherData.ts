import { Clouds } from './Clouds';
import { Coord } from './Coord';
import { Main } from './Main';
import { Sys } from './Sys';
import { Weather } from './Weather';
import { Wind } from './Wind';

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
