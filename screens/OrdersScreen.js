import React from 'react';
import { ScrollView, RefreshControl, View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../components/OrderItem';
import * as firebase from 'firebase';
import { connect } from 'react-redux'


class OrdersScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mixedOrders: [],
      stickyHeaderIndices: [],
      refreshing: false,
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
    return total.toFixed(2)
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
          <Text style={styles.header_text}>{ item.label }</Text>
        </View>
      );
    } else if (!item.header) {
      return (
          <OrderItem order={item} index={index} onPress={(order) => this._openOrderDetail(order)}/>
      );
    }
  };

  componentDidMount() {
    this._getOrdersFromAPI(firebase.auth().currentUser.uid)
  }

  render() {
    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._getOrdersFromAPI(firebase.auth().currentUser.uid)}
          />
        }>
        <FlatList data={this.state.mixedOrders}
                  keyExtractor={(item) => item.id}
                  renderItem={this._renderItem}
                  stickyHeaderIndices={this.state.stickyHeaderIndices}
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
  header_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    height: 50,
    borderBottomWidth: .5,
    borderBottomColor: '#ffffff',
    borderTopWidth: .5,
    borderTopColor: '#ffffff'
  },
  header_text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  return {
    productList: state.setProductList.productList,
  }
}

export default connect(mapStateToProps)(OrdersScreen)
