import {createActions, createReducer} from 'reduxsauce';

export const {Types, Creators} = createActions({
  setUser: ['user'],
  removeUser: [''],
});

const INITIAL_STATE = {
  user: null,
};

const set = (state = INITIAL_STATE, action) => ({
  user: action.user,
});

const remove = (state = INITIAL_STATE, action) => ({
  user: null,
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_USER]: set,
  [Types.REMOVE_USER]: remove,
});
