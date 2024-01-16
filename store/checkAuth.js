import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  // token: "",
  isAuthendicate: false,
  authenticate: (token) => {},
  logout: () => {},
  userId : "",
});

const AuthContentProvider = ({ children }) => {
  // const [isAuth, setisAuth] = useState();
  const [userId, setuserId] = useState();

  function authenticate(userId) {
    try {
      setuserId(userId)
      AsyncStorage.setItem("customerId", userId);
      
    } catch (error) {
      console.log(error);
    }
    // setisAuth(token);
  }
  function logout() {
    try {
      setuserId(null);
      AsyncStorage.setItem("customerId", "");
      
    } catch (error) {
      console.log(error);
    }
    // setisAuth(null);
  }
  const value = {
    // token: isAuth,
    isAuthendicate: !!userId,
    authenticate: authenticate,
    logout: logout,
    userId : userId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContentProvider;
