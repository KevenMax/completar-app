import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';
import Home from './screens/Home';
import Category from './screens/Home/Category';
import Activity from './screens/Activity';
import Profile from './screens/Profile';
import Edit from './screens/Profile/Edit';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
    Home,
    Activity,
    Edit,
    Category,
    Profile,
  }),
);
