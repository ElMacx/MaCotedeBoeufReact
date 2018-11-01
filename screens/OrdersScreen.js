import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../components/OrderItem';
import * as firebase from 'firebase';
import { connect } from 'react-redux'


class OrdersScreen extends React.Component {
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
      mixedOrders: [],
      stickyHeaderIndices: []
    }
  }

  _calcTotalPriceForOrder(item) {
    let total = 0
    item.forEach(elem => {
      const product = this.props.productList.find(e => e.id === elem.id)
      if (product) {
        total += product.price * elem.quantity
      }
    })
    return total
  }

  _adaptObjectForList(obj) {
      const ret = []
      Object.keys(obj).forEach(key => {
          ret.push({
            id: key,
            productList: obj[ key ].productList,
            state: obj[ key ].state,
            totalPrice: this._calcTotalPriceForOrder(obj[ key ].productList)
          })
      })
      return ret
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
      const resArray = this._adaptObjectForList(responseJson)
      this.setState({ mixedOrders: [
        { label: "Commandes en cours", header: true, id: "1" },
        ...resArray.filter(e => (e.state !== 4 && e.state !== 3)),
        { label: "Commandes terminées", header: true, id: "2" },
        ...resArray.filter(e => (e.state === 4 || e.state === 3))]
      })
      const arr = []
      this.state.mixedOrders.map(obj => {
        if (obj.header === true) {
          arr.push(this.state.mixedOrders.indexOf(obj))
        }
      })
      arr.push(0)
      this.setState({ stickyHeaderIndices: arr })
    })
  }

  _openOrderDetail(order) {
    this.props.navigation.navigate('OrderDetail', { orderDetail: order })
  }

  _renderItem = ({ item, index }) => {
    if (item.header) {
      return (
        <View style={styles.header_container}>
          <Text>{ item.label }</Text>
        </View>
      );
    } else if (!item.header) {
      return (
          <OrderItem order={item} index={index} onPress={(order) => this._openOrderDetail(order)}/>
      );
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._getOrdersFromAPI(user.uid)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.mixedOrders}
                  keyExtractor={(item) => item.id}
                  renderItem={this._renderItem}
                  stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header_container: {
    flex: 1,
    backgroundColor: '#fff000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    height: 40,
  }
});

const mapStateToProps = (state) => {
  return {
    productList: state.setProductList.productList,
  }
}

export default connect(mapStateToProps)(OrdersScreen)
