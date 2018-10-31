// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import addToCart from './Reducers/addToCartReducer';
import setProductList from './Reducers/setProductListReducer';

export default createStore(combineReducers({ addToCart, setProductList }))
