import React from 'react';
import { ScrollView, RefreshControl, View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import DiscountItem from '../components/DiscountItem'

export default class DiscountScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      discountList: [],
      refreshing: false,
    }
  }

  _getDiscountFromAPI() {
    return fetch(`https://macotedeboeuf.firebaseio.com/promotions.json`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ discountList: responseJson })
    })
    .catch(e => {
    })
  }

  componentDidMount() {
    this._getDiscountFromAPI()
  }

  render() {
    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._getDiscountFromAPI}
          />
        }>
        <FlatList
            data={this.state.discountList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <DiscountItem discount={item}/>}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
});
