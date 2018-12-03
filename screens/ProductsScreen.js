import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import ProductItem from '../components/ProductItem';
import { connect } from 'react-redux'


class ProductsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
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
    })
    .catch(() => {})
  }

  componentDidMount() {
    this._getProductsFromAPI()
  }

  render() {
    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._getProductsFromAPI}
          />
        }>
        <FlatList
            data={this.props.productList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ProductItem product={item} onPress={(product) => this.props.navigation.navigate("Product", { product: product, fromOrder: false }) }/>}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    marginBottom: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    productList: state.setProductList.productList
  }
}

export default connect(mapStateToProps)(ProductsScreen)
