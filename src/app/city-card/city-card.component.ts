import { Component, Input, Output, EventEmitter } from '@angular/core';

import { City } from '../mock-data';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})

export class CityCardComponent {
  @Input() city: City;

  @Output() deleted = new EventEmitter<boolean>();

  constructor() { }

  delete() {
    this.deleted.emit(true);
  }

}
