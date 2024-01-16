import { View, Text} from "react-native";
import React from "react";
import Input from "../../components/Auth/Input";
import { useState } from "react";
import MyGradientButton from "../../components/MyGradientButton";
import commonStyle from "./commonStyle";
import { postVerifyOtp } from "../../utils/api";
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const OTPVarificationScreen = ({ navigation, route }) => {
  const [EnteredOTP, setEnteredOTP] = useState("");

  const { email } = route.params;

  const OTPVerificationHandler = async () => {
    const data = {
      email: email,
      otp: EnteredOTP,
    };

    try {
      const response = await postVerifyOtp(data);

      if (response) {
        console.log("verify response data", response.data);
      }

      if (response?.status === 401) {
        showMessage({
          message: "Not Verfied",
          description: "OTP is Incorrrect! Please Enter Correct OTP",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
        return console.log("Invalid Otp");
      }

      if (response?.status === 200) {
        navigation.navigate("ForgotPassword", { email: email });
      } else {
        // Alert.alert("Not Verfied", "OTP is Incorrrect! Please Enter Correct OTP");
        showMessage({
          message: "verification failed",
          description: "OTP verification Failed",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
      }
    } catch (err) {
      console.log("error while verifying otp", err);
      showMessage({
        message: "verification failed",
        description: "OTP verification Failed",
        icon: () => <MaterialIcons name="error" size={24} color="white" />,
        type: "danger",
      });
    }
  };

  return (
    <View style={commonStyle.rootContainer}>
      <View style={commonStyle.inputContainer}>
        <Text style={commonStyle.headText}>OTP Verification</Text>
      <Text style={commonStyle.text}>We've sent you an OTP to your email.</Text>
        <Input
          label="Enter OTP"
          value={EnteredOTP}
          onUpdateValue={(value) => setEnteredOTP(value)}
        />
      </View>
      <View style={commonStyle.buttonContainer}>
        <MyGradientButton
          onPressBtn={OTPVerificationHandler}
          title="Verify OTP"
        />
      </View>
    </View>
  );
};

export default OTPVarificationScreen;
