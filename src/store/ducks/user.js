import {createActions, createReducer} from 'reduxsauce';

export const {Types, Creators} = createActions({
  setUser: ['id'],
  removeUser: [''],
});

const INITIAL_STATE = {
  user_id: '',
};

const set = (state = INITIAL_STATE, action) => ({
  user_id: action.id,
});

const remove = (state = INITIAL_STATE, action) => ({
  user_id: '',
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_USER]: set,
  [Types.REMOVE_USER]: remove,
});
