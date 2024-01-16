export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';
const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = {
        id: action.payload.id,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        date: action.payload.date,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
