import { View, Text, StyleSheet, Pressable } from "react-native";
// import { ColorPalate } from "../constants/ColorPalate";
import {ColorPalate} from '../constants/var';

const MyButton = ({ children, onPressBtn, mode, style,width }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPressBtn}
        style={({ pressed }) => pressed && styles.stylePress}
      >
        <View style={[styles.buttonStyle, {width:width}, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  stylePress: {
    opacity: 0.75,
  },
  buttonStyle: {
    // width : 100,
    padding: 8,
    borderRadius: 5,
    backgroundColor: ColorPalate.cyan,
    borderWidth : 1,
    borderColor : ColorPalate.cyan,
    borderRadius : 50
  },
  buttonText: {
    color: ColorPalate.white, textAlign:"center"
  },
  flatText: { color: ColorPalate.cyan, textAlign:"center" },
  flat: {
    backgroundColor: "transparent",
  },
});


