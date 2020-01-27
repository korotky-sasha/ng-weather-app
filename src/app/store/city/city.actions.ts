import { createAction, props } from '@ngrx/store';

import { City } from '../../shared/models';

export const setCities = createAction(
  '[App Component] Set Cities',
  props<{cities: City[]}>()
);
