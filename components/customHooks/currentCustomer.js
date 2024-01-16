import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getCustomer, getCustomers } from "../../utils/api";
import { useGetCustomersQuery } from "../../store/redux/reduxToolkit/apiSlice";

const useCurrentCustomer = (customerId, setIsLoading, email) => {
  const [currentCustomer, setCurrentCustomer] = useState(null);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchCustomers() {
        try {
          const customer = await getCustomer(customerId);

          if (isActive) {
            setCurrentCustomer(customer.data[0]);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading && setIsLoading(false);
        }
      }

      if (customerId) {
        fetchCustomers();
      }

      return () => {
        isActive = false;
      };
    }, [customerId, email])
  );

  // Rest of the code...

  return currentCustomer;
};

export default useCurrentCustomer;
