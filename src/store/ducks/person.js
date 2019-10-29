import {createActions, createReducer} from 'reduxsauce';

export const {Types, Creators} = createActions({
  setPerson: ['id'],
  removePerson: [''],
});

const INITIAL_STATE = {
  person_id: '',
};

const set = (state = INITIAL_STATE, action) => ({
  person_id: action.id,
});

const remove = (state = INITIAL_STATE, action) => ({
  person_id: '',
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_PERSON]: set,
  [Types.REMOVE_PERSON]: remove,
});
