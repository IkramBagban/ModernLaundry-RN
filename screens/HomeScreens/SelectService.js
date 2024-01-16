

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable} from 'react-native';
import {ColorPalate, MyFonts} from '../../constants/var';
import {TextInput} from 'react-native';
import DeliveryTypeBtn from '../../components/DeliveryTypeBtn';
import {useDispatch, useSelector} from 'react-redux';
import {Totaling} from '../../components/Totaling';
import {
  updateDates,
} from '../../store/redux/reduxToolkit/cartSlice';

const SelectService = () => {

  const cartItems = useSelector(state => state.cart.products);

   // Get total price, total quantity, and cart items from the Redux store
  const [dates, setDates] = useState({
    pickupDate: new Date(),
    deliveryDate: new Date(),
  });
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
  if (showPicker) {
    handlePickerClose();
  }
}, [dates]);

   // Get total price, total quantity, and cart items from the Redux store
  useEffect(() => {
    dispatch(updateDates(dates['pickupDate']));
  }, [dates, cartItems[0]?.deliveryType]);

   // Open date picker with the specified type
  const handlePickerOpen = type => {
    setShowPicker(true);
    setPickerType(type);
  };

  // Close date picker
  const handlePickerClose = () => {
    setShowPicker(false);
  };

  
  // Handle date change in the date picker
  const handleDateChange = (e, selectedDate) => {
    const now = new Date()
    // console.log("now", now)
    let currentDate = selectedDate || dates[pickerType];

    if(currentDate < now){
      currentDate = now
    }
    setDates({...dates, [pickerType]: currentDate});
  };
  



  // Handle notes change
  const onNotesChange = text => {
    setNotes(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 3, marginHorizontal: 20, marginVertical: 15}}>
        <DeliveryTypeBtn />
        <Text style={styles.label}>Pick-up Date</Text>
        <Pressable onPress={() => handlePickerOpen('pickupDate')}>
          <View style={styles.input}>
            <Text style={styles.inputText}>
              {dates.pickupDate.toLocaleDateString()}
            </Text>
          </View>
        </Pressable>

        <Text style={styles.label}>Delivery Date</Text>

        {/* i disabled deliveryDate button */}
        <Pressable
          onPress={() => handlePickerOpen('deliveryDate')}
          disabled={true}>
          <View style={styles.input}>
            <Text style={styles.inputText}>
              {(cartItems[0]?.deliveryDate || dates.deliveryDate).toLocaleDateString()}
            </Text>
          </View>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            mode="date"
            value={dates[pickerType]}
            is24Hour={false}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Add special request</Text>
        <View style={styles.input}>
          <TextInput
            style={[styles.inputText, {textAlignVertical: 'top'}]}
            multiline
            numberOfLines={4}
            onChangeText={onNotesChange}
            value={notes}
          />
        </View>
      </View>

      <Totaling
        navigateTo="CartReview"
        detailRoute={{
          pickupDateString: (cartItems[0]?.pickupDate || dates.pickupDate).toLocaleDateString(),
          deliveryDateString: (cartItems[0]?.deliveryDate || dates.deliveryDate).toLocaleDateString(),
          
          notes: notes,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: MyFonts.fontregular,
    color: ColorPalate.themeprimary,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: ColorPalate.themesecondary,
    padding: 10,
    borderRadius: 5,
  },
  inputText: {
    fontSize: 14,
    fontFamily: MyFonts.fontregular,
    color: ColorPalate.skyblue,
  },
});

export default SelectService;
