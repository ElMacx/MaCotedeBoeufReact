// Store/Reducers/setProductListReducer.js

const initialState = { productList: [] }

function setProductList(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRODUCT_LIST':
      return {
        ...state,
        productList: action.value,
      }
  default:
    return state
  }
}

export default setProductList;
