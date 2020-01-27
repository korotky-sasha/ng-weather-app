import { createAction, props } from '@ngrx/store';

import { User } from '../../shared/models';

export const addUser = createAction(
  '[Register Component] Add User',
  props<{user: User}>()
);

export const setSelectedUser = createAction(
  '[Register Component] Set Selected User',
  props<{id: number | null}>()
);

export const addChosenCity = createAction(
  '[AddCity Component] Add Chosen City',
  props<{id: number}>()
);

export const deleteChosenCity = createAction(
  '[CityCard Component] Delete Chosen City',
  props<{id: number}>()
);
