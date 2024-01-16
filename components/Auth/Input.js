// import {View, Text, TextInput, StyleSheet} from 'react-native';

// // import {ColorPalate} from '../../constants/ColorPalate';
// import {ColorPalate, MyFonts} from '../../constants/var';

// function Input({label, keyboardType, secure, onUpdateValue, value, isInvalid}) {
//   return (
//     <View style={styles.inputContainer}>
//       <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
//         {label}
//       </Text>
//       <TextInput
//         style={[styles.input, isInvalid && styles.inputInvalid
//         , { fontFamily: MyFonts.fontregular, color: ColorPalate.dgrey },
//       ]}
//         autoCapitalize={false}
//         // autoCapitalize="none"
//         keyboardType={keyboardType}
//         secureTextEntry={secure}
//         onChangeText={onUpdateValue}
//         value={value}
//       />
//     </View>
//   );
// }

// export default Input;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginVertical: 8,
//   },
//   label: {
//     color: ColorPalate.themeprimary,
//     fontFamily:MyFonts.fontregular,
//     marginBottom: 4,
//     fontSize: 16,
//   },
//   labelInvalid: {
//     color: ColorPalate.error,
//   },
//   input: {
//     paddingVertical: 8,
//     paddingHorizontal: 6,
//     backgroundColor: ColorPalate.lgrey,
//     borderRadius: 5,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: ColorPalate.dgrey,
//     color: ColorPalate.dgrey
//   },
//   inputInvalid: {
//     borderColor: ColorPalate.error,
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { ColorPalate, MyFonts } from "../../constants/var";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  inputMode,
  returnKeyType
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            isInvalid && styles.inputInvalid,
            { fontFamily: MyFonts.fontregular, color: ColorPalate.dgrey },
          ]}
          autoCapitalize={false}
          keyboardType={keyboardType}
          secureTextEntry={!showPassword && secure}
          onChangeText={onUpdateValue}
          value={value}
          inputMode={inputMode}
          returnKeyType={secure && returnKeyType}
        />
        {secure && (
          <Pressable
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            <MaterialIcons
              name={showPassword ? "visibility-off" : "visibility"}
              size={20}
              color={ColorPalate.dgrey}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: ColorPalate.themeprimary,
    fontFamily: MyFonts.fontregular,
    marginBottom: 4,
    fontSize: 16,
  },
  labelInvalid: {
    color: ColorPalate.error,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: ColorPalate.lgrey,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: ColorPalate.dgrey,
    color: ColorPalate.dgrey,
  },
  inputInvalid: {
    borderColor: ColorPalate.error,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
