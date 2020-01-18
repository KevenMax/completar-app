import AsyncStorage from '@react-native-community/async-storage'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import reducers from './ducks'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
