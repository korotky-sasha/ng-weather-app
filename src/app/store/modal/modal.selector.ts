import { createSelector } from '@ngrx/store';
import { State } from '../../shared/models';


export const getModal = (state: State) => state.modal;

export const getModalContent = createSelector(
  getModal,
  (modal) => {
    if (modal) {
      return modal.modalContent;
    } else {
      return null;
    }
  }
);

export const isModalOpened = createSelector(
  getModal,
  (modal) => {
    if (modal) {
      return modal.isOpen;
    } else {
      return null;
    }
  }
);

export const getModalOptions = createSelector(
  getModal,
  (modal) => {
    if (modal) {
      return modal.options;
    } else {
      return null;
    }
  }
);
