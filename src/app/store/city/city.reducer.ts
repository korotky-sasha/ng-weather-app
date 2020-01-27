import { Action, createReducer, on } from '@ngrx/store';

import * as CityActions from './city.actions';
import { City } from '../../shared/models';

export const initialState: City[] = [];

const cityReducer = createReducer(
  initialState,
  on(CityActions.setCities, (state, {cities}) => {
    return  cities.map(value => {
      return {...value};
    });
  })
);

export function CityReducer(state: City[] | undefined, action: Action) {
  return cityReducer(state, action);
}
