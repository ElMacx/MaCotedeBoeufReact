import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

class ProductItem extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const product = this.props.product
    return (
      <TouchableOpacity style={styles.main_container} onPress={() => this.props.onPress(product)}>
        <Image
          style={styles.image}
          source={{uri: "image"}}/>
        <View style={styles.content_container}>
          <View style={styles.text_container}>
            <Text style={styles.title_text}>{product.name}</Text>
            <Text style={styles.price}>Prix : {product.price}€/kg</Text>
          </View>
          <View style={styles.icon_container}>
            <Icon color='#FFFFFF' type='ionicon' name='ios-arrow-forward'/>
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
    flex: 5,
    flexDirection: 'column',
    marginTop: 5
  },
  icon_container: {
    flex: 1,
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
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 5
  },
})

export default ProductItem
