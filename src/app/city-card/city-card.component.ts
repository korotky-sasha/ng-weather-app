import { Component, Input, Output, EventEmitter } from '@angular/core';

import {City, Weather} from '../shared/models';

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

  @Output() deleted = new EventEmitter<boolean>();

  constructor() { }

  delete() {
    this.deleted.emit(true);
  }
}
