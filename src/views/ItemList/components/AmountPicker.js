import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Picker, TouchableOpacity, Easing, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as ShoppingCartActions from 'ShoppingCartActions';

/* Constants */
import { INITIAL_PICKER_AMOUNT, PICKER_HEIGHT } from 'Constants';

/* Get the screen width so we could use it while styling */
const SCREEN_WIDTH = Dimensions.get('window').width;

// NOTE: you could use a separate container file for those
function mapStateToProps(state) {
  return {
    selectedItem: state.shoppingCart.get('selectedItem'),
    selectedAmount: state.shoppingCart.get('selectedAmount'),
    itemsInCart: state.shoppingCart.get('items')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectItem: bindActionCreators(ShoppingCartActions.selectItem, dispatch),
    selectAmount: bindActionCreators(ShoppingCartActions.selectAmount, dispatch),
    addItem: bindActionCreators(ShoppingCartActions.addItem, dispatch)
  }
}

class AmountPicker extends Component {
  /* Add some animation values that are interpolated.
   * We use this for changing the translation in Y axis of the picker.
   * Also as we need to add more picker values on the go, we
   * need to map it to the state */
  constructor(props){
    super(props);
    this.state = {
      pickerPositionAnimation: new Animated.Value(0),
      pickerPositionY: 0,
      numberOfPickerItems: INITIAL_PICKER_AMOUNT
    }
  }

  /* Initialize the starting values and config of the animation
   * before we completely render the view */
  componentWillMount() {
    this.state.pickerPositionY = this.state.pickerPositionAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, PICKER_HEIGHT * -1],
      extrapolate: 'clamp',
      easing: Easing.linear
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItem) {
      Animated.timing(
        this.state.pickerPositionAnimation,
        {toValue: 1, duration: 300}
      ).start();
    }
  }

  /* Play the closing animation and clear the specific values */
  dissmissPicker() {
    this.props.selectItem(null);
    this.props.selectAmount(1);
    Animated.timing(
      this.state.pickerPositionAnimation,
      {toValue: 0, duration: 300}
    ).start();
  }

  onAdd() {
    this.props.addItem(this.props.selectedItem, this.props.selectedAmount);
    this.dissmissPicker();
  }

  onCancel() {
    this.dissmissPicker();
  }

  selectAmount(amount) {
    this.props.selectAmount(amount);
    this.addPickerItems();
  }

  /* Add some more values in the picker view, for infinite selection experience,
   * until we get some overflow */
  addPickerItems() {
    if (this.state.numberOfPickerItems - 10 < this.props.selectedAmount ) {
      this.setState({numberOfPickerItems: this.state.numberOfPickerItems + 100});
    }
  }

  /* Get the top portion of the Picker component */
  getHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => this.onCancel()}>
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {this.props.selectedItem ? this.props.selectedItem.name : ''}
        </Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => this.onAdd()}>
          <Text style={styles.headerButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* Get the list items in the Picker view */
  getPickerValues() {
    let pickerValues = [];
    for (let i = 0; i < this.state.numberOfPickerItems; i++) {
      pickerValues.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }

    return pickerValues;
  }

  /* A little helper, to make the android picker not as ugly
   * and to provide guidence what to do */
  renderAndroidPickerHelper() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.androidHelper}>
          <Text>Tap below to select the amount</Text>
        </View>
      );
    }
  }

  /* Since Android does not support Picker view, we call the dialog as a fallback
   * and add some styling as well. It would be possible to make it look nicer
   * but for simplicity's sake we will avoid serious workarounds */
  getPicker() {
    return (
      <View>
        {this.renderAndroidPickerHelper()}
        <Picker
          selectedValue={this.props.selectedAmount}
          onValueChange={(amount) => this.selectAmount(amount)}
          enabled={true}
          mode={'dialog'}
          style={Platform.OS === 'ios' ? {} : styles.androidDialog}
        >
          {this.getPickerValues()}
        </Picker>
      </View>
    );
  }

  /* We need to use the Animated.View in order to apply animations to it */
  render() {
    return (
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.pickerPositionY}]}] }>
        {this.getHeader()}
        {this.getPicker()}
      </Animated.View>
    );
  }
}

// NOTE: you could extract style to its own file
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: PICKER_HEIGHT,
    width: SCREEN_WIDTH,
    borderTopColor: '#C7C7CC',
    borderTopWidth: 1,
    backgroundColor: '#F7F7F7'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40
  },
  headerButton: {
    padding: 10,
    width: 70
  },
  headerText: {
    paddingTop: 10
  },
  headerButtonText: {
    color: '#34AADC',
    alignSelf: 'center'
  },
  androidDialog: {
    height: PICKER_HEIGHT - 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidHelper: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AmountPicker);