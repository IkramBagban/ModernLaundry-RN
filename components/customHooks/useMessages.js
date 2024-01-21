import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../config";
import useCustomerId from "./customerId";
const useMessages = () => {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const customerId = useCustomerId();
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchMessages() {
        try {
          const response = await axios.get(API_URL + "/message/" + customerId);
          const r = await axios.get(API_URL + "/message/accounts");
          //   console.log("response", response.data.data);
          // console.log("accounts", r.data);
          if (isActive) {
            setMessages(response.data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      if (customerId) {
        fetchMessages();
      }

      return () => {
        isActive = false;
      };
    }, [customerId])
  );

  return [messages, isLoading];
};

export default useMessages;
