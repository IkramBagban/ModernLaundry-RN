import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet, ScrollView} from 'react-native';
import {ColorPalate, MyFonts} from '../constants/var';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useEffect} from 'react';

const Dropdown = ({options, onSelect, value, label, selectedValue}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    onSelect(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // options && !selectedValue ? setSelectedOption (options[0][value]) : null
    selectedValue ? setSelectedOption(selectedValue) : null;
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.dropdownButtonText}>
          {selectedOption || "Select an option"}
        </Text>
        <MaterialIcons
          name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={ColorPalate.dgrey}
        />
      </Pressable>
      {isDropdownOpen && (

        
        <View style={styles.dropdownList}>
          {options?.map((option, index) => (
            //  <ScrollView >

            <Pressable
              key={index}
              style={styles.dropdownListItem}
              onPress={() => handleOptionSelect(option[value])}>
              <Text style={styles.dropdownListItemText}>{option[value]}</Text>
            </Pressable>
                //  </ScrollView>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    color: ColorPalate.themeprimary,
    marginTop: 5,
    marginBottom: 3,
    marginLeft: 1,
  },
  dropdownButton: {
    backgroundColor: ColorPalate.lgrey,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: ColorPalate.dgrey,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  dropdownButtonText: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    color: ColorPalate.dgrey,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: ColorPalate.white,
    borderWidth: 1,
    borderColor: ColorPalate.lgrey,
    borderRadius: 5,
    // maxHeight: 250,
    overflow: 'scroll',
    zIndex: 1,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownListItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalate.lgrey,
  },
  dropdownListItemText: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    color: ColorPalate.dgrey,
  },
});

export default Dropdown;
