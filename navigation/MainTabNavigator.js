import React from 'react';
import { Platform, Button, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
    navigationOptions: {
      title: 'Produits',
    }
  },
  Product: {
    screen: ProductScreen
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
    navigationOptions: {
      title: "Les promotions"
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
    navigationOptions: {
      title: 'Mes commandes',
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
    navigationOptions: {
      title: 'Mon détail de commande'
    }
  },
  Product: {
    screen: ProductScreen
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
    navigationOptions: {
      title: 'Votre compte'
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
