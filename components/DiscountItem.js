import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import stateTranscription from '../helper/orderStateTranscription'

class DiscountItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const discount = this.props.discount
    return (
      <View style={styles.main_container}>
        <View style={styles.content_container}>
          <View style={styles.text_container}>
            <Text style={styles.title_text}>{discount.title}</Text>
            <Text style={styles.daterange}>Date de fin : {discount.daterange}</Text>
          </View>
          <View style={styles.price_container}>
            <Text>Prix total : {discount.price}€</Text>
          </View>
        </View>
      </View>
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
  daterange: {
    fontStyle: 'italic',
    color: '#666666'
  },
})

export default DiscountItem
