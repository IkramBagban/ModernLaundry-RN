import {View, Text, TextInput, StyleSheet} from 'react-native';
// import {ColorPalate} from '../constants/ColorPalate';
import {ColorPalate} from '../constants/var';

function MyInput({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter username"
        placeholderTextColor={'#bdb8c0'}
        fontSize={16}
        style={styles.input}
      />
    </View>
  );
}

export default MyInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f6f9',
    borderRadius: 10,
  },
  label: {
    color: ColorPalate.cyan,
    marginBottom: 4,
  },
  labelInvalid: {
    color: ColorPalate.error,
  },
  inputInvalid: {
    backgroundColor: ColorPalate.error,
  },
});
