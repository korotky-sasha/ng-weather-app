import { createSelector } from '@ngrx/store';
import { State, User } from '../../shared/models';

export const getUsers = (state: State) => state.usersData.users;
export const getSelectedUserId = (state: State) => state.usersData.selectedUser;

export const getSelectedUser = createSelector(
  getUsers,
  getSelectedUserId,
  (users: User[], selectedUserId: number) => {
    if (users && selectedUserId) {
      return users.find( user => {
        return user.id === selectedUserId;
      });
    } else {
      return null;
    }
  }
);

export const getAvailableUsers = createSelector(
  getUsers,
  getSelectedUserId,
  (users: User[], selectedUserId: number) => {
    if (users && selectedUserId) {
      return users.filter( user => {
        return user.id !== selectedUserId;
      });
    } else {
      return null;
    }
  }
);
