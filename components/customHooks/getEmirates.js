import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmirates } from '../../utils/api';

const useEmirates = () => {
  const [emirates, setEmirates] = useState(null);

  useEffect(() => {
    async function fetchEmirates() {
      try {
        const e = await getEmirates();
        setEmirates(e);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmirates();
  }, []);

  return emirates;
};

// -----------------------

export default useEmirates;
