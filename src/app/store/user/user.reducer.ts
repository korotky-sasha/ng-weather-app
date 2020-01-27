import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash-es';

import { UsersData } from '../../shared/models';
import * as UserActions from './user.actions';
import * as WeatherActions from '../weather/weather.actions';


export const initialState: UsersData = {
  users: [],
  selectedUser: null
};

const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, {user}) => {
    const newUsers = state.users.map( value => {
      const newObj = cloneDeep(value);
      console.log(newObj === value);
      return newObj;
      // return {...value, chosenCities: value.chosenCities.map(item => ({...item}))};
    });
    // newUsers.push({...user, chosenCities: user.chosenCities.map(item => ({...item}))});
    newUsers.push(cloneDeep(user));
    return  {
      ...state,
      users: newUsers
    };
  }),
  on(UserActions.setSelectedUser, (state, {id} ) => {
    const newUsers = state.users.map( value => {
      // return {...value};
      return cloneDeep(value);
    });
    return  {
      users: newUsers,
      selectedUser: id
    };
  }),
  on(UserActions.addChosenCity, (state, {id}) => {
    const selectedUserId = state.selectedUser;
    const newUsers =  state.users.map( value => {
      if (value.id !== selectedUserId) {
        return cloneDeep(value);
      } else {
        const newChosenCities = cloneDeep(value.chosenCities);
        newChosenCities.push({id, loading: false});
        const newValue = cloneDeep(value);
        newValue.chosenCities = newChosenCities;
        return newValue;
      }
    });
    return {users: newUsers, selectedUser: selectedUserId};
  }),
  on(UserActions.deleteChosenCity, (state, {id}) => {
    const selectedUserId = state.selectedUser;
    const newUsers =  state.users
      .map( value => {
        if (value.id !== selectedUserId) {
          return cloneDeep(value);
        } else {
          const newChosenCities = cloneDeep(value.chosenCities).filter( city => {
            return city.id !== id;
          });
          return {...value, chosenCities: newChosenCities};
        }
      });
    return {users: newUsers, selectedUser: selectedUserId};
  }),
  on(WeatherActions.loadCityWeather, (state, {id} ) => {
    const newUsers = state.users.map( user => {
      if (user.id !== state.selectedUser) {
        return cloneDeep(user);
      } else {
        const newChosenCities = user.chosenCities.map(chosenCity => {
          if (chosenCity.id === id) {
            const newChosenCity = cloneDeep(chosenCity);
            newChosenCity.loading = true;
            return newChosenCity;
          } else {
            return cloneDeep(chosenCity);
          }
        });
        const newUser = cloneDeep(user);
        newUser.chosenCities = newChosenCities;
        return newUser;
      }
    });
    return  {
      users: newUsers,
      selectedUser: state.selectedUser
    };
  }),
  on(WeatherActions.getCityWeatherSuccess, (state, {weather} ) => {
    const id = weather.id;
    const newUsers = state.users.map( user => {
      if (user.id !== state.selectedUser) {
        return cloneDeep(user);
      } else {
        const newChosenCities = user.chosenCities.map(chosenCity => {
          if (chosenCity.id === id) {
            const newChosenCity = cloneDeep(chosenCity);
            newChosenCity.loading = false;
            return newChosenCity;
          } else {
            return cloneDeep(chosenCity);
          }
        });
        const newUser = cloneDeep(user);
        newUser.chosenCities = newChosenCities;
        return newUser;
      }
    });
    return  {
      users: newUsers,
      selectedUser: state.selectedUser
    };
  })
);

export function UserReducer(state: UsersData | undefined, action: Action) {
  return userReducer(state, action);
}
