import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import { State } from './shared/models';

import { setSelectedUser } from './store/user';
import { deleteOldWeather } from './store/weather';
import { openModal, closeModal } from './store/modal';

import { getSelectedUser, getAvailableUsers } from './store/user';
import { getChosenCitiesWeather } from './store/weather';
import { getAvailableCities, getChosenCities } from './store/city';
import { isModalOpened } from './store/modal';

import { AddCityComponent } from './components/add-city/add-city.component';

import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  availableCities = null;
  chosenCities = null;
  addCityForm: FormGroup;
  setUserForm: FormGroup;
  chosenCitiesWeather$ = this.store.select(getChosenCitiesWeather);
  selectedUser$ = this.store.select(getSelectedUser);
  availableUsers$ = this.store.select(getAvailableUsers);
  isModal$ = this.store.select(isModalOpened);
  addCityComponent = AddCityComponent;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.initStore();
  }

  buildForms() {
    this.addCityForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.setUserForm = this.formBuilder.group({
      user: ['']
    });
  }

  initStore() {
    this.store.dispatch(closeModal());
    this.getAvailableCities();
    this.getChosenCities();
    this.deleteOldWeather();
    setInterval(() => {
      this.deleteOldWeather();
    }, 7200000);
  }

  setSelectedUser(id: number) {
    this.store.dispatch(setSelectedUser({id}));
  }

  getAvailableCities() {
    this.store
      .pipe(
        select(getAvailableCities)
      ).subscribe(value => {
        this.availableCities = value;
    });
  }

  getChosenCities() {
    this.store
      .pipe(
        select(getChosenCities)
      ).subscribe(value => {
        this.chosenCities = value;
    });
  }

  deleteOldWeather() {
    this.store.dispatch(deleteOldWeather());
  }

  openModal(component: Type<any>) {
    this.store.dispatch(openModal({component}));
  }

}
