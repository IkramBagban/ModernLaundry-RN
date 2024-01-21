import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { ColorPalate, MyFonts } from "../../constants/var";
import { AuthContext } from "../../store/checkAuth";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { emptyProducts } from "../../store/redux/reduxToolkit/cartSlice";
import { showMessage, hideMessage } from "react-native-flash-message";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const authCntx = useContext(AuthContext);

  const currentCustomer = useSelector(
    (state) => state?.filteredData?.currentCustomerData
  );

  useEffect(() => {
    currentCustomer ? setIsLoading(false) : setIsLoading(true);
  }, [currentCustomer]);

  const handleLinkPress = async (url) => {
    const supported = await Linking.openURL(url);

    if (supported) {
      // Open the URL
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL: " + url);
    }
  };

  const savedAdress = () => {
    console.log("savedAdress clicked");
  };
  const termsConditions = () => {
    console.log("logged termsConditions clicked");
  };
  const supprtHandler = () => {
    console.log("supprtHandler clicked");
  };

  const logoutHandler = () => {
    Alert.alert("Logout", "Do you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Logout",
        onPress: () => {
          authCntx.logout();
          dispatch(emptyProducts());
          hideMessage();
        },
      },
    ]);
    // showMessage({
    //   message: "Click me to Logout",
    //   description: "Are you sure you want to logout?",
    //   type: "info",
    //   icon: "default",
    //   duration: 5000,
    //   autoHide: true,
    //   hideOnPress: false,
    //   onPress: () => {
    //     authCntx.logout();
    //     dispatch(emptyProducts());
    //     hideMessage();
    //   },
    // });
  };
  return (
    // <View style={styles.rootContainer}>
    <View style={styles.rootContainer}>
      {
        isLoading ? (
          <View style={{}}>
            <ActivityIndicator size="large" color={ColorPalate.themeprimary} />
          </View>
        ) : (
          <View style={styles.detailContainer}>
            <View style={styles.nameEditContainer}>
              <Text style={styles.nameText}>
                {currentCustomer?.first_name} {currentCustomer?.last_name}
              </Text>
              <Pressable
                onPress={() => navigation.navigate("UpdateProfile")}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text style={styles.editText}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={ColorPalate.themeprimary}
                  />
                </Text>
              </Pressable>
            </View>

            {currentCustomer?.contact_number && (
              <Text style={styles.infoText}>
                {currentCustomer?.contact_number}{" "}
              </Text>
            )}

            {currentCustomer?.email && (
              <Text style={styles.infoText}>{currentCustomer?.email}</Text>
            )}
            <Text style={styles.infoText}>
              {currentCustomer?.apartment && currentCustomer?.apartment + " "}
              {currentCustomer?.street_name &&
                currentCustomer?.street_name + ", "}
              {currentCustomer?.area && currentCustomer?.area + ", "}
              {currentCustomer?.rate_code}. {""}
            </Text>
            {/* <Text style={styles.infoText}>
               
               {currentCustomer?.address}{' '}
             </Text> */}
          </View>
        )
        // : (
        //   <Text>There is something wrong</Text>
        // )
      }

      <View>
        <View style={styles.addressContainer}>
          <Text style={styles.iconText}>
            <MaterialIcons
              name="location-on"
              size={18}
              color={ColorPalate.themeprimary}
            />
          </Text>

          <Pressable
            onPress={savedAdress}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.addressText}>Saved Address</Text>
          </Pressable>
        </View>

        <View style={styles.TnCContainer}>
          <Text style={styles.iconText}>
            <MaterialIcons
              name="description"
              size={18}
              color={ColorPalate.themeprimary}
            />
          </Text>
          <Pressable
            onPress={termsConditions}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.addressText}>Terms and Conditions</Text>
          </Pressable>
        </View>

        <View style={styles.supportContainer}>
          <Text style={styles.iconText}>
            <MaterialIcons
              name="support-agent"
              size={18}
              color={ColorPalate.themeprimary}
            />
          </Text>
          <Pressable
            onPress={supprtHandler}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.supportText}>Support</Text>
          </Pressable>
        </View>

        <View style={styles.logoutContainer}>
          <Text style={styles.iconText}>
            <MaterialIcons name="exit-to-app" size={18} color={"red"} />
          </Text>
          <Pressable
            onPress={logoutHandler}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerTextPart1}>Developed by</Text>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          // onPress={() => handleLinkPress("https://iqratechnology.com/")}
          onPress={() => {
            showMessage({
              message: `Hello ${currentCustomer?.first_name} ${currentCustomer?.last_name}`,
              type: "info",
            });
          }}
        >
          <Text style={styles.footerTextPart2}>Ikram Bagban</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: ColorPalate.white,
  },
  detailContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomColor: ColorPalate.skyblue,
    borderBottomWidth: 2,
  },
  nameEditContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: ColorPalate.themeprimary,
    fontFamily: MyFonts.fontmid,
  },
  editText: {
    color: ColorPalate.themeprimary,
    fontFamily: MyFonts.fontregular,
  },
  numberText: {
    fontSize: 16,
    color: ColorPalate.dgrey,
    marginBottom: 5,
    fontFamily: MyFonts.fontregular,
  },
  emailText: {
    fontSize: 16,
    color: ColorPalate.dgrey,
    fontFamily: MyFonts.fontregular,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  TnCContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  supportContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
    color: ColorPalate.themeprimary,
    marginRight: 10,
    fontFamily: MyFonts.fontregular,
  },
  addressText: {
    fontSize: 16,
    color: ColorPalate.dgrey,
    fontFamily: MyFonts.fontregular,
  },
  infoText: {
    fontSize: 16,
    color: ColorPalate.dgrey,
    marginVertical: 3,
    fontFamily: MyFonts.fontregular,
  },

  supportText: {
    fontSize: 16,
    color: ColorPalate.dgrey,
    fontFamily: MyFonts.fontregular,
  },
  logoutText: {
    fontSize: 16,
    color: ColorPalate.error,
    fontFamily: MyFonts.fontregular,
  },

  footerContainer: {
    // alignItems: 'center',
    justifyContent: "space-between",
    marginTop: "auto",
    // marginBottom: 20,
    flexDirection: "row",
  },
  footerTextPart1: {
    fontSize: 15,
    color: ColorPalate.dgrey,
    fontFamily: MyFonts.fontregular,
    marginRight: 5,
  },
  footerTextPart2: {
    fontSize: 15,
    color: ColorPalate.themeprimary,
    fontFamily: MyFonts.fontregular,
    marginLeft: 5,
  },
});

export default ProfileScreen;
