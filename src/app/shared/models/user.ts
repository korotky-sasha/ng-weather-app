export interface ChosenCity {
  id: number;
  loading: boolean;
}

export interface User {
  id: number;
  name: string;
  chosenCities: ChosenCity[];
}

export interface UsersData {
  users: User[];
  selectedUser: number;
}
