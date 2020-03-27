import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../history';
import { authentication } from './authentication';
import { settings } from './settings';
import { info } from './info';
import { common } from './common';
import { integration } from './integration';

export const rootReducer = combineReducers({
  router: connectRouter(history),
  authentication,
  settings,
  info,
  common,
  integration,
});
