import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
// import { ColorPalate } from '../constants/ColorPalate';
//   import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorPalate} from '../constants/var';

const data = [
  {lableName: 'Item 1', id: '1'},
  {lableName: 'Item 2', id: '2'},
  {lableName: 'Item 3', id: '3'},
  {lableName: 'Item 4', id: '4'},
  {lableName: 'Item 5', id: '5'},
  {lableName: 'Item 6', id: '6'},
  {lableName: 'Item 7', id: '7'},
  {lableName: 'Item 8', id: '8'},
];

const MyDropdown = ({placeholder, searchPlaceholder}) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      backgroundColor={'rgba(0,0,0,0.2)'}
      activeColor={"#cccccc"}
      itemTextStyle={{color:ColorPalate.cyan}}
      data={data}
      search
      maxHeight={300}
      labelField="lableName"
      valueField="id"
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
    />
  );
};

export default MyDropdown;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 4,
    height: 55,
    borderBottomColor: ColorPalate.grey,
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color : ColorPalate.grey,
    fontSize: 16,
  },
  selectedTextStyle: {
    color : ColorPalate.cyan,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color : ColorPalate.grey,
  },
});

