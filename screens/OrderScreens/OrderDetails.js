import { View, Text, StyleSheet, FlatList } from "react-native";
import { ColorPalate, MyFonts } from "../../constants/var";

const emirates = [
  {
    RateCodeID: "3",
    rate_code: "Dubai",
  },
  {
    RateCodeID: "4",
    rate_code: "Umm Al Quwain ",
  },
  {
    RateCodeID: "1",
    rate_code: "Ras Al Khaimah",
  },
  {
    RateCodeID: "2",
    rate_code: "Sharjah",
  },
  {
    RateCodeID: "5",
    rate_code: "Ajman",
  },
];

const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.orderDateContainer}>
          <View
            style={[
              styles.orderDetailItem,
              {
                borderBottomWidth: 1,
                marginHorizontal: 3,
                borderBottomColor: ColorPalate.dgrey,
                paddingBottom: 10,
                marginBottom: 10,
              },
            ]}
          >
            <Text style={[styles.greyStyle, { fontSize: 20 }]}>Order No</Text>
            <Text style={[styles.value, { fontSize: 20 }]}>{order.id}</Text>
          </View>

          <View style={styles.orderDetailItem}>
            <Text style={styles.greyStyle}>Pickup Date</Text>
            <Text style={[styles.value, { color: ColorPalate.themeprimary }]}>
              {order.pickupDate}
            </Text>
          </View>

          <View style={styles.orderDetailItem}>
            <Text style={styles.greyStyle}>Delivery Date</Text>
            <Text style={[styles.value, { color: ColorPalate.themeprimary }]}>
              {/* {new Date(order.deliveryDate).toLocaleDateString("en-GB")} */}
              {order.deliveryDate}
            </Text>
          </View>

          <View style={styles.orderDetailItem}>
            <Text style={styles.greyStyle}>Emirate</Text>
            {/* <Text style={styles.value}>{order?.emirate_id}</Text> */}
            <Text style={styles.value}>
              {
                emirates.find((e) => e.RateCodeID == order.emirate_id)
                  ?.rate_code
              }
            </Text>
          </View>
        </View>

        <View
          style={{
            maxHeight: 350,
            borderWidth: 1,
            paddingVertical: 15,
            paddingHorizontal: 5,
            borderRadius: 15,
            borderColor: ColorPalate.dgrey,
          }}
        >
          <FlatList
            data={order.order_item}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View>
                  <Text style={styles.text}>
                    {item.item} X {item.qty}{" "}
                  </Text>

                  <View style={[styles.serviceDetailsContainer, {display : 'flex',flexDirection : 'column',}]}>
                    {/* <Text style={styles.greyStyle}></Text> */}
                    <Text style={styles.greyStyle}>
                      {item?.service} x {item?.DELIVERY}
                    </Text>
                    <Text style={[styles.greyStyle, {color : ColorPalate.themeprimary,marginVertical : 4 }]}>
                      AED {""}
                      {Number(item.Price * item.qty).toFixed(2)}
                    </Text>
                    
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />

          <View style={styles.subTotal}>
            <Text style={styles.text}>Sub Total</Text>
            <Text style={styles.text}>
              AED {""}
              {Number(order.subtotal).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    borderColor: ColorPalate.dgrey,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 8,
    width: "100%",
  },
  orderDateContainer: {
    borderWidth: 1,
    borderColor: ColorPalate.dgrey,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: ColorPalate.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },

  orderDetailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    width: "100%",

    flexWrap: "wrap",
  },
  value: {
    fontSize: 15,
    paddingHorizontal: 10,
    fontFamily: MyFonts.fontregular,
    color: ColorPalate.themeprimary,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: ColorPalate.themesecondary,
    marginHorizontal: 5,
  },
  text: {
    color: ColorPalate.themeprimary,
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily: MyFonts.fontregular,
  },
  serviceDetailsContainer: {
    flexDirection: "row",
    width:'100%',
    // marginVertical: 5,
    marginLeft: 10,
  },
  greyStyle: {
    color: ColorPalate.dgrey,
    marginRight: 10,
    fontFamily: MyFonts.fontregular,
  },

  subTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
