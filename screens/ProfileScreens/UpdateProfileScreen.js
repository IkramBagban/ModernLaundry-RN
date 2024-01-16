import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import Toast from "react-native-toast-message";

import Input from "../../components/Auth/Input";
import MyGradientButton from "../../components/MyGradientButton";
import useCustomerId from "../../components/customHooks/customerId";
import Dropdown from "../../components/Dropdown";
import useEmirates from "../../components/customHooks/getEmirates";

import { setCurrentCustomerData } from "../../store/redux/reduxToolkit/filteredDataSlice";
import { ColorPalate, MyFonts } from "../../constants/var";
import { getArea, putProfile } from "../../utils/api";
import { confirmationAlert } from "../../utils/helperFunctions";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const UpdateProfileScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [emirates, setEmirates] = useState();

  const [selectedEmirate, setSelectedEmirate] = useState();
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredContactNumber, setEnteredContactNumber] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredApartment, setEnteredApartment] = useState("");
  const [enteredAdress, setEnteredAddress] = useState("");
  const [enteredAlternativeContactNumber, setEnteredAlternativeContactNumber] =
    useState("");
  const [apiArea, setApiArea] = useState();
  const [selectedArea, setSelectedArea] = useState();

  const customerId = useCustomerId();
  const currentCustomer = useSelector(
    (state) => state.filteredData.currentCustomerData
  );

  const emirates = useEmirates();
  const dispatch = useDispatch();

  useEffect(() => {
    currentCustomer ? setIsLoading(false) : setIsLoading(true);
  }, [currentCustomer]);
  useEffect(() => {
    async function fetchArea() {
      try {
        const AREA = await getArea();
        const rateCodeId = emirates?.find(
          (emirate) => emirate.rate_code === selectedEmirate
        ).RateCodeID;
        console.log("ratecodeid-> ", rateCodeId);
        const filtered = AREA?.data.filter((i) => i.emirate === rateCodeId);
        setApiArea(filtered);
      } catch (error) {
        console.log(error);
      }
    }

    fetchArea();
  }, [selectedArea, selectedEmirate]);

  useEffect(() => {
    setSelectedEmirate(currentCustomer?.rate_code ?? "");
    setSelectedArea(currentCustomer?.area ?? "");
    setEnteredFirstName(currentCustomer?.first_name ?? "");
    setEnteredLastName(currentCustomer?.last_name ?? "");
    setEnteredContactNumber(currentCustomer?.contact_number ?? "");
    setEnteredEmail(currentCustomer?.email ?? "");
    setEnteredPassword(currentCustomer?.Password ?? "");
    setEnteredStreet(currentCustomer?.street_name ?? "");
    setEnteredApartment(currentCustomer?.apartment ?? "");
    setEnteredAddress(currentCustomer?.address ?? "");
    setEnteredAlternativeContactNumber(
      currentCustomer?.alter_Contact_Number ?? ""
    );
  }, [currentCustomer]);

  const updateProfileHandler = () => {
    const udpatedProfile = {
      id: currentCustomer?.id,
      first_name: enteredFirstName,
      last_name: enteredLastName,
      contact_number: enteredContactNumber,
      email: enteredEmail,
      Password: enteredPassword,
      rate_code: selectedEmirate,
      area: selectedArea,
      address: enteredAdress,
      apartment: enteredApartment,
      street_name: enteredStreet,
      alter_Contact_Number: enteredAlternativeContactNumber,
    };
    console.log("put profile", udpatedProfile);

    confirmationAlert(
      "profile",
      "confirm to update your profile",
      () => {
        console.log(currentCustomer?.Password);
      },
      async () => {
        try {
          // console.log('customerID', customerId)
          const response = await putProfile(udpatedProfile, customerId);
          if (response.status === 200) {
            dispatch(setCurrentCustomerData(response.data.data));
            showMessage({
              message: "Profile Has Been Updated",
              icon: () => (
                <MaterialIcons name="check-circle" ssize={24} color="white" />
              ),
              type: "success",
            });
            navigation.goBack();
          } else {
            showMessage({
              message: "Update Profile failed!",
              icon: () => (
                <MaterialIcons name="error" size={24} color="white" />
              ),
              type: "danger",
            });
          }
        } catch (error) {
          showMessage({
            message: "Update Profile Failed.",
            icon: () => <MaterialIcons name="error" size={24} color="white" />,
            type: "danger",
          });
          console.log("Got An Error While Updating Profile ", e);
        }
      }
    );
  };

  return (
    <View style={styles.rootcontainer}>
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* <Text style={styles.heading}>Profile</Text> */}

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator
                size="large"
                color={ColorPalate.themeprimary}
              />
            </View>
          ) : (
            <View style={styles.content}>
              <View style={styles.section}>
                <Input
                  label="First Name"
                  value={enteredFirstName}
                  onUpdateValue={(value) => setEnteredFirstName(value)}
                />
              </View>

              <View style={styles.section}>
                <Input
                  label="Last Name"
                  value={enteredLastName}
                  onUpdateValue={(value) => setEnteredLastName(value)}
                />
              </View>
              <View style={styles.section}>
                <Dropdown
                  options={emirates}
                  onSelect={setSelectedEmirate}
                  label={"Emirate"}
                  key={"RateCodeID"}
                  value={"rate_code"}
                  selectedValue={selectedEmirate}
                />
              </View>
              <View style={styles.section}>
                <Dropdown
                  options={apiArea}
                  onSelect={setSelectedArea}
                  label={"Area"}
                  key={"serialNo"}
                  value={"AreaName"}
                  selectedValue={selectedArea}
                />
              </View>

              <View style={styles.section}>
                <Input
                  label="Contact Number"
                  value={enteredContactNumber}
                  onUpdateValue={(value) => setEnteredContactNumber(value)}
                />
              </View>
              <View style={styles.section}>
                <Input
                  label="Alternate Contact Number"
                  value={enteredAlternativeContactNumber}
                  onUpdateValue={(value) =>
                    setEnteredAlternativeContactNumber(value)
                  }
                />
              </View>
              <View style={styles.section}>
                <Input
                  label="Street"
                  value={enteredStreet}
                  onUpdateValue={(value) => setEnteredStreet(value)}
                />
              </View>
              <View style={styles.section}>
                <Input
                  label="Apartment"
                  value={enteredApartment}
                  onUpdateValue={(value) => setEnteredApartment(value)}
                />
              </View>
              <View style={styles.section}>
                <Input
                  label="Address"
                  value={enteredAdress}
                  onUpdateValue={(value) => setEnteredAddress(value)}
                />
              </View>
              {/* 
              <View style={styles.section}>
              </View> */}

              <MyGradientButton
                title="Update Profile"
                onPressBtn={updateProfileHandler}
              />
            </View>
          )}
          {/* <Button title='click' onPress={()=>{
   
      }
    }/> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
  },
  container: {
    backgroundColor: ColorPalate.white,
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: MyFonts.fontmid,
    fontSize: 30,
    color: ColorPalate.themeprimary,
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "90%",
    // backgroundColor: ColorPalate.white,
    // elevation:5,
    borderRadius: 10,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    color: ColorPalate.themeprimary,
    marginBottom: 5,
  },
  value: {
    fontFamily: MyFonts.fontbold,
    fontSize: 20,
    color: ColorPalate.themeprimary,
  },
  dropdownContainer: {
    marginBottom: 12,
    // paddingVertical: 8,
    // paddingHorizontal: 6,
    backgroundColor: ColorPalate.lgrey,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: ColorPalate.dgrey,
    color: ColorPalate.dgrey,
  },
  dropdown: {
    fontFamily: MyFonts.fontregular,
    color: ColorPalate.dgrey,
  },
});

export default UpdateProfileScreen;
