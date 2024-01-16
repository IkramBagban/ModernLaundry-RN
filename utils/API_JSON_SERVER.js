// import axios from "axios";
// import products from "./products";

// const BASE_URL = "https://ml-database.vercel.app";

// async function getCustomers() {
//   try {
//     const response = await axios.get(`${BASE_URL}/customers`);

//     return response;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Unable to fetch customer data. Please try again later.");
//   }
// }

// async function getProducts() {
//   try {
//     return products;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getServices() {
//   try {
//     const response = await axios.get(`${BASE_URL}/services`);
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getDeliveryTypes() {
//   try {
//     const response = await axios.get(`${BASE_URL}/deliveryTypes`);
//     const data = response.data.data;
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getEmirates() {
//   try {
//     const response = await axios.get(`${BASE_URL}/emirates`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getArea() {
//   try {
//     const response = await axios.get(`${BASE_URL}/area`);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

// const getOrders = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/orders`);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const postOrder = async (data) => {
//   console.log("postOrder ", data);
// };

// const postSignUp = async (data) => {
//   console.log("postSignUp ", data);
// };

// const putProfile = async (updatedData) => {
//   console.log("Put Profile ", updatedData);
// };
  
// const postOTP = async (data) => {
//   console.log("postOTP ", data);
// };

// export {
//   getCustomers,
//   getProducts,
//   getServices,
//   getDeliveryTypes,
//   getEmirates,
//   getArea,
//   postOrder,
//   getOrders,
//   postSignUp,
//   putProfile,
//   postOTP,
// };
