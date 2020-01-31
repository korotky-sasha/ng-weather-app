import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash-es';

import * as ModalActions from './modal.actions';
import { Modal } from '../../shared/models';


export const initialState: Modal = {
  isOpen: false,
  modalContent: null,
  options: null
};

const modalReducer = createReducer(
  initialState,
  on(ModalActions.openModal, (state, {component, options}) => {
    const newState = cloneDeep(state);
    newState.isOpen = true;
    newState.modalContent = component;
    newState.options = options ? options : null;
    return  newState;
  }),
  on(ModalActions.closeModal, (state) => {
    const newState = cloneDeep(state);
    newState.isOpen = false;
    newState.modalContent = null;
    return  newState;
  })
);

export function ModalReducer(state: Modal | undefined, action: Action) {
  return modalReducer(state, action);
}
