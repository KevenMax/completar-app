import {combineReducers} from 'redux';

import alert from './alert';
import category from './category';
import person from './person';

export default combineReducers({
  alert,
  category,
  person,
});
