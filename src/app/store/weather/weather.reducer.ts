import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash-es';

import * as WeatherActions from './weather.actions';
import { Weather } from '../../shared/models';

export const initialState: Weather[] = [];


const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.addCityWeather, WeatherActions.getCityWeatherSuccess, (state, {weather}) => {
    const newWeather = state
      .map( value => {
        if (weather.id !== value.id) {
          return cloneDeep(value);
        } else {
          return null;
        }
      })
      .filter( value => {
        return value;
      });
    newWeather.push({...weather});
    return newWeather;
  }),
  on(WeatherActions.deleteCityWeather, (state, {id}) => {
    return  state
      .map( value => {
        if (value.id !== id) {
          return {...value};
        } else {
          return null;
        }
      })
      .filter(value => {
        return value != null;
      });
  }),
  on(WeatherActions.setWeather, (state, {weather}) => {
    return weather.map( value => cloneDeep(value));
  })
);

export function WeatherReducer(state: Weather[] | undefined, action: Action) {
  return weatherReducer(state, action);
}
