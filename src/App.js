import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

/* Redux bindings for react and Redux store */
import { Provider } from 'react-redux';
import Store from './Store';

/* All the routes defined in Routes component */
import Routes from './Routes';

export default class ShoppingListTask extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    );
  }
}

/* Registering the app to enable execution from native side */
AppRegistry.registerComponent('ShoppingListTask', () => ShoppingListTask);