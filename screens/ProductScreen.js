import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import SelectInput from 'react-native-select-input-ios';


class ProductScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
    }
  }

  _redirectToList() {
    this.props.navigation.goBack()
  }

  _redirectToCart() {
    this.props.navigation.push('Cart')
  }

  _buildSelectInputOptions() {
    let index = 1
    const ret = []
    while (index < 15) {
      ret.push({ value: index, label: index.toString()})
      index++
    }
    return ret
  }

  _addToCart(product) {
      const action = { type: "ADD_CART", value: { id: product.id, quantity: parseInt(this.state.quantity) } }
      this.props.dispatch(action)
      Alert.alert('Succès', 'Produit ajouté correctement au panier',
        [{ text: 'Ok', onPress: () => this._redirectToList() }, { text: 'Aller au panier', onPress: () => this._redirectToCart() }])
  }

  _renderAddToCartItems(product) {
    const fromOrder = this.props.navigation.state.params.fromOrder
    if (!fromOrder) {
      return (
        <View style={styles.button_container}>
          <View style={styles.quantity_container}>
            <Text style={{ color: '#ffffff'}}>Quantité (nb personnes)</Text>
            <SelectInput options={this._buildSelectInputOptions()}
                         value={this.state.quantity}
                         onSubmitEditing={(item) => this.setState({ quantity: item })}
                         cancelKeyText={'Annuler'}
                         submitKeyText={'Confirmer'}/>
          </View>
          <Button style={styles.order_button} title="Commander" onPress={() => this._addToCart(product)}/>
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    const product = this.props.navigation.state.params.product
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: "image"}}/>
        <View style={styles.body_container}>
          <View style={styles.body_text_container}>
            <Text style={styles.product_title}>{product.name}</Text>
            <Text style={styles.product_description}>{product.description}</Text>
            <Text style={styles.product_price}>Prix : {product.price}€/kg</Text>
          </View>
          <View style={styles.button_container}>
            { this._renderAddToCartItems(product) }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  input: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'black',
      width: 250,
      height: 50,
      padding: 15
  },
  image: {
    backgroundColor: '#FFFFFF',
    width: 400,
    height: 150
  },
  body_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  body_text_container: {
    marginTop: 15,
    flex: 5,
    alignItems: 'center'
  },
  button_container: {
    flexDirection: 'column',
    flex: 5
  },
  product_title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffffff'
  },
  product_description: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    textAlign: 'justify',
    color: '#ffffff'
  },
  product_price: {
    marginTop: 15,
    fontStyle: 'italic',
    color: '#ffffff'
  },
  quantity_container: {
    flexDirection: 'column',
    flex: 1,
  },
  order_button: {
    marginBottom: 15
  }
})

const mapStateToProps = (state) => {
  return {
    cart: state.addToCart.cart
  }
}

export default connect(mapStateToProps)(ProductScreen)
