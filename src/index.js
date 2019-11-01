import React from 'react';

import {createRootNavigator, SignedOutRoutes, SignedInRoutes} from './routes';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import store from './store';

export default class App extends React.Component {
  state = {
    signed: false,
    signLoaded: false,
  };

  async componentDidMount() {
    const user = await AsyncStorage.getItem('@userId');
    if (user) {
      this.setState({signed: user, signLoaded: true});
    } else {
      this.setState({signLoaded: true});
    }
  }

  render() {
    const {signed, signLoaded} = this.state;

    if (!signLoaded) {
      return null;
    }

    const Layout = createRootNavigator(signed);
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

// import React from 'react';
// import Routes from './routes';
// import {Provider} from 'react-redux';
// import store from './store';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <Routes />
//     </Provider>
//   );
// }
