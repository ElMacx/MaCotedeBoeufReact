import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  Alert,
} from 'react-native';

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

  _orderSucces() {
    const action = { type: "EMPTY_CART", value: {} }
    this.props.dispatch(action)
    Alert.alert('Votre commande à été transmise')
  }

  _doOrder() {
    Alert.alert('Commande', 'Voulez vous commander ces produits',
      [{ text: 'Valider', onPress: () => this._orderSucces() }, { text: 'Annuler', onPress: () => {} }])
  }

  render() {
    const curCart = this.props.cart
    return (
      <View style={styles.container}>
        <FlatList
            data={this.props.cart}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ProductItemCart product={this._findProductById(item.id)}/>}
          />
          <Button title="Commander" onPress={() => this._doOrder()}/>
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
