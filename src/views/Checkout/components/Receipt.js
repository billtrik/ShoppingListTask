import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    itemsInCart: state.shoppingCart.get('items'),
    sum: state.shoppingCart.get('sum'),
    discount: state.shoppingCart.get('discount')
  }
}

class Receipt extends Component {
  getNoItemsSelected() {
    return (
      <View style={styles.noItemsSelected}>
        <Text>No items selected.</Text>
      </View>
    );
  }

  getItem(item) {
    return (
      <View key={item.id} style={styles.item}>
        <Text>{item.name}</Text>
        <Text>{`${item.price}ct x ${item.amount}`}</Text>
      </View>
    );
  }

  getItemsInCart() {
    const items = this.props.itemsInCart.map((item) => {
      return this.getItem(item);
    });
    if (items.length > 0) {
      return items;
    }
    return this.getNoItemsSelected();
  }

  getTotals() {
    return (
      <View style={styles.totals}>
        <View style={styles.separator}></View>
        <View style={styles.totalsText}>
          <Text>SUM:</Text>
          <Text>{this.props.sum}</Text>
        </View>
        <View style={styles.totalsText}>
          <Text>DISCOUNT:</Text>
          <Text>{this.props.discount}</Text>
        </View>
        <View style={styles.totalsText}>
          <Text>TOTAL:</Text>
          <Text>{this.props.sum - this.props.discount}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.getItemsInCart()}
        {this.getTotals()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  totals: {
    borderTopWidth: 1,
    marginLeft: 15
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    height: 26
  },
  totalsText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15
  },
  noItemsSelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  }
});

export default connect(mapStateToProps, null)(Receipt);