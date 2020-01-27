import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';

import { loadCityWeather, deleteOldWeather, setWeather } from './weather.actions';
import { getUsers, setSelectedUser } from '../user';

import { getSelectedUser, addChosenCity } from '../user';
import { getWeather } from './weather.selector';

import { WeatherService } from '../../services/weather.service';
import { State, User, Weather } from '../../shared/models';


@Injectable()
export class WeatherEffects {

  prepareSelectedCityWeatherAfterSetUser$ = createEffect(() => this.actions$.pipe(
    ofType(setSelectedUser),
    withLatestFrom(this.store.select(getWeather), this.store.select(getUsers)),
    mergeMap(([action, weather, users]) => {
        if (action.id && users) {
          const selectedUser = users.find( user => {
            return user.id === action.id;
          });
          const lostCitiesId = this.getMissingCitiesId(weather, selectedUser);
          return from(lostCitiesId).pipe(
            map( id => {
              return ({ type: '[City API] Load City Weather', id });
            })
          );
        } else {
          return EMPTY;
        }
      }
    )
  ));

  prepareSelectedCityWeatherAfterWeatherCheck$ = createEffect(() => this.actions$.pipe(
    ofType(setWeather),
    withLatestFrom( this.store.select(getSelectedUser)),
    mergeMap(([action, selectedUser]) => {
        if (action.weather && selectedUser) {
          const lostCitiesId = this.getMissingCitiesId(action.weather, selectedUser);
          return from(lostCitiesId).pipe(
            map( id => {
              return ({ type: '[City API] Load City Weather', id });
            })
          );
        } else {
          return EMPTY;
        }
      }
    )
  ));

  deleteOldWeather$ = createEffect(() => this.actions$.pipe(
    ofType(deleteOldWeather),
    withLatestFrom(this.store.select(getWeather)),
    mergeMap(([action, weather]) => {
        if (weather) {
          const newWeather: Weather[] = [];
          weather.forEach( value => {
            if (!this.isWeatherOld(value)) {
              newWeather.push(cloneDeep(value));
            }
          });
          return of(({ type: '[App Component] Set Weather', weather: newWeather }));
        } else {
          return EMPTY;
        }
      }
    )
  ));

  addChosenCity$ = createEffect(() => this.actions$.pipe(
    ofType(addChosenCity),
    withLatestFrom(this.store.select(getWeather)),
    mergeMap( ([action, weather]) => {
      const chosenCityId = action.id;
      const isWeatherExists = !!weather.find( cityWeather => {
        return cityWeather.id === chosenCityId;
      });
      if (isWeatherExists) {
        return EMPTY;
      } else {
        return of(({ type: '[City API] Load City Weather', id: chosenCityId }));
      }
    })
  ));

  loadCityWeather$ = createEffect(() => this.actions$.pipe(
    ofType(loadCityWeather),
    mergeMap((action) => this.weatherService.getCityWeather(action.id).pipe(
        map(response => {
          const cityWeather = this.weatherService.convertResponse(response);
          return ({ type: '[City API] Load City Weather Success', weather: cityWeather });
          }),
        catchError(() => EMPTY)
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private weatherService: WeatherService
  ) {}

  getMissingCitiesId(weather: Weather[], selectedUser: User): number[] {
    return selectedUser.chosenCities.map( value => value.id).filter(city => {
      const chosenCityWeather = weather.find(cityWeather => {
        return cityWeather.id === city;
      });
      if (!chosenCityWeather) {
        return true;
      } else {
        return this.isWeatherOld(chosenCityWeather);
      }
    });
  }

  isWeatherOld(cityWeather: Weather): boolean {
    const weatherTime = new Date(cityWeather.dt * 1000);
    const currentTime = Date.now();
    const timeDifference = +weatherTime - currentTime;
    return -timeDifference > 7200000;
  }

}
