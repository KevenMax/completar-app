import {combineReducers} from 'redux';

import alert from './alert';
import category from './category';

export default combineReducers({
  alert,
  category,
});
