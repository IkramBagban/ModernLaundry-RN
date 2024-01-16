import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomHeaderTitle = ({ options, onSelect, value, selectedValue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const handleOptionSelect = option => {
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.dropdownButton}
        activeOpacity={0.7}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <View style={styles.dropdownButtonContent}>
          <Text style={styles.dropdownButtonText}>{selectedValue || 'Home'}</Text>
          <MaterialIcons
            name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="black"
          />
        </View>
      </Pressable>

      {isDropdownOpen && (
        <ScrollView style={styles.dropdownList}>
          {options?.map((option, index) => (
            <Pressable
              key={index}
              style={styles.dropdownListItem}
              onPress={() => {
                handleOptionSelect(option[value]);
                navigation.setParams({ selectedEmirate: option[value] });
              }}
            >
              <Text style={styles.dropdownListItemText}>{option[value]}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 999,
  },
  dropdownButton: {
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 320,
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    maxHeight: 250,
    zIndex: 999,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  dropdownListItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  dropdownListItemText: {
    fontSize: 16,
    color: 'black',
  },
});


export default CustomHeaderTitle