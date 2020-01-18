import { API_HOST } from 'react-native-dotenv'

import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

const api = axios.create({
  baseURL: `${API_HOST}`,
})

api.interceptors.request.use(async config => {
  config.headers = {
    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
  }
  return config
})
export default api
