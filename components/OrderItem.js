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
            <Text style={styles.state}>{stateTranscription[order.state].label}</Text>
          </View>
          <View style={styles.price_container}>
            <Text style={styles.total_price_label}>Prix total</Text>
            <Text style={styles.total_price}>{order.totalPrice}€</Text>
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
    backgroundColor: '#e74c3c',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
    flexWrap: 'wrap',
    color: '#FFFFFF',
    marginLeft: 10,
    marginTop: 5
  },
  state: {
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginLeft: 10,
    marginBottom: 5
  },
  total_price: {
    color: '#FFFFFF'
  },
  total_price_label: {
    color: '#FFFFFF'
  }
})

export default OrderItem
