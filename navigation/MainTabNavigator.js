import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ProductsScreen from '../screens/ProductsScreen';
import DiscountScreen from '../screens/DiscountScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import ProductScreen from '../screens/ProductScreen';

const ProductStack = createStackNavigator({
  Products: {
    screen: ProductsScreen,
    navigationOptions: {
      title: 'Produits'
    }
  },
  Product: {
    screen: ProductScreen
  },
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
  Discount: DiscountScreen,
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
  Orders: OrdersScreen,
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
  Account: AccountScreen,
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
