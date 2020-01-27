import { City } from './city';
import { Weather } from './weather';
import { UsersData } from './user';

export interface State {
  allCities: City[];
  weather: Weather[];
  usersData: UsersData;
}
