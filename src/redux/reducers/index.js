import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import user from './user';

const whitelists = [
  'user',
];

const config = {
  key: 'primary',
  storage: AsyncStorage,
  whitelists
};

export default persistCombineReducers(config, {
  user,
});