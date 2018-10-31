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
            <Text style={styles.price} numberOfLines={6}>{product.price}</Text>
          </View>
          <View style={styles.icon_container}>
            <Icon type='ionicon' name='ios-arrow-forward'/>
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
    flex: 5,
    flexDirection: 'column'
  },
  icon_container: {
    flex: 1,
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

export default ProductItem
