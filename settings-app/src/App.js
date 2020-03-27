import React from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history';
import { store } from './store';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Authentication from './containers/authentication';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Header />
      <Grid container spacing={1}>
        <Sidebar />
        <Authentication />
      </Grid>
    </ConnectedRouter>
  </Provider>
);

export default App;
