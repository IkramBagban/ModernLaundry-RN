import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../components/Auth/Input";
import {
  getEmirates,
  postGuest,
} from "../../utils/api";
import { ColorPalate, MyFonts } from "../../constants/var";
import Title from "../../components/Title";
import MyGradientButton from "../../components/MyGradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../../store/checkAuth";
import Dropdown from "../../components/Dropdown";
import { showMessage } from "react-native-flash-message";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LoginAsGuest = ({ navigation }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [selectedEmirate, setSelectedEmirate] = useState();
  const [emirates, setEmirates] = useState([]);
  const [isReadyToLogin, setIsReadyToLogin] = useState(false);
  const authCntx = useContext(AuthContext);

  useEffect(() => {
    if (authCntx.isAuthendicate) {
      navigation.navigate("Category", { id: authCntx.userId });
    }
  }, [authCntx.isAuthendicate, navigation]);

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

  // Function to Update input values based on input type
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
    }
  }
  

  useEffect(() => {
    // Function to login
    const onLogin = async () => {
      // User data to be sent for login
      const userData = {
        rate_code: selectedEmirate,
        email: enteredEmail,
        // Password: enteredPassword,
      };

      // Check if any field is empty
      if (Object.values(userData).some((value) => !value)) {
        // Alert.alert("All the Fields are Required", "please fill all the fields");
        showMessage({
          message: "All the Fields are Required",
          description: "please fill all the fields",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
        return;
      }



      try {
        // Post sign up data
        const response = await postGuest(userData);
        console.log(response.data)

        // User data to be sent for login
        if (response.status === 409) {
          console.log("this is an existing email. ");
          // Alert.alert("Existing Email", "please try another email");
          showMessage({
            message: "Existing Email",
            description: "please try another email",
            icon: () => <MaterialIcons name="error" size={24} color="white" />,
            type: "danger",
          });
          return;
        }

        // If response and filtered customer exists. Then it will execute this condition
        if (response.status === 201) {
          // Set customer id in async storage and authenticate user
          const customerId = response.data.data._id;
          await AsyncStorage.setItem("customerId", customerId);
          authCntx.authenticate(customerId);
          // setisUserLogging(true);
        }
      } catch (error) {
        console.log(error);
        showMessage({
          message: "Login Failed.",
          description: "Login As Guest Failed.",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
        throw new Error("Login As Guest Failed.");
      }
    };

    // If user click on login button this condition will be call
    if (isReadyToLogin) {
      onLogin();
      // This State set is value to false. so we can execute onLogin function everytime when we click on login button
      setIsReadyToLogin(false);
    }
  }, [isReadyToLogin]);

  // This function will trigger if user click on login button
  const handleLogin = async () => {
    // this state set is value true. so it will trigger use effect because we add it as dependancy
    setIsReadyToLogin(true);
  };

  return (
    <View style={styles.rootContainer}>
      <Title text="Login As Guest" size={35} />
      <View style={styles.container}>
        <In put
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
        />
        <View style={styles.section}>
          <Dropdown
            options={emirates}
            onSelect={setSelectedEmirate}
            label={"Emirate"}
            key={"RateCodeID"}
            value={"rate_code"}
            selectedValue={selectedEmirate}
          />
        </View>
        <View style={styles.buttons}>
          <MyGradientButton onPressBtn={handleLogin} title="Login as Guest" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: ColorPalate.white,
  },
  container: {
    backgroundColor: ColorPalate.white,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    color: ColorPalate.themeprimary,
    marginTop: 5,
  },
  dropdownContainer: {
    marginTop: 4,
    backgroundColor: ColorPalate.lgrey,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: ColorPalate.dgrey,
    color: ColorPalate.dgrey,
  },
  dropdown: {
    fontFamily: MyFonts.fontregular,
    color: ColorPalate.dgrey,
  },
  buttons: {
    marginTop: 12,
  },
});

export default LoginAsGuest;
