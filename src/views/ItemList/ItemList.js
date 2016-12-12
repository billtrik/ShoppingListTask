/**
* @providesModule ItemList
*/
import React, { Component } from 'react';
import { View, ListView, StyleSheet, BackAndroid } from 'react-native';

/* Constants */
import { VIEWS, DUMMY_DATA } from 'Constants';

/* Components */
import ItemRow from './components/ItemRow';
import AmountPicker from './components/AmountPicker';
import ItemListHeader from './components/ItemListHeader';

class ItemList extends Component {
  /* Create the source for rows we use in ListView */
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(DUMMY_DATA.ITEMS)
    };
  }

  /* We add an event listener to prevent the back button from closing the app
   * and poping by one from the apps navigation stack */
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
       this.props.navigator.pop();
       return true;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemListHeader navigator={this.props.navigator}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ItemRow rowData={rowData} />}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => <View key={rowID} style={styles.separator} />}
        />
        <AmountPicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#C7C7CC',
    marginLeft: 15
  }
});

export default ItemList;