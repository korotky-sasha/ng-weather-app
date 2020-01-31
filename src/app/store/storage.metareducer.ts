import { ActionReducer, Action } from '@ngrx/store';
import { merge, pick } from 'lodash-es';

import { availableCities, chosenCities } from '../mock-data';


function setSavedState(state: any, storageKey: string) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getSavedState(storageKey: string): any {
  return JSON.parse(localStorage.getItem(storageKey));
}

// the keys from state which we'd like to save.
const stateKeys = [
  'allCities',
  'weather',
  'usersData',
  'modal'
];

const initialState = {
  allCities: availableCities,
  weather: {},
  usersData: {
    users: [
      {id: 1, name: 'TestUser1', chosenCities},
      {id: 2, name: 'TestUser2', chosenCities: []}
    ],
    selectedUser: 1
  },
  modal: {
    isOpen: false,
    modalContent: null,
    options: null
  }
};
// the key for the local storage.
const localStorageKey = 'ng-weather-app_storage';

export function StorageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…
  return (state: S, action: A): S => {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      let savedState = getSavedState(localStorageKey);
      if (!savedState) {
        savedState = initialState;
      }
      return merge(nextState, savedState);
    }
    // save the next state to the application storage.
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
