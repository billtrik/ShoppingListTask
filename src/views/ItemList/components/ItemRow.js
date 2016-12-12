import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as ShoppingCartActions from 'ShoppingCartActions';

// NOTE: you could use a separate container file for those
function mapStateToProps(state) {
  return {
    selectedItem: state.shoppingCart.get('selectedItem'),
    itemsInCart: state.shoppingCart.get('items')
  }
}

/* Map the specific dispatch actions, only those needed in this context */
function mapDispatchToProps(dispatch) {
  return {
    selectItem: bindActionCreators(ShoppingCartActions.selectItem, dispatch),
    selectAmount: bindActionCreators(ShoppingCartActions.selectAmount, dispatch)
  }
}

class ItemRow extends Component {
  selectItem() {
    this.props.selectItem(this.props.rowData);
    this.props.selectAmount(this.checkForSelectedValues());
  }

  /* If we have already a selected value in the cart
   * just use that instead of 0 */
  checkForSelectedValues() {
    const selectedItemFromCart = _.find(this.props.itemsInCart, {id: this.props.rowData.id});
    if (selectedItemFromCart) {
      return selectedItemFromCart.amount;
    }
    return 0;
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.selectItem()}
      >
        <Text style={styles.rowText}>{this.props.rowData.name}</Text>
        <Text style={styles.rowText}>{`${this.props.rowData.price} ct`}</Text>
      </TouchableOpacity>
    );
  }
}

// NOTE: you could extract style to its own file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center'
  },
  rowText: {
    paddingHorizontal: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);