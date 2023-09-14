import { City } from './City';
import { List } from './List';

export interface Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}
