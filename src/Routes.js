import React, { Component } from 'react';
import { Navigator } from 'react-native';

/* Route map */
import { VIEWS } from 'Constants';

/* Views */
import ItemList from 'ItemList';
import Checkout from 'Checkout';

class Routes extends Component {
  getSceneToRender(currentRoute, navigator) {
    switch (currentRoute.index) {
      case VIEWS.ITEM_LIST.index:
        return (<ItemList navigator={navigator} />);
      case VIEWS.CHECKOUT.index:
        return (<Checkout navigator={navigator} />);
      default:
        return (<ItemList navigator={navigator} />);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={VIEWS.ITEM_LIST}
        renderScene={(route, navigator) => this.getSceneToRender(route, navigator)}
      />
    );
  }
}

export default Routes;