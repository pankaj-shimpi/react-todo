import * as types from '../constants/ActionTypes';

export const setUser = userData => ({ type: types.SET_USER, userData });
export const getUser = userData => ({ type: types.GET_USER, userData });