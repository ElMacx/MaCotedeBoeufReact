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


class OrderDetailScreen extends React.Component {
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

  _getProductById(id) {
      return this.props.productList.find(e => e.id === id)
  }

  render() {
    const orderDetailList = this.props.navigation.state.params.orderDetail
    return (
      <View style={styles.container}>
        <FlatList
            data={orderDetailList.productList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <ProductItem product={this._getProductById(item.id)}
            onPress={(product) => this.props.navigation.navigate("Product", { product: product, fromOrder: true }) }/>}
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

export default connect(mapStateToProps)(OrderDetailScreen)
