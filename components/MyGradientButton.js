import React, { Children } from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ColorPalate, MyFonts} from '../constants/var';

const MyGradientButton = ({
  title,
  onPressBtn,
  size,
}) => {
  return (
    <Pressable onPress={onPressBtn} activeOpacity={0.7}>
      <LinearGradient
        colors={[ColorPalate.themesecondary, ColorPalate.themeprimary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.button,
          {
            width: size,
          },
        ]}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // fontFamily:"OpenSans-Bold",
    fontFamily:MyFonts.fontbold,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  stylePress: {
    opacity: 0.75,
  },
});

export default MyGradientButton;
