// // ====================

import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MyGradientButton from "../MyGradientButton";

import Input from "./Input";
import { Picker } from "@react-native-picker/picker";
import { ColorPalate, MyFonts } from "../../constants/var";
import { getArea, getEmirates } from "../../utils/api";
import { showToast } from "../../utils/helperFunctions";
import { Text } from "react-native";
import Dropdown from "../Dropdown";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredStreetName, setEnteredStreetName] = useState("");
  const [enteredApartment, setEnteredApartment] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredContactNumber, setEnteredContactNumber] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [EnteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredAlternativeContactNumber, setEnteredAlternativeContactNumber] =
    useState("");

  const [selectedEmirate, setSelectedEmirate] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [emirates, setEmirates] = useState();
  const [apiArea, setApiArea] = useState();
  useEffect(() => {
    async function fetchEmirates() {
      try {
        const EMIRATES = await getEmirates();
        setEmirates(EMIRATES);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchArea() {
      try {
        const AREA = await getArea();
        const rateCodeId = emirates?.find(
          (emirate) => emirate.rate_code === selectedEmirate
        ).RateCodeID;
        const filtered = AREA?.data.filter((i) => i.emirate === rateCodeId);

        console.log("filtered ==> ", filtered);
        setApiArea(filtered);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmirates();
    fetchArea();
    console.log("emirates", emirates);
    console.log("emirates", apiArea);

    console.log("selectedArea", selectedArea);
  }, [selectedArea, selectedEmirate]);

  const {
    firstName: firstNameIsValid,
    lastName: lastNameIsValid,
    streetName: streetNameIsValid,
    apartment: apartmentIsValid,
    address: addressIsValid,
    contactNumber: contactNumberIsValid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    alter_Contact_Number: alternativeContactNumbetIsInvalid,
    confirmPassword: confirmPasswordIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstName":
        setEnteredFirstName(enteredValue);
        break;
      case "lastName":
        setEnteredLastName(enteredValue);
        break;
      // case 'emirate':
      //   setEnteredEmirate(enteredValue);
      //   break;
      case "alterContactNumber":
        setEnteredAlternativeContactNumber(enteredValue);
        break;
      case "streetName":
        setEnteredStreetName(enteredValue);
        break;
      case "apartment":
        setEnteredApartment(enteredValue);
        break;
      case "address":
        setEnteredAddress(enteredValue);
        break;
      case "contactNumber":
        setEnteredContactNumber(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    // const data = {
    //   firstName: enteredFirstName || "hardcoded",
    //   lastName: enteredLastName || "lastNameHard" ,
    //   rate_code: enteredEmirate || 'abu dhabi',
    //   area: enteredArea || 'area 51',
    //   streetName: enteredStreetName || "streetNamehardcoded",
    //   apartment: enteredApartment|| "apartmenthardcoded",
    //   contactNumber: enteredContactNumber|| "1113336569",
    //   email: enteredEmail|| "emaailhardcoded@gmail.com",
    //   password: enteredPassword|| "harddfsdoded123",
    // }

    const data = {
      first_name: enteredFirstName,
      last_name: enteredLastName,
      rate_code: selectedEmirate,
      area: selectedArea,
      street_name: enteredStreetName,
      apartment: enteredApartment,
      address: enteredAddress,
      contact_number: enteredContactNumber,
      alter_Contact_Number: enteredAlternativeContactNumber,
      email: enteredEmail,
      Password: enteredPassword,
      confirmPassword: EnteredConfirmPassword,
    };
    console.log("confirm password auth form ");
    onSubmit(data);
  }
  const navigation = useNavigation();

  const forgotPasswordHandler = () => {
    navigation.navigate("Email");
  };
  return (
    <View>
      <View style={{ height: isLogin ? 400 : 450 }}>
        <ScrollView>
          {!isLogin && (
            <>
              <Input
                label="First Name"
                onUpdateValue={updateInputValueHandler.bind(this, "firstName")}
                value={enteredFirstName}
                keyboardType="default"
                isInvalid={firstNameIsValid}
              />
              <Input
                label="Last Name"
                onUpdateValue={updateInputValueHandler.bind(this, "lastName")}
                value={enteredLastName}
                keyboardType="default"
                isInvalid={lastNameIsValid}
              />
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
              <Input
                label="Street Name"
                onUpdateValue={updateInputValueHandler.bind(this, "streetName")}
                value={enteredStreetName}
                keyboardType="default"
                isInvalid={streetNameIsValid}
              />
              <Input
                label="Apartment"
                onUpdateValue={updateInputValueHandler.bind(this, "apartment")}
                value={enteredApartment}
                keyboardType="default"
                isInvalid={apartmentIsValid}
              />
              <Input
                label="Address"
                keyboardType="default"
                value={enteredAddress}
                onUpdateValue={updateInputValueHandler.bind(this, "address")}
                isInvalid={addressIsValid}
              />
              <Input
                label="Contact Number"
                onUpdateValue={updateInputValueHandler.bind(
                  this,
                  "contactNumber"
                )}
                value={enteredContactNumber}
                keyboardType="phone-pad"
                isInvalid={contactNumberIsValid}
              />
              <Input
                label="Alternate Contact Number"
                onUpdateValue={updateInputValueHandler.bind(
                  this,
                  "alterContactNumber"
                )}
                value={enteredAlternativeContactNumber}
                keyboardType="phone-pad"
                isInvalid={alternativeContactNumbetIsInvalid}
              />
            </>
          )}
          <>
            <Input
              label="Email Address"
              onUpdateValue={updateInputValueHandler.bind(this, "email")}
              value={enteredEmail}
              keyboardType="email-address"
              isInvalid={emailIsInvalid}
              inputMode="email"
            />
            <Input
              label="Password"
              onUpdateValue={updateInputValueHandler.bind(this, "password")}
              secure
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
              returnKeyType="go"
            />
            {!isLogin && (
              <Input
                label="Confirm Password"
                onUpdateValue={updateInputValueHandler.bind(
                  this,
                  "confirmPassword"
                )}
                secure
                value={EnteredConfirmPassword}
                isInvalid={confirmPasswordIsInvalid}
              />
            )}
            {isLogin && (
              <View>
                <Pressable
                  onPress={forgotPasswordHandler}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: ColorPalate.dgrey,
                      fontFamily: MyFonts.fontregular,
                      marginLeft: 3,
                      marginTop: 4,
                    }}
                  >
                    Forgot Password
                  </Text>
                </Pressable>
              </View>
            )}
          </>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <MyGradientButton
          onPressBtn={submitHandler}
          title={isLogin ? "Log In" : "Sign Up"}
        />
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  dropdownContainer: {
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
  section: {
    marginBottom: 20,
  },
  label: {
    fontFamily: MyFonts.fontregular,
    fontSize: 16,
    color: ColorPalate.themeprimary,
    marginVertical: 8,
  },
});
