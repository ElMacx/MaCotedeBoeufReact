import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import * as firebase from 'firebase';


export default class OrdersScreen extends React.Component {
  static navigationOptions =({navigation})=> ({
      headerRight:(
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text>Add</Text>
          </TouchableOpacity>
      )
  });
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
    }
  }

  _getOrdersFromAPI(id) {
    return fetch(`https://macotedeboeuf.firebaseio.com/orders/${id}.json`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ orders: responseJson })
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._getOrdersFromAPI(user.uid)
      }
    });
  }

  render() {
    return (
      <View>
        <FlatList
            data={this.state.orders}
            keyExtractor={(item) => item.totalPrice}
            renderItem={({item}) => <Text>{item.totalPrice}</Text>}
          />
      </View>
    );
  }
}
