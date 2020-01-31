import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { getModalOptions, closeModal } from '../../store/modal';
import { deleteChosenCity } from '../../store/user';

import { State } from '../../shared/models';


@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.scss']
})
export class DeleteCityComponent implements OnInit {
  cityId = null;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.select(getModalOptions)
      .pipe(
        take(1)
      )
      .subscribe( (value: number) => {
        if (value) {
          this.cityId = value;
        }
      });
  }

  closeModal() {
    this.store.dispatch(closeModal());
  }

  deleteCity() {
    if (this.cityId) {
      this.store.dispatch(deleteChosenCity({id: this.cityId}));
      this.store.dispatch(closeModal());
    }
  }

}
