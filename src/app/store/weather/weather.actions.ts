import { createAction, props } from '@ngrx/store';

import { Weather } from '../../shared/models';


export const setWeather = createAction(
  '[App Component] Set Weather',
  props<{weather: Weather[]}>()
);

export const deleteCityWeather = createAction(
  '[CityCard Component] Delete City Weather',
  props<{id: number}>()
);

export const loadCityWeather = createAction(
  '[City API] Load City Weather',
  props<{id: number}>()
);

export const getCityWeatherSuccess = createAction(
  '[City API] Load City Weather Success',
  props<{weather: Weather}>()
);

export const deleteOldWeather = createAction(
  '[App Component] Update Weather'
);
