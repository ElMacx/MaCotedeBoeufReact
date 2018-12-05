import React from 'react';
import { Platform, Button, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'

import TabBarIcon from '../components/TabBarIcon';
import ProductsScreen from '../screens/ProductsScreen';
import DiscountScreen from '../screens/DiscountScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen'

const ProductStack = createStackNavigator({
  Products: {
    screen: ProductsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Produits',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#ffffff'
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
      }
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      title: 'Votre panier',
    }
  }
});

ProductStack.navigationOptions = {
  tabBarLabel: 'Produits',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  ),
};

const DiscountStack = createStackNavigator({
  Discount: {
    screen: DiscountScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Les promotions',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#ffffff'
      }
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      title: 'Votre panier',
    }
  }
});

DiscountStack.navigationOptions = {
  tabBarLabel: 'Promotions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-alert${focused ? '' : '-outline'}` : 'md-exclamation'}
    />
  ),
};

const OrdersStack = createStackNavigator({
  Orders: {
    screen: OrdersScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Mes commandes',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#ffffff'
      }
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      title: 'Votre panier',
    }
  },
  OrderDetail: {
    screen: OrderDetailScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Mon détail de commande',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#ffffff'
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Les promotions',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
      }
    }
  },
});

OrdersStack.navigationOptions = {
  tabBarLabel: 'Mes commandes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-checkmark-circle${focused ? '' : '-outline'}` : 'md-check-circle'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Votre compte',
        headerRight: (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Cart')}>
              <Icon type='ionicon' color='#ffffff' name='ios-cart'/>
            </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#ffffff'
      }
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      title: 'Votre panier',
    }
  }
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Mon compte',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-user'}
    />
  ),
};

export default createBottomTabNavigator({
  ProductStack,
  DiscountStack,
  OrdersStack,
  AccountStack,
});
