import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import ProductItemCart from '../components/ProductItemCart';
import { connect } from 'react-redux'

class CartScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  _findProductById(id) {
    const item = this.props.productList.find(e => e.id === id)
    return item
  }

  _prepareOrderToPOST() {
    return {
      state: 0,
      productList: this.props.cart,
    }
  }

  _orderSucces() {
    return fetch(`https://macotedeboeuf.firebaseio.com/orders/${firebase.auth().currentUser.uid}.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this._prepareOrderToPOST()),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const action = { type: "EMPTY_CART", value: {} }
      this.props.dispatch(action)
      Alert.alert('Votre commande à été transmise')
    })
  }

  _doOrder() {
    Alert.alert('Commande', 'Voulez vous commander ces produits',
      [{ text: 'Valider', onPress: () => this._orderSucces() }, { text: 'Annuler', onPress: () => {} }])
  }

  _renderFlatListIfNotEmpty() {
    if (this.props.cart && this.props.cart.length > 0) {
      return (
        <View>
          <FlatList data={this.props.cart}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <ProductItemCart product={this._findProductById(item.id)}
                                            quantity={item.quantity}
                                            rowId={item.id}
                                            onPress={(product) => this.props.navigation.navigate("Product", { product: product, fromOrder: true }) }
                                            />
                                }
          />
          <Button title="Commander" onPress={() => this._doOrder()}/>
        </View>
      )
    } else {
      return (<Text>Panier vide</Text>)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this._renderFlatListIfNotEmpty() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

const mapStateToProps = (state) => {
  return {
    productList: state.setProductList.productList,
    cart: state.addToCart.cart,
  }
}

export default connect(mapStateToProps)(CartScreen)
