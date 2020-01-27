import { createSelector } from '@ngrx/store';
import { City, State, User } from '../../shared/models';
import { getSelectedUser } from '../user';

export const getAllCities = (state: State) => state.allCities;

export const getChosenCities = createSelector(
  getAllCities,
  getSelectedUser,
  (allCities, selectedUser) => {
    if (allCities && selectedUser) {
      return allCities.filter( city => {
        return selectedUser.chosenCities.find( chosenCity => {
          return chosenCity.id === city.id;
        });
      });
    } else if (allCities && allCities.length > 4) {
      return allCities.slice(0, 5);
    } else {
      return null;
    }
  }
);

export const getAvailableCities = createSelector(
  getAllCities,
  getSelectedUser,
  (allCities: City[], selectedUser: User) => {
    if (allCities && selectedUser) {
      return allCities.filter( city => {
        return !selectedUser.chosenCities.find( chosenCity => {
          return chosenCity.id === city.id;
        });
      });
    } else if (allCities && allCities.length > 5) {
      return allCities.slice(5);
    } else {
      return null;
    }
  }
);
