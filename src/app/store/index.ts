import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { State } from '../shared/models';
import { CityReducer } from './city';
import { WeatherReducer } from './weather';
import { UserReducer } from './user';
import { ModalReducer } from './modal';
import { WeatherEffects } from './weather/weather.effects';

import { StorageMetaReducer } from './storage.metareducer';


export const reducers: ActionReducerMap<State> = {
  allCities: CityReducer,
  weather: WeatherReducer,
  usersData: UserReducer,
  modal: ModalReducer
};

export const effects: any[] = [WeatherEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [StorageMetaReducer] : [StorageMetaReducer];
