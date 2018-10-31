import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';

import ProductItem from '../components/ProductItem';
import { connect } from 'react-redux'


class ProductsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
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
      this.setState({ products: responseJson })
    })
  }

  componentDidMount() {
    this._getProductsFromAPI()
  }

  componentDidUpdate() {
    console.log("componentDidUpdate : ")
    console.log(this.props.productList)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.products}
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
    productList: state.productList
  }
}

export default connect(mapStateToProps)(ProductsScreen)
