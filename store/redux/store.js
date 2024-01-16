import { createStore, combineReducers,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './reduxToolkit/cartSlice';
import filteredDataSlice from './reduxToolkit/filteredDataSlice';


const rootReducer = combineReducers({
  // products: productReducer,
  cart: cartReducer,
  filteredData: filteredDataSlice
  
});


const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;


// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import cartReducer from './reduxToolkit/cartSlice';
// import filteredDataSlice from './reduxToolkit/filteredDataSlice';
// import { getApiData } from './reduxToolkit/apiSlice';
// import { configureStore } from '@reduxjs/toolkit';

// Combine all reducers into a root reducer
// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     filteredData: filteredDataSlice,
//     [getApiData.reducerPath]: getApiData.reducer, // add the api reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(getApiData.middleware),
// });

// export default store;
