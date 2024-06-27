// src/store/actions/userActions.js
import axios from 'axios';
import { loginAPI } from '../../utils/APIRequest';

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post(loginAPI, { email, password });
    const user = response.data;
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};
