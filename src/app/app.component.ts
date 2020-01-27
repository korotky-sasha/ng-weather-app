import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { State, User } from './shared/models';

import { addChosenCity, addUser, deleteChosenCity, setSelectedUser } from './store/user';
import { deleteOldWeather } from './store/weather';

import { getSelectedUser, getAvailableUsers } from './store/user';
import { getChosenCitiesWeather } from './store/weather';
import { getAvailableCities, getChosenCities } from './store/city';

import { WeatherService } from './services/weather.service';

// TODO: shared modal component for live search, confirmation of deleting city etc

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
  searchActive = false;
  searchHover = false;
  searchResults = [];
  searchFieldChanged: Subject <string> = new Subject <string> ();
  isModal = false;
  deleteCityConfirmed: Subject <boolean> = new Subject<boolean>();
  chosenCitiesWeather$ = this.store.select(getChosenCitiesWeather);
  selectedUser$ = this.store.select(getSelectedUser);
  availableUsers$ = this.store.select(getAvailableUsers);

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.startLiveSearch();
    // store
    this.getAvailableCities();
    this.getChosenCities();
    this.deleteOldWeather();
    setInterval(() => {
      this.deleteOldWeather();
    }, 7200000);
  }

  buildForms() {
    this.addCityForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.setUserForm = this.formBuilder.group({
      user: ['']
    });
  }

  startLiveSearch() {
    this.searchFieldChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe( (value) => {
        this.searchCity(value);
      });
  }

  liveSearch(name) {
    this.searchFieldChanged.next(name);
  }

  searchCity(q: string) {
    this.searchResults = this.availableCities.filter((value) => {
      return value.name.toLowerCase().includes(q.toLowerCase());
    });
  }

  tryDeleteCity(id: number) {
    this.isModal = true;
    const subscription = this.deleteCityConfirmed.subscribe( value => {
      if (value) {
        this.deleteChosenCity(id);
      }
      this.isModal = false;
      subscription.unsubscribe();
    });
  }

  modalConfirmed() {
    this.deleteCityConfirmed.next(true);
  }

  modalClosed() {
    this.isModal = false;
    this.deleteCityConfirmed.next(false);
  }

  addUser(user: User) {
    this.store.dispatch(addUser(
      { user })
    );
  }

  setSelectedUser(id: number) {
    this.store.dispatch(setSelectedUser({id}));
  }

  addChosenCity(id: number) {
    this.addCityForm.reset();
    this.searchResults = null;
    this.searchActive = false;
    this.searchHover = false;
    this.store.dispatch(addChosenCity(
      { id }
    ));
  }

  deleteChosenCity(id: number) {
    this.store.dispatch(deleteChosenCity(
      { id }
    ));
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

}
