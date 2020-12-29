import * as types from "../constants/ActionTypes";

export const setUser = (userData) => ({ type: types.SET_USER, userData });
export const setTodos = (todos) => ({ type: types.SET_TODOS, todos });
