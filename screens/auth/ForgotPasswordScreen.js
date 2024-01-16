import { View, Text } from "react-native";
import React from "react";
import Input from "../../components/Auth/Input";
import { useState } from "react";
import MyGradientButton from "../../components/MyGradientButton";
import commonStyle from "./commonStyle";
import { patchResetPassword } from "../../utils/api";
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ForgotPasswordScreen = ({ navigation, route }) => {
  const [EnteredPassword, setEnteredPassword] = useState("");
  const [EnteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const { email } = route.params;
  const ChangePasswordHandler = async () => {
    try {
      if (!EnteredPassword || !EnteredConfirmPassword) {
        showMessage({
          message: "All Fileds Are Mandatory.",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
        return;
      }

      if (EnteredPassword === EnteredConfirmPassword) {
        const data = {
          email: email,
          Password: EnteredPassword,
          confirmPassword: EnteredConfirmPassword,
        };
        const response = await patchResetPassword(data);

        if (response.status === 200) {
          navigation.navigate("SignIn"),
            showMessage({
              message: "Password Has Been Changed",
              icon: () => (
                <MaterialIcons name="check-circle" size={24} color="white" />
              ),
              type: "success",
            });
        }
      } else {
        showMessage({
          message: "Password Error",
          description: "The entered passwords do not match. Please try again.",
          icon: () => <MaterialIcons name="error" size={24} color="white" />,
          type: "danger",
        });
      }
    } catch (e) {
      console.log("got an error while changing password ln:60", e);
      showMessage({
        message: "Password Error",
        description: "Reset Password Failed.",
        icon: () => <MaterialIcons name="error" size={24} color="white" />,
        type: "danger",
      });
    }
  };
  return (
    <View style={commonStyle.rootContainer}>
      <View style={commonStyle.inputContainer}>
        <Text style={commonStyle.headText}>Change Password</Text>
        <Input
          label="Enter Password"
          secure
          value={EnteredPassword}
          onUpdateValue={(value) => setEnteredPassword(value)}
        />
        <Input
          label="Confirm Password"
          secure
          value={EnteredConfirmPassword}
          onUpdateValue={(value) => setEnteredConfirmPassword(value)}
        />
      </View>
      <View style={commonStyle.buttonContainer}>
        <MyGradientButton
          onPressBtn={ChangePasswordHandler}
          title="Change Password"
        />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

// const commonStyle = commonStyleheet.create({
//   rootContainer: {
//     flex: 1,
//     justifyContent: "center",
//     // alignItems: "center",
//   },
//   inputContainer: {
//     width: "90%",
//     alignSelf: "center",
//   },
//   text: {
//     alignSelf: "center",
//     fontSize: 25,
//     color: ColorPalate.themeprimary,
//     fontFamily:MyFonts.fontmid,
//     marginBottom: 20,
//   },
//   buttonContainer:{
//     width:'90%',
//     alignSelf:'center',
//     marginTop:20
//   }
// });
