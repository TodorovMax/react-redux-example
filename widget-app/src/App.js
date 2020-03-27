import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Authentication from './containers/authentication';

const App = () => {
  return (
    <Provider store={store}>
      <Authentication />
    </Provider>
  );
};

export default App;
