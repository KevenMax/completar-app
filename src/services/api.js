import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async config => {
  config.headers = {
    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
  };
  return config;
});
export default api;
