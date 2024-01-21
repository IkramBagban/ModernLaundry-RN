import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ColorPalate, MyFonts } from "../../constants/var";
import useFetch from "../../components/customHooks/useFetch";

const ChatMainScreen = ({ navigation }) => {
  const [accounts, isLoading] = useFetch("/message/accounts");
  const [filteredAccounts, setFilteredAccounts] = useState(null);
  const currentCustomer = useSelector(
    (state) => state?.filteredData?.currentCustomerData
  );

  useEffect(() => {
    if (!currentCustomer) {
      console.log("customer or accounts not fetch yet.");
      return;
    }
    if (currentCustomer?.email !== "ikrambagban471@gmail.com") {
      return navigation.replace("Chat");
    }
  }, [currentCustomer && currentCustomer.email]);

  useEffect(() => {
    console.log("second se effect");
    if (!accounts) {
      return console.log("accounts not fetched.");
    }

    // console.log('accont fetched')
    // console.log('in use effect')
    const filtered = accounts.filter((a) => a.isStartedChatting);
    setFilteredAccounts(filtered);
  }, [isLoading]);
  console.log("isloadig " + isLoading);

  const contactClickHandler = (senderId, recipient, name, lastname) => {
    console.log(currentCustomer);
    console.log(recipient);

    navigation.navigate("AdminChat", {
      senderId: senderId,
      recipient: recipient,
      name: name,
      lastname: lastname,
    });
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={ColorPalate.themeprimary} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={filteredAccounts && filteredAccounts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                const recipient = item._id;
                contactClickHandler(
                  currentCustomer?._id,
                  recipient,
                  item.first_name,
                  item.last_name
                );
              }}
            >
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  borderWidth: 1,
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    color: ColorPalate.themeprimary,
                    fontFamily: MyFonts.fontbold,
                  }}
                >
                  {item?.first_name || "Guest"}
                </Text>
                <Text>{item?.email}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ChatMainScreen;
