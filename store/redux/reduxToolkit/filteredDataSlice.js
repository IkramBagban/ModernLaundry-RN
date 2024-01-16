import { createSlice } from "@reduxjs/toolkit";

const filteredDataSlice = createSlice({
  name: "filteredData",
  initialState: {
    filteredPricing: {},
    currentCustomerData: {},
    orderData: [],
    emiratesData: [],
    emirateId: null,
  },
  reducers: {
    setFilteredData: (state, action) => {
      const { productId, filteredData } = action.payload;
      state.filteredPricing[productId] = filteredData;
    },
    setCurrentCustomerData: (state, action) => {
      state.currentCustomerData = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setEmiratesData: (state, action) => {
      state.emiratesData = action.payload;
    },
    addCustomerIdToStore: (state, action) => {
      state.emirateId = action.payload;
    },
  },
});

export const {
  setFilteredData,
  setCurrentCustomerData,
  setOrderData,
  setEmiratesData,
  addCustomerIdToStore,
} = filteredDataSlice.actions;

export default filteredDataSlice.reducer;
