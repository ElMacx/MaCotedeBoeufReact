import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import DiscountItem from '../components/DiscountItem'

export default class DiscountScreen extends React.Component {
  static navigationOptions =({navigation})=> ({
      headerRight:(
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text>Add</Text>
          </TouchableOpacity>
      )
  });

  constructor(props) {
    super(props),
    this.state = {
      discountList: []
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
  }

  componentDidMount() {
    this._getDiscountFromAPI()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.discountList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <DiscountItem discount={item}/>}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
