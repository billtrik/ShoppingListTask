/**
* @providesModule Checkout
*/
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

/* Components */
import CheckoutHeader from './components/CheckoutHeader';
import Receipt from './components/Receipt';

/* Route map */
import { VIEWS } from 'Constants';

class Checkout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CheckoutHeader navigator={this.props.navigator} />
        <Receipt />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Checkout;