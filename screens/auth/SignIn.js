import { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { AuthContext } from "../../store/checkAuth";
import { getCustomers } from "../../utils/api";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../UI/LoadingOverlay";
import Title from "../../components/Title";
import Caption from "../../components/Caption";

const SignIn = ({ navigation }) => {
  // State variable to track if the user is logging in
  const [isUserLogging, setisUserLogging] = useState(false);

  // Access the authentication context
  const authCntx = useContext(AuthContext);

  useEffect(() => {
    if (authCntx.isAuthendicate) {
      navigation.navigate("Category", { id: authCntx.userId });
    }
  }, [authCntx.isAuthendicate, navigation]);

  // Handle the login process
  const handleLogin = async ({ email, Password }) => {
    console.log("loginn: " + email, Password);

    // Get customer data
    const customerData = await getCustomers();

    // Set the flag to indicate that the user is logging in
    // setisUserLogging(true);
    try {
      // Check if email and password are provided
      if (!email || !Password) {
        // alert("Please enter your email and password.");
        showMessage({
          message: "Please Enter Your Email And Password.",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
        return;
      }
      // Find the user based on the provided email and password
      console.log(email + " => " + typeof Password);
      const user = customerData.data.find(
        (c) =>
          c.email.toLowerCase() === email &&
          c.confirmPassword.toString() === Password.toString()
      );
      console.log("user", user);

      if (user) {
        console.log("userId", user.serialNo);
        showMessage({
          message: "Welcome Back!",
          icon: () => (
            <MaterialIcons name="check-circle" size={24} color="white" />
          ),
          type: "success",
        });
        // Store the authenticated user's ID in AsyncStorage
        // await AsyncStorage.setItem("customerId", user.serialNo);
        // authCntx.authenticate(user.serialNo);
        await AsyncStorage.setItem("customerId", user._id);
        authCntx.authenticate(user._id);
        // navigation.navigate('Category', {id: user.serialNo});
        setisUserLogging(true);
      } else {
        // alert("Invalid email or password");
        showMessage({
          message: "Invalid email or password.",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Unable to login. Please try again later.");
    }
    // Store the authenticated user's ID in AsyncStorage
    setisUserLogging(false);
  };

  // Show a loading overlay while the user is logging in
  if (isUserLogging) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
    <View style={styles.form}>
      <Title text="Welcome Back" size={35} />
      <Caption text="Please sign in to your Laundry App account" />
      <AuthContent isLogin onAuthenticate={handleLogin} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
  },
});
