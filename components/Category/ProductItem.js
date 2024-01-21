import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { ColorPalate, MyFonts } from "../../constants/var";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectItemTotalPrice,
  updateCartItemQuantity,
  updateItemServiceType,
  updateItemDelivery,
  selectCartItemById,
} from "../../store/redux/reduxToolkit/cartSlice";
import { setFilteredData } from "../../store/redux/reduxToolkit/filteredDataSlice";
import { useCallback } from "react";
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const deliveryType = "1";
const delivery = [{ title: "Folded" }, { title: "Hanger" }];

const ProductItem = React.memo(({ product, index, selectedEmirate }) => {
  const cartItemPrice = useSelector((state) =>
    selectItemTotalPrice(state, product.id)
  );
  const cartItem = useSelector((state) =>
    selectCartItemById(state, product.id)
  );
  let emirates = useSelector((state) => state.filteredData.emiratesData);
  let filteredPricing = useSelector(
    (state) => state.filteredData.filteredPricing[product.id]
  );

  const [selectedService, setSelectedService] = useState(
    cartItem ? cartItem.service : { type: undefined, price: 0 }
  );
  const [selectedDelivery, setSelectedDelivery] = useState(
    cartItem ? cartItem.delivery : { type: undefined }
  );
  const [emirateId, setEmirateId] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const [isCartBtnSelected, setIsCartBtnSelected] = useState(cartItem?.quantity < 1 ? false : true);

  // const customerId = useCustomerId();
  const currentCustomer = useSelector(
    (state) => state.filteredData.currentCustomerData
  );
  const dispatch = useDispatch();


  useEffect(() => {
    // filter selected emirate and set its id to filter product price.
    const emirate = emirates?.find(
      (e) => e.rate_code?.toLowerCase() === selectedEmirate?.toLowerCase()
    );
    if (emirate) setEmirateId(emirate.RateCodeID);
  }, [selectedEmirate]);

  useEffect(() => {
    if (emirateId && product.pricing) {
      // filter pricing based on emirate id and deliveryTypeId
      let filteredPricingData = product.pricing?.filter(
        (obj) =>
          obj.deliveryType === deliveryType &&
          obj.emirate_id.toString() === emirateId.toString()
      );

      dispatch(
        setFilteredData({
          productId: product.id,
          filteredData: filteredPricingData,
        })
      );
    }
  }, [product, emirateId]);

  const sortSubArrays = useCallback((arr) => {
    return arr.sort((a, b) => a.service.localeCompare(b.service));
  }, []);

  useEffect(() => {
    if (filteredPricing) {
      const sortedArray = sortSubArrays([...filteredPricing]);
      setFiltered(sortedArray);
    }
  }, [filteredPricing]);

  // -------------------------------
  // Decrease the quantity of the selected service
  function decreaseQtyHandler() {
    // if (selectedService) {
    //   // Check if `cartItem` is truthy
    //   cartItem
    //     ? cartItem.quantity === 1
    //       ? dispatch(removeFromCart(cartItem.id)) // If the quantity is 1, dispatch the `removeFromCart` action with `id` to remove it from the cart
    //       : dispatch(
    //           updateCartItemQuantity({
    //             id: cartItem.id,
    //             quantity: cartItem.quantity - 1,
    //           })
    //         ) // Dispatch the `updateCartItemQuantity` action with the `cartItem.id` and decreased quantity to update the cart item's quantity
    //     : {}; // If `cartItem` is falsy, do nothing
    // }

    if (!cartItem) {
      console.log("Item Is Not In The Cart");
      return;
    }

    if (cartItem.quantity === 1) {
      // If the quantity is 1, dispatch the `removeFromCart` action with `id` to remove it from the cart
      dispatch(removeFromCart(cartItem.id));

      // If the quantity is 1, unselect `service` & `delivery` button.
      setIsCartBtnSelected(false);
      setSelectedService({ type: null, price: 0 });
      setSelectedDelivery({ type: null });
    } else {
      dispatch(
        updateCartItemQuantity({
          id: cartItem.id,
          quantity: cartItem.quantity - 1,
        })
      ); // Dispatch the `updateCartItemQuantity` action with the `cartItem.id` and decreased quantity to update the cart item's quantity
    }
  }

  // Increase the quantity of the selected service
  function increaseQtyHandler() {
    console.log('cartitem id', cartItem?.id)
    // Check if both service and delivery are selected
    if (!selectedService.type || !selectedDelivery.type) {
      // Alert.alert("Please select a service and delivery");
      showMessage({
        message: "Please select a service and delivery",
        icon: () => <MaterialIcons name="error" size={24} color="white" />,
        type: "danger",
      });
    }
    // If service and delivery are selected, add or update the cart
    if (selectedService.type && selectedDelivery.type) {
      // If the cart item already exists, update its quantity
      if (cartItem) {
        dispatch(
          updateCartItemQuantity({
            id: cartItem?.id,
            quantity: cartItem.quantity + 1,
          })
        );
      } else {
        setIsCartBtnSelected(true);

        // If the cart item doesn't exist, add it to the cart
        dispatch(
          addToCart({
            cartItem: product,
            service: selectedService,
            delivery: selectedDelivery,
            id: product.id,
            name: product.item_name,
            quantity: 1,
            category: product.item_cat1,
            deliveryType,
            emirateId,
            emirateName: currentCustomer?.rate_code,
            pickupDate: new Date(),
            deliveryDate: new Date(),
          })
        );
      }
    }
  }

  // Update the selected service and dispatch the action to update the item's service type
  function serviceButtonHandler(service) {
    setIsCartBtnSelected(true);
    // Set the selected service
    setSelectedService({
      type: service.service,
      price: Number(parseFloat(service.price).toFixed(2)) ?? 1,
    });

    // If a cart item exists, dispatch the action to updat/e the item's service type
    cartItem &&
      dispatch(
        updateItemServiceType({
          id: product.id,
          serviceType: service.service,
          servicePrice: Number(parseFloat(service.price).toFixed(2)) ?? 1,
          deliveryType,
        })
      );
  }

  // Update the selected delivery and dispatch the action to update the item's delivery type
  function deliveryButtonHandler(delivery) {
    setIsCartBtnSelected(true);
    // Set the selected delivery
    setSelectedDelivery({ type: delivery.title });

    // If a cart item exists, dispatch the action to update the item's delivery type
    cartItem &&
      dispatch(
        updateItemDelivery({
          id: product.id,
          deliveryType: delivery.title,
        })
      );
  }

  return (
    <View key={index} style={styles.itemContainer}>
      <Text style={styles.itemName}>{product.item_name}</Text>
      <View style={styles.contentConatiner}>
        <View
          style={{
            borderRightColor: ColorPalate.themesecondary,
            borderRightWidth: 1,
            flex: 1,
            padding: 10,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: product.image_url,
            }}
            style={styles.itemImage}
          />
          <View style={styles.qntyBtnContainer}>
            <Pressable
              onPress={decreaseQtyHandler}
              activeOpacity={0.7}
              style={styles.quantityBtn}
            >
              <Text style={[styles.quantityBtnText]}>-</Text>
            </Pressable>
            <Text
              style={{
                color: ColorPalate.themesecondary,
                fontSize: 24,
                fontFamily: MyFonts.fontmid,
              }}
            >
              {cartItem?.quantity ?? 0}
            </Text>
            <Pressable
              onPress={increaseQtyHandler}
              activeOpacity={0.7}
              style={styles.quantityBtn}
            >
              <Text style={styles.quantityBtnText}>+</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingVertical: 10,
          }}
        >
          <View style={{}}>
            <View style={[styles.contentitems, {}]}>
              <Text
                style={{
                  color: ColorPalate.white,
                  // color: ColorPalate.white,
                  backgroundColor: ColorPalate.themesecondary,
                  borderRadius: 5,
                  fontSize: 11,
                  fontFamily: MyFonts.fontregular,
                  textTransform: "uppercase",
                }}
              >
                {"service"}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <FlatList
                data={filtered && filtered}
                // data={pricingFilter}
                keyExtractor={(item, idx) => idx}
                renderItem={(item) => {
                  return (
                    <Pressable
                      onPress={() => serviceButtonHandler(item.item)}
                      activeOpacity={0.7}
                      style={[
                        styles.slection,
                        {
                          backgroundColor:
                            selectedService.type == item.item.service &&
                            isCartBtnSelected
                              ? ColorPalate.themesecondary
                              : undefined,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.slectionText,
                          {
                            color:
                              selectedService.type == item.item.service &&
                              isCartBtnSelected
                                ? "white"
                                : ColorPalate.themesecondary,
                            fontFamily: MyFonts.fontbold,
                          },
                        ]}
                      >
                        {item.item.service}
                      </Text>
                    </Pressable>
                  );
                }}
              />

              {/* =============================== */}
            </View>
          </View>
          <View style={{}}>
            <Text style={styles.contentitems}>delivery</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* =========================================== */}
              <FlatList
                listKey={(item, index) => "D" + index.toString()} // Assigning a unique key to each item in the list
                data={delivery}
                // keyExtractor={(item,index) => index}
                renderItem={(item, idx) => {
                  return (
                    <Pressable
                      // key={idx}
                      onPress={() => deliveryButtonHandler(item.item)}
                      activeOpacity={0.7}
                      style={[
                        styles.slection,
                        {
                          backgroundColor:
                            selectedDelivery.type == item.item.title &&
                            isCartBtnSelected
                              ? ColorPalate.themesecondary
                              : undefined,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.slectionText,
                          {
                            color:
                              selectedDelivery.type == item.item.title &&
                              isCartBtnSelected
                                ? "white"
                                : ColorPalate.themesecondary,
                            fontFamily: MyFonts.fontmid,
                          },
                        ]}
                      >
                        {item.item.title}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>

          <View>
            <Text style={styles.contentitems}>price</Text>
            <Text style={styles.priceText}>AED</Text>
            <Text style={[styles.priceText, { fontSize: 20 }]}>
              {cartItemPrice}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderWidth: 2,
    borderColor: ColorPalate.themesecondary,
  },
  itemName: {
    marginLeft: -1,
    marginTop: -1,
    textTransform: "uppercase",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: ColorPalate.themesecondary,
    color: ColorPalate.white,
    fontFamily: MyFonts.fontregular,
  },
  contentConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  qntyBtnContainer: {
    marginTop: 10,
    width: 85,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityBtn: {
    // width: 27,
    // height: 25,
    // // flex:1/2,
    // // width:40,
    // color: ColorPalate.white,
    // backgroundColor: ColorPalate.themesecondary,
    // // paddingVertical: 0,
    // // paddingHorizontal: 2,
    // borderRadius: 5,
    // alignItems: "center",
    // justifyContent: "center",

    backgroundColor: ColorPalate.themesecondary,
    // paddingHorizontal:10,
    // paddingVertical:5,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  quantityBtnText: {
    // textAlign: "center",
    fontSize: 20,
    // // fontWeight: "100",
    fontFamily: MyFonts.fontmid,
    color: ColorPalate.white,
    // marginBottom:8,
    // paddingHorizontal:8
  },
  contentitems: {
    color: ColorPalate.white,
    backgroundColor: ColorPalate.themesecondary,
    paddingHorizontal: 10,
    selfalign: "center",
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 11,
    fontFamily: MyFonts.fontregular,
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
  },
  slection: {
    width: 80,
    borderWidth: 1,
    borderColor: ColorPalate.themesecondary,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  slectionText: {
    fontSize: 11,
    fontFamily: MyFonts.fontregular,
    color: ColorPalate.themesecondary,
    textAlign: "center",
  },
  priceText: {
    marginTop: 5,
    color: ColorPalate.themesecondary,
    paddingHorizontal: 5,
    paddingVertical: 3,
    textAlign: "center",
    fontSize: 15,
    fontFamily: MyFonts.fontregular,
  },
  stylePress: {
    opacity: 0.75,
  },
});
