  import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { getDeliveryTypes } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal, selectAllCartItems, selectCartTotalPrice, updateDates, updateDeliveryType } from '../store/redux/reduxToolkit/cartSlice';
import { ColorPalate, MyFonts } from '../constants/var';
const deliveryTypes = [
  { "deliveryTypeID": "1", "delivery_type": "Standard" },
  { "deliveryTypeID": "2", "delivery_type": "Express" },
  { "deliveryTypeID": "3", "delivery_type": "Same Day" }
]
const DeliveryTypeBtn = () => {
  // const [deliveryTypes, setDeliveryTypes] = useState();

  const cartItems = useSelector((state) => state.cart.products);

  const [selectedType, setSelectedType] = useState('1');
  const [products] = useState(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    // Iterate over each product
    products.forEach((product) => {

      // Filter the pricing array based on selectedType, service type, and emirate_id
      const filteredPricingArray = product.cartItem.pricing.filter(
        (price) =>{
          // console.log(cartItems)
        return  price.deliveryType === selectedType &&
          price.service === product.service.type &&
          price.emirate_id === cartItems[0]?.emirateId}
      );

      // Check if any pricing options are found
      if (filteredPricingArray.length > 0) {
        // Get the service price from the first matching pricing option
        const servicePrice = filteredPricingArray[0].price;

        // Dispatch an action to update the delivery type and service price for the product
        dispatch(
          updateDeliveryType({
            id: product.id,
            deliveryType: selectedType,
            servicePrice: servicePrice,
          })
        );
      }

      // ==================

      pickupDate = new Date()
    });
  }, [selectedType]);

  return (
    <View style={styles.container}>
      {deliveryTypes.map((item, index) => (
        <Pressable
          key={item.deliveryTypeID}
          style={[
            styles.button,
            index === 0 && styles.leftButtonRadius, // Apply the leftButtonRadius style to the first button
            index === deliveryTypes.length - 1 && styles.rightButtonRadius, // Apply the rightButtonRadius style to the last button
            selectedType === item.deliveryTypeID && styles.selectedButton, // Apply the selectedButton style if selectedType matches the current deliveryTypeID
          ]}
          onPress={() => {
            setSelectedType(item.deliveryTypeID);
          }}>
          <Text style={[
            styles.text,
            { color: selectedType === item.deliveryTypeID ? ColorPalate.white : ColorPalate.themeprimary }
          ]}>{item.delivery_type}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DeliveryTypeBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    borderRadius: 15, // Set border radius for the container
    overflow: "hidden", // Ensure the container clips the buttons with rounded corners
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: ColorPalate.white,
  },
  leftButtonRadius: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rightButtonRadius: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: ColorPalate.white,
    fontFamily: MyFonts.fontbold,
  },
  selectedButton: {
    backgroundColor: ColorPalate.themeprimary,
  },
});
