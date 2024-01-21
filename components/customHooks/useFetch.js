import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../config";

const useFetch = (endpoint) => {
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchdata() {
        try {
          const response = await axios.get(API_URL + endpoint);
          if (isActive) {
            setdata(response.data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading && setIsLoading(false);
        }
      }

      fetchdata();

      return () => {
        isActive = false;
      };
    }, [endpoint])
  );

  return [data,isLoading];
};

export default useFetch;
