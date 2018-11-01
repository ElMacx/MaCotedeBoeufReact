import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import stateTranscription from '../helper/orderStateTranscription'

class OrderItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const order = this.props.order
    const index = this.props.index
    return (
      <TouchableOpacity style={styles.main_container} onPress={() => this.props.onPress(order)}>
        <View style={styles.content_container}>
          <View style={styles.text_container}>
            <Text style={styles.title_text}>Commande n°{index + 1}</Text>
            <Text style={styles.price}>{stateTranscription[order.state].label}</Text>
          </View>
          <View style={styles.price_container}>
            <Text>Prix total : {order.totalPrice}€</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 50,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15
  },
  image: {
    width: 35,
    height: 35,
    margin: 5,
    backgroundColor: 'gray',
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
  price_container: {
    flex: 3,
    flexDirection: 'column'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  price: {
    fontStyle: 'italic',
    color: '#666666'
  },
})

export default OrderItem
