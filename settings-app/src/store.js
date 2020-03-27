import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { rootReducer } from './reducers';
import { history } from './history';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, routerMiddleware(history)),
);
