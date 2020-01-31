import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { getAvailableCities } from '../../store/city';
import { addChosenCity } from '../../store/user';
import { closeModal } from '../../store/modal';

import { City, State } from '../../shared/models';


@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {
  availableCities: City[] = [];
  searchResult: City[] = [];
  searchFieldChanged: Subject <string> = new Subject <string> ();
  addCityForm: FormGroup;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getAvailableCities();
    this.startLiveSearch();
  }

  buildForm() {
    this.addCityForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  getAvailableCities() {
    this.store.select(getAvailableCities)
      .pipe(
        take(1)
      )
      .subscribe( value => {
        this.availableCities = value;
        this.searchResult = value.sort(((a, b) => {
          return a.name < b.name ? -1 : 1;
        }));
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
    this.searchResult = this.availableCities
      .map((value) => {
        const index = value.name.toLowerCase().indexOf(q.toLowerCase());
        return {index, city: value};
      })
      .filter(value => {
        return value.index !== -1;
      })
      .sort(((a, b) => {
        return a.index < b.index ? -1 : 1;
      }))
      .map( value => {
        return value.city;
      });
  }

  addCity(id: number) {
    this.store.dispatch(addChosenCity({id}));
    this.store.dispatch(closeModal());
  }

}
