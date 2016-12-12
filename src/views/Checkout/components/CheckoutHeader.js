import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


// NOTE: you could create a reusable header component
class CheckoutHeader extends Component {
  /* Use the navigator which was passed from parrent
   * to .pop() from the top of navigation stack */
  navigateBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Checkout</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => this.navigateBack()}
        >
          <Text style={styles.cyan}>Back</Text>
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
    left: 0
  },
  cyan: {
    color: '#34AADC'
  }
});

export default CheckoutHeader;