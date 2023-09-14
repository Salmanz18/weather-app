import { LocalNames } from './LocalNames';

export interface GeoLocation {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
