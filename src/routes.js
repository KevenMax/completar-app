import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';
import Home from './screens/Home';
import Category from './screens/Home/Category';
import Activity from './screens/Activity';
import Profile from './screens/Profile';
import Edit from './screens/Profile/Edit';
import Create from './screens/Profile/Create';

export const SignedOutRoutes = createSwitchNavigator({
  SignIn,
  SignUp,
  Create,
});

export const SignedInRoutes = createSwitchNavigator({
  Home,
  Category,
  Activity,
  Profile,
  Edit,
});

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignIn: {screen: SignedOutRoutes},
        Home: {screen: SignedInRoutes},
      },
      {
        initialRouteName: signedIn ? 'Home' : 'SignIn',
      },
    ),
  );
};
