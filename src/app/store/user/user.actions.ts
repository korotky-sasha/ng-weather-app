import { createAction, props } from '@ngrx/store';

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
