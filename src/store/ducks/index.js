import {combineReducers} from 'redux';

import alert from './alert';
import category from './category';
import user from './user';

export default combineReducers({
  alert,
  category,
  user,
});
