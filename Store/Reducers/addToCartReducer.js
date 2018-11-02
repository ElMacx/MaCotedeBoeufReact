// Store/Reducers/addToCartReducer.js

const initialState = { cart: [] }

function addToCart(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CART':
      const tmpCart = state.cart
      const item = tmpCart.find(item => item.id === action.value.id)
      if (item) {
          item.quantity += action.value.quantity
      } else {
          tmpCart.push({ id: action.value.id, quantity: action.value.quantity })
      }
      return {
        ...state,
        cart: tmpCart,
      }
    case 'REMOVE_CART':
      return {
        ...state,
        cart: state.cart.filter(e => e.id !== action.value)
      }
    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      }
  default:
    return state
  }
}

export default addToCart;
