import { createSelector } from '@ngrx/store';

import { State, Weather } from '../../shared/models';
import { getChosenCities } from '../city';
import { getSelectedUser } from '../user';

export const getWeather = (state: State) => state.weather;

export const getCityWeather = createSelector(
  getWeather,
  (weather: Weather[], props) => {
    return weather.filter( value => {
      return value.id === props.id;
    });
  }
);

export const getChosenCitiesWeather = createSelector(
  getChosenCities,
  getWeather,
  getSelectedUser,
  (chosenCities, allWeather, selectedUser) => {
    if (chosenCities && allWeather) {
      return selectedUser.chosenCities.map(city => {
        const weather = allWeather.find(cityWeather => {
          return city.id === cityWeather.id;
        });
        const chosenCity = chosenCities.find(value => {
          return city.id === value.id;
        });
        return {weather, city: chosenCity, loading: city.loading};
      });
    } else {
      return null;
    }
  }
);
