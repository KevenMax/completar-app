import {createActions, createReducer} from 'reduxsauce';

export const {Types, Creators} = createActions({
  addCategory: ['id'],
  removeCategory: [''],
});

const INITIAL_STATE = {
  category_id: '',
};

const add = (state = INITIAL_STATE, action) => ({
  ...state,
  category_id: action.id,
});

const remove = (state = INITIAL_STATE, action) => ({
  category_id: '',
});

export default createReducer(INITIAL_STATE, {
  [Types.ADD_CATEGORY]: add,
  [Types.REMOVE_CATEGORY]: remove,
});
