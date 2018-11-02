import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import { connect } from 'react-redux'

class ProductItemCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRowKey: null
    }
  }

  render() {
    const product = this.props.product
    const quantity = this.props.quantity
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey !== null) {
          this.setState({ activeRowKey: null })
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: rowId })
      },
      right: [
        {
          onPress: () => {
            const action = { type: "REMOVE_CART", value: this.state.activeRowKey }
            this.props.dispatch(action)
          },
          text: 'Supprimer',
          type: 'delete'
        }
      ],
      rowId: this.props.rowId,
      sectionId: 1
    }
    return (
      <TouchableOpacity style={styles.main_container} onPress={() => this.props.onPress(product)}>
          <Image
            style={styles.image}
            source={{uri: "image"}}/>
          <View style={styles.content_container}>
            <View style={styles.text_container}>
              <Text style={styles.title_text}>{product.name}</Text>
              <Text style={styles.price}>Prix : {product.price}€</Text>
            </View>
            <View style={styles.qty_container}>
              <Text style={styles.quantity}>Quantité : {quantity}</Text>
            </View>
          </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 60,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    backgroundColor: '#e74c3c',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  content_container: {
    flex: 1,
    margin: 5,
    flexDirection: 'row'
  },
  text_container: {
    flex: 7,
    flexDirection: 'column'
  },
  qty_container: {
    flex: 3,
    flexDirection: 'column',
    marginTop: 15
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: '#FFFFFF',
  },
  price: {
    fontStyle: 'italic',
    color: '#666666',
    fontStyle: 'italic',
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 5
  },
  quantity: {
    color: '#FFFFFF'
  }
})

const mapStateToProps = (state) => {
  return {
    cart: state.addToCart.cart,
  }
}

export default connect(mapStateToProps)(ProductItemCart)
