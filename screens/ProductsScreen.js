import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

import ProductItem from '../components/ProductItem';
import { connect } from 'react-redux'


class ProductsScreen extends React.Component {
  static navigationOptions =({navigation})=> ({
      headerRight:(
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text>Add</Text>
          </TouchableOpacity>
      )
  });
  constructor(props) {
    super(props)
  }

  _getProductsFromAPI() {
    return fetch(`https://macotedeboeuf.firebaseio.com/products.json`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const action = { type: "SET_PRODUCT_LIST", value: responseJson }
      this.props.dispatch(action)
    })
  }

  componentDidMount() {
    this._getProductsFromAPI()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.props.productList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ProductItem product={item} onPress={(product) => this.props.navigation.navigate("Product", { product: product }) }/>}
          />
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
    productList: state.setProductList.productList
  }
}

export default connect(mapStateToProps)(ProductsScreen)
