import { Clouds } from '../WeatherModel/Clouds';
import { Weather } from '../WeatherModel/Weather';
import { Main } from './Main';
import { Sys } from './Sys';
import { Wind } from './Wind';

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}
