import {View, Text, StyleSheet} from 'react-native';
// import {ColorPalate} from '../constants/ColorPalate';
import {ColorPalate, MyFonts} from '../constants/var';

const Caption = ({text,onPressBtn}) => {
  return <Text style={[styles.text]} onPress={onPressBtn}>{text}</Text>;
};

export default Caption;

const styles = StyleSheet.create({
  text: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: ColorPalate.themesecondary,
  },
});
