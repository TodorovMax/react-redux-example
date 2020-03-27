import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { contract } from './contract';
import { loading } from './loading';

export const rootReducer = combineReducers({
  authentication,
  contract,
  loading,
});
