import {
  LOGIN,
  CARS,
  USERS,
} from '../types';
import cars from '../../../data/cars.json';
import users from '../../../data/users.json';

const INITIAL_STATE = {
  loggedUser: null,
  users: users,
  cars: cars,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loggedUser: action.payload };
    }
    case USERS: {
      return { ...state, users: action.payload };
    }
    case CARS: {
      return { ...state, cars: action.payload };
    }

    default:
      return state;
  }
}