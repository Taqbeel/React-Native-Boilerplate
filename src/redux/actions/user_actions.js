import _ from 'lodash';
import {
  LOGIN, USERS, CARS,
} from '../types';
import { showAlertMessage } from '../../constants';


export const userLogin = (username, password, users) => dispatch => {
  try {

    let userFound = users.find(user => user.username == username);

    if (userFound) {
      if (password == userFound.password) {
        //  condition for success api status code
        dispatch({ type: LOGIN, payload: userFound });
        return {
          status: true,
        };
      } else {
        //  condition for failed api status code
        showAlertMessage('Alert', 'Invalid Password')
        return {
          status: false,
        };
      }
    } else {
      //  condition for failed api status code
      showAlertMessage('Alert', 'User Not Found')
      return {
        status: false,
      };
    }

  } catch (e) {
    console.log("error response:", e);
    return false;
  }
};

export const userRegister = (user, users) => dispatch => {
  try {

    let username = users.find(u => u.username == user.username);
    let email = users.find(u => u.email == user.email);

    if (username) {
      showAlertMessage('Alert', 'Username Already Exist')
      return {
        status: false,
      };
    } else if (email) {
      showAlertMessage('Alert', 'Email Already Exist')
      return {
        status: false,
      };
    } else {
      let newUser = [...users, user]

      dispatch({ type: USERS, payload: newUser });
      dispatch({ type: LOGIN, payload: user });

      return {
        status: true,
      };
    }
  } catch (e) {
    console.log("error response:", e);
    return false;
  }
};

export const addEditCar = (cars) => dispatch => {
  try {
    dispatch({ type: CARS, payload: cars });
    return {
      status: true,
    };
  } catch (e) {
    console.log("error response:", e);
    return false;
  }
};

export const deleteCar = (cars, id) => dispatch => {
  try {

    let update = cars.filter(car => car.id != id)
    dispatch({ type: CARS, payload: update });

    return {
      status: true,
    };
  } catch (e) {
    console.log("error response:", e);
    return false;
  }
};

export const userLogout = () => dispatch => {
  dispatch({ type: LOGIN, payload: null });
  return true;
};