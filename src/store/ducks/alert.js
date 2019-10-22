import {createActions, createReducer} from 'reduxsauce';

export const {Types, Creators} = createActions({
  addAlert: ['show', 'title', 'message'],
  removeAlert: [''],
});

const INITIAL_STATE = {
  show: '',
  title: '',
  message: '',
};

const add = (state = INITIAL_STATE, action) => ({
  ...state,
  show: action.show,
  title: action.title,
  message: action.message,
});

const remove = (state = INITIAL_STATE, action) => ({
  show: false,
  title: '',
  message: '',
});

export default createReducer(INITIAL_STATE, {
  [Types.ADD_ALERT]: add,
  [Types.REMOVE_ALERT]: remove,
});
