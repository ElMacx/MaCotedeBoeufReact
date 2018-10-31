import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native'
import { connect } from 'react-redux'

class ProductScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
    }
  }

  _redirectToList() {
    this.props.navigation.goBack()
  }

  _redirectToCart() {
    this.props.navigation.push('Cart')
  }

  _addToCart(product) {
      const action = { type: "ADD_CART", value: { id: product.id, quantity: parseInt(this.state.quantity) } }
      this.props.dispatch(action)
      Alert.alert('Succès', 'Produit ajouté correctement au panier',
        [{ text: 'Ok', onPress: () => this._redirectToList() }, { text: 'Aller au panier', onPress: () => this._redirectToCart() }])
  }

  render() {
    const product = this.props.navigation.state.params.product
    return (
      <View style={styles.container}>
        <Text>{product.name}</Text>
        <Text>{product.description}</Text>
        <Text>{product.price}</Text>
        <TextInput
            placeholder='Quantité'
            keyboardType='phone-pad'
            onChangeText={(nb) => this.setState({ quantity: nb })}/>
        <Button title="Commander" onPress={() => this._addToCart(product)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'black',
      width: 250,
      height: 50,
      padding: 15
  },
})

const mapStateToProps = (state) => {
  return {
    cart: state.addToCart.cart
  }
}

export default connect(mapStateToProps)(ProductScreen)
