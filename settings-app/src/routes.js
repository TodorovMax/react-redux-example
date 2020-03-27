import React from 'react';
import { Route } from 'react-router-dom';
import Info from './components/info';
import Settings from './containers/settings';
import Integration from './containers/integration';

export const routes = [
  <Route key="2" path="/settings" component={Settings} />,
  <Route key="3" path="/integration" component={Integration} />,
  <Route key="1" path="/" component={Info} />,
];
