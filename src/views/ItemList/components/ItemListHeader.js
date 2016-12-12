import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

/* Route map */
import { VIEWS } from 'Constants';

// NOTE: you could use a separate container file for that
function mapStateToProps(state) {
  return {
    sum: state.shoppingCart.get('sum'),
    discount: state.shoppingCart.get('discount')
  }
}

// NOTE: you could create a reusable header component
class ItemListHeader extends Component {
  /* Push a new view on to the navigation stack */
  navigateToCheckout() {
    this.props.navigator.push(VIEWS.CHECKOUT);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{`Total: ${this.props.sum - this.props.discount}`}</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => this.navigateToCheckout()}
        >
          <Text style={styles.cyan}>Checkout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// NOTE: you could extract style to its own file
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 55,
    backgroundColor: '#F7F7F7',
    paddingTop: 25
  },
  headerButton: {
    width: 95,
    paddingHorizontal: 15,
    overflow: 'hidden',
    position: 'absolute',
    right: 0
  },
  cyan: {
    color: '#34AADC'
  }
});

export default connect(mapStateToProps, null)(ItemListHeader);