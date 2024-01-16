import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCustomerId = () => {
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        // console.log('customer ID1', customerId)
        const storedCustomerId = await AsyncStorage.getItem('customerId');
        if (storedCustomerId !== null) {
          setCustomerId(storedCustomerId);
          // console.log('customer ID2', storedCustomerId)

        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerId();
  }, []);

  return customerId;
};

// -----------------------

export default useCustomerId;
