import axios from "axios";
import { VERCEL_API_URL, API_URL } from "../config";


async function getCustomers() {
  try {
    const response = await axios.get(`${API_URL}/auth/customers`);
    console.log("respn", response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    return e.response;
  }
}
async function getCustomer(customerId) {
  try {
    const response = await axios.get(`${API_URL}/auth/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return e.response;
  }
}

async function getProducts() {
  try {
    // const response = await axios.get(`${API_URL}/prod`); // not working.
    const response = await axios.get(`https://lms-backend-bzpt.onrender.com/products`); // not working.
    // const data = response;
    console.log('data in api',response)
    return response.data;
  } catch (error) {
    console.error(error);
    return e.response;
  }
}

async function getServices() {
  try {
    const response = await axios.get(`${VERCEL_API_URL}/services`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return e.response;
  }
}

async function getDeliveryTypes() {
  try {
    const response = await axios.get(`${VERCEL_API_URL}/deliveryTypes`);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return e.response;
  }
}

async function getEmirates() {
  try {
    const response = await axios.get(`${VERCEL_API_URL}/emirates`);
    return response.data;
  } catch (error) {
    console.error(error);
    return e.response;
  }
}

async function getArea() {
  try {
    const response = await axios.get(`${VERCEL_API_URL}/area`);
    return response;
  } catch (error) {
    console.error(error);
    return e.response;
  }
}

const postOrder = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, data);
    return response;
  } catch (error) {
    console.error(error);
    return e.response;
  }
};

const getOrders = async (customerId) => {
  try {
    console.log("customer id in get orders", customerId);
    const response = await axios.get(`${API_URL}/orders/${customerId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return e.response;
  }
};

const postSignUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const postGuest = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/guest`, data);
    return response;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};

const putProfile = async (updatedData, customerId) => {
  try {
    const response = await axios.put(
      `${API_URL}/auth/update/${customerId}`,
      updatedData
    );
    return response;
  } catch (e) {
    console.log(e.response.data);
    return e.response;
  }
};
const postSendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sendotp`, {
      email: email,
    });
    return response;
  } catch (e) {
    console.log(e.response.data);
    return e.response;
  }
};
const postVerifyOtp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verifyOtp`, data);
    return response;
  } catch (e) {
    console.log(e.response.data);
    return e.response;
  }
};

const patchResetPassword = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/auth/resetpassword`, data);
    return response;
  } catch (e) {
    console.log(e.response.data);
    return e.response;
  }
};

export {
  getCustomers,
  getCustomer,
  getProducts,
  getServices,
  getDeliveryTypes,
  getEmirates,
  getArea,
  postOrder,
  getOrders,
  postSignUp,
  postGuest,
  putProfile,
  postSendOtp,
  postVerifyOtp,
  patchResetPassword,
};
