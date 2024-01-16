// import your data list here
import { getProducts } from '../../../utils/api';

// action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

// action creators
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProducts = () => async (dispatch) => {
  try {
    const products = await getProducts(); // fetch data from API (if not available)
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};


// thunk action creator
// export const fetchProducts = () => {
//   return (dispatch) => {
//     // simulate async API call to fetch data
//     setTimeout(async() => {
//       // here you can get data from API
//        const customerData = await getProducts();
//       console.log(customerData);
//       const products = product;
//       dispatch(fetchProductsSuccess(products));
//     }, 2000);
//   };
// };

