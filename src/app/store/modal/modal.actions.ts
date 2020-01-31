import { Type } from '@angular/core';
import { createAction, props } from '@ngrx/store';

export const openModal = createAction(
  '[App Component] Open Modal',
  props<{component: Type<any>, options?: any}>()
);

export const closeModal = createAction(
  '[App Component] Close Modal'
);
