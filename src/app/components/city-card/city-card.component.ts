import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { openModal } from '../../store/modal';

import { City, State, Weather } from '../../shared/models';

import { DeleteCityComponent } from '../delete-city/delete-city.component';

interface WeatherState {
  weather: Weather;
  city: City;
  loading: boolean;
}

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})

export class CityCardComponent {
  @Input() city: WeatherState;

  constructor(
    private store: Store<State>
  ) { }

  delete() {
    this.store.dispatch(openModal({component: DeleteCityComponent, options: this.city.city.id}));
  }
}
