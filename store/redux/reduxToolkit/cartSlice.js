import {createSelector, createSlice} from '@reduxjs/toolkit';

// Define the initial state for the cart slice
const initialState = {
  products: [],
};

// Create a slice for the cart using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to add an item to the cart
    addToCart: (state, action) => {
      const {
        id,
        name,
        quantity,
        category,
        service,
        delivery,
        cartItem,
        deliveryType,
        emirateId,
        pickupDate,
        deliveryDate,
        emirateName
      } = action.payload;
      state.products.push({
        id,
        name,
        quantity,
        category,
        service,
        delivery,
        cartItem,
        deliveryType,
        emirateId,
        pickupDate,
        deliveryDate,
        emirateName
      });
    },

    // Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(item => item.id !== id);
    },

    // Reducer to update the quantity of an item in the cart
    updateCartItemQuantity: (state, action) => {
      const {id, quantity} = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) existingItem.quantity = quantity;
    },

    // Reducer to update the service type of an item in the cart
    updateItemServiceType: (state, action) => {
      const {id, serviceType, servicePrice, deliveryType} = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) {
     
        item.service = {
          type: serviceType,
          price: servicePrice,
        };
      }
    },

    // Reducer to update the delivery type of an item in the cart
    updateItemDelivery: (state, action) => {
      const {id, delivery} = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) {
        item.delivery = {
          type: delivery,
        };
      }
    },

    // Reducer to update the delivery type and service price of an item in the cart
    updateDeliveryType(state, action) {
      const {id, deliveryType, servicePrice} = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.deliveryType = deliveryType;
        product.service.price = servicePrice;
      }
    },

    updateDates(state, action) {
      const pickupDate = action.payload;
      state.products = state.products.map(p => {
        // const pickupDate = new Date()
        switch (p.deliveryType) {
          case '1':
            p.pickupDate = pickupDate;
            p.deliveryDate = new Date(
              new Date().setDate(pickupDate.getDate() + 2),
            );
            break;
          case '2':
            p.pickupDate = pickupDate;
            p.deliveryDate = new Date(
              new Date().setDate(pickupDate.getDate() + 1),
            );
            break;
            case '3':
              p.pickupDate = pickupDate;
              p.deliveryDate = new Date(new Date(pickupDate).setHours(pickupDate.getHours() + 12));
            //   p.deliveryDate = new Date(pickupDate.getTime() + (12 * 60 * 60 * 1000));
            break;
          default:
            console.log('something went wrong');
            break;
        }
        return p;
      });
    },
    emptyProducts(state){
      state.products ?  state.products = [] : null
    }
  },
});

// Export the cart slice reducer
export default cartSlice.reducer;

// Export the cart slice actions
export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  updateItemServiceType,
  updateItemDelivery,
  updateDeliveryType,
  updateDates,
  emptyProducts
} = cartSlice.actions;

// Selector to get the cart state from the root state
export const selectCart = state => state.cart;

// Selector to get all cart items using createSelector from Redux Toolkit
export const selectAllCartItems = createSelector(
  selectCart,
  cartState => cartState.products,
);

// Selector to get a cart item by its ID using createSelector from Redux Toolkit
export const selectCartItemById = createSelector(
  [selectCart, (state, itemId) => itemId],
  (cartState, itemId) => {
    const item = cartState.products.find(item => item.id === itemId);
    return item;
  },
);

// Selector to get the total price of all items in the cart using createSelector from Redux Toolkit
export const selectCartTotalPrice = createSelector(selectCart, cartState => {
  if (!Boolean(cartState.products.length)) return 0;
  const price = cartState.products.reduce((totalPrice, cartItem) => {
    return totalPrice + cartItem.quantity * cartItem.service.price;
  }, 0);

  return parseFloat(price.toFixed(2));
});

// Selector to get the total quantity of all items in the cart using createSelector from Redux Toolkit
export const selectCartTotalQuantity = createSelector(selectCart, cartState => {
  if (!Boolean(cartState.products.length)) return 0;
  return cartState.products.reduce((totalQty, cartItem) => {
    return totalQty + cartItem.quantity;
  }, 0);
});

// Selector to get the total price of a specific item in the cart using createSelector from Redux Toolkit
export const selectItemTotalPrice = createSelector(
  [
    selectCart,
    (state, itemId) =>
      state.cart.products.find(cartItem => cartItem.id === itemId),
  ],

  (cartState, item) => {
    if (!item) return 0;
    const price = item.quantity * item.service.price;
    return Number(price.toFixed(2));
  },
);
