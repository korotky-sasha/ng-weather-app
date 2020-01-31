import { City } from './city';
import { Weather } from './weather';
import { UsersData } from './user';
import { Modal } from './modal';

export interface State {
  allCities: City[];
  weather: Weather[];
  usersData: UsersData;
  modal: Modal;
}
