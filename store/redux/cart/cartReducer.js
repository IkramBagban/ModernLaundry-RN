import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../cart/cartAction';

const initialState = {
  items: [], // array to hold added items - length
  total: 0, // total price of added items
};
let initialPrice = 0
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const itemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (itemIndex >= 0) {
        // item already exists in the cart, so update its quantity and price
        const updatedItem = {
          ...state.items[itemIndex],
          quantity: state.items[itemIndex].quantity + 1,
          price: state.items[itemIndex].price + initialPrice,
        };
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemIndex),
            updatedItem,
            ...state.items.slice(itemIndex + 1),
          ],
          total: state.total + initialPrice,
        };
      } else {
        // item does not exist in the cart, so add it
        const newItem = {
          ...action.payload,
          price: action.payload.price * action.payload.quantity,
        };
        initialPrice = newItem.price
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + newItem.price,
        };
      }
    }
    case REMOVE_FROM_CART: {
      const itemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (itemIndex >= 0) {
        // item exists in the cart, so remove it
        const itemPrice = state.items[itemIndex].price;
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemIndex),
            ...state.items.slice(itemIndex + 1),
          ],
          total: state.total - itemPrice,
        };
      } else {
        // item does not exist in the cart, so return current state
        return state;
      }
    }
    case CLEAR_CART: {
      return initialState;
    }
    default:
      return state;
  }
};

export default cartReducer;
